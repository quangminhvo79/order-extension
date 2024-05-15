import flattenDeep from 'lodash/flattenDeep'
import compact from 'lodash/compact'
import { useCallback } from 'react'

const config: { [key: string]: any } = {
  taobao: {
    name: ['ItemHeader--mainTitle--'],
    price: ['SecurityPrice--priceText--', 'Price--priceText--'],
    salePrice: ['Price--extraPriceText--'],
    image: ['PicGallery--mainPic--'],
    video: ['video.lib-video'],
    quantity: ['countValueForPC'],
    service: ['.skuServiceItemWrapper .skuServiceUniqItem.selectedService'],
    shopLink: ['ShopHeader--board--', 'ShopHeaderNew--detailWrap--'],
    shopName: ['ShopHeader--title--', 'ShopHeaderNew--shopName--'],
    market: 'taobao',
    id: ['id', 'itemid'],
    variants: {
      category: ['.skuWrapper .skuCate'],
      categoryText: ['.skuCateText'],
      item: ['.skuItem'],
      activeItem: ['.skuItem.current .skuValueName'],
    },
  },
  tmall: {
    name: ['ItemHeader--mainTitle--'],
    price: ['SecurityPrice--priceText--', 'Price--priceText--'],
    salePrice: ['Price--extraPriceText--'],
    image: ['PicGallery--mainPic--'],
    video: ['video.lib-video'],
    quantity: ['countValueForPC'],
    service: ['.skuServiceItemWrapper .skuServiceUniqItem.selectedService'],
    shopLink: ['ShopHeader--board--', 'ShopHeaderNew--detailWrap--'],
    shopName: ['ShopHeader--title--', 'ShopHeaderNew--shopName--'],
    market: 'tmall',
    id: ['id', 'itemid'],
    variants: {
      category: ['.skuWrapper .skuCate'],
      categoryText: ['.skuCateText'],
      item: ['.skuItem'],
      activeItem: ['.skuItem.current .skuValueName'],
    },
  },
}

const useCrawlData = () => {
  const getDataFromRelativePath = useCallback((classNames: string[], attributeName?: string) => {
    const elements = flattenDeep(classNames.map((className: string) => {
      return document.querySelector(`[class*="${className}"]`)
    })).filter((element: any) => element)

    return Array.from(elements).map((element: any) => attributeName ? (element[attributeName] as string) : element)
  }, [])

  const getAllDataFromClassName = useCallback((classNames: string[], attributeName?: string) => {
    const elements = flattenDeep(classNames.map((className: string) => {
      return document.querySelectorAll(className)
    }).filter((element: any) => element))[0]

    return Array.from(elements).map((element: any) => {
      return attributeName ? element[attributeName] : element
    })
  }, [])

  const getAllVariants = useCallback((variants: { category: string[], item: string[], activeItem: string[], categoryText: string[] }) => {
    // const variantsCategories = getAllDataFromClassName(variants.category)

    const categoriesText = flattenDeep(variants.category.map((category: any) => {
      return variants.categoryText.map((item: any) => {
        return getAllDataFromClassName([`${category} ${item}`], 'textContent')
      })
    }))
    const allItems = flattenDeep(variants.category.map((category: any) => {
      return variants.item.map((item: any) => {
        return getAllDataFromClassName([`${category} ${item}`], 'textContent')
      })
    }))
    const activeItems = flattenDeep(variants.category.map((category: any) => {
      return variants.activeItem.map((activeItem: any) => {
        return getAllDataFromClassName([`${category} ${activeItem}`], 'textContent')
      })
    }))

    // eslint-disable-next-line no-console
    return {
      categoriesText,
      allItems,
      activeItems,
    }
  }, [getAllDataFromClassName])

  const crawlData = (config_name: string) => {
    if (document) {
      const crawlTags = config[config_name]

      const name = getDataFromRelativePath(crawlTags.name, 'textContent')
      const price = getDataFromRelativePath(crawlTags.price, 'textContent')
      const salePrice = getDataFromRelativePath(crawlTags.salePrice, 'textContent')
      const image = getDataFromRelativePath(crawlTags.image, 'src')
      const video = getDataFromRelativePath(crawlTags.video, 'src')
      const quantity = getDataFromRelativePath(crawlTags.quantity, 'value')
      const variants = getAllVariants(crawlTags.variants)
      const service = getAllDataFromClassName(crawlTags.service, 'textContent')
      const shopName = getDataFromRelativePath(crawlTags.shopName, 'textContent')
      const shopLink = getDataFromRelativePath(crawlTags.shopLink, 'href')[0]
      const shopId = new URL(shopLink).host.split('.')[0]

      const productId = compact(crawlTags.id.map((id: string) => {
        return new URLSearchParams(document.location.search).get(id)
      }))[0]

      return {
        id: productId,
        name,
        price,
        salePrice,
        image: image || '',
        video: video,
        qty: quantity,
        variants,
        link: document.location.href,
        service,
        shopName,
        shopLink,
        shopId,
      }
    }
    return {}
  }

  return { crawlData }
}

export default useCrawlData
