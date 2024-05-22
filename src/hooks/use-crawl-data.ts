import flattenDeep from 'lodash/flattenDeep'
import compact from 'lodash/compact'
import { useCallback } from 'react'

const config: { [key: string]: any } = {
  taobao: {
    name: ['ItemHeader--mainTitle--'],
    price: ['SecurityPrice--priceText--', 'Price--priceText--'],
    salePrice: ['Price--extraPriceText--'],
    image: ['PicGallery--mainPic--'],
    activeThumbnail: ['[class*="PicGallery--active--"] img'],
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
    skuId: 'skuId',
  },
  tmall: {
    name: ['ItemHeader--mainTitle--'],
    price: ['SecurityPrice--priceText--', 'Price--priceText--'],
    salePrice: ['Price--extraPriceText--'],
    image: ['PicGallery--mainPic--'],
    activeThumbnail: ['[class*="PicGallery--active--"] img'],
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
    skuId: 'skuId',
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

  const getImages = useCallback((classNames: string[]) => {
    const elements = flattenDeep(classNames.map((className: string) => {
      return document.querySelectorAll(className)
    }).filter((element: any) => element))[0]

    return Array.from(elements).map((element: any) => {
      return element.src.replace('110x10000', '')
    })
  }, [])

  const crawlData = (config_name: string) => {
    if (document) {
      const crawlTags = config[config_name]

      const variants = getAllVariants(crawlTags.variants)

      const {
        categoriesText,
        activeItems,
      } = variants

      if (categoriesText.length === activeItems.length) {
        const name = getDataFromRelativePath(crawlTags.name, 'textContent')[0]
        const price = getDataFromRelativePath(crawlTags.price, 'textContent')[0]
        const salePrice = getDataFromRelativePath(crawlTags.salePrice, 'textContent')[0]
        const image = getDataFromRelativePath(crawlTags.image, 'src').concat(getImages(crawlTags.activeThumbnail))[0]
        const video = getAllDataFromClassName(crawlTags.video, 'src')[0]
        const quantity = getDataFromRelativePath(crawlTags.quantity, 'value')[0]
        const service = getAllDataFromClassName(crawlTags.service, 'textContent')
        const shopName = getDataFromRelativePath(crawlTags.shopName, 'textContent')[0]
        const shopLink = getDataFromRelativePath(crawlTags.shopLink, 'href')[0]
        const shopId = new URL(shopLink).host.split('.')[0]
        const sku = new URLSearchParams(document.location.search).get(crawlTags.skuId || 'skuId')
        const productId = compact(crawlTags.id.map((id: string) => {
          return new URLSearchParams(document.location.search).get(id)
        }))[0]

        const product = {
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
          sku,
          market: crawlTags.market,
        }

        return product
      } else {
        return null
      }
    }
    return null
  }

  return {
    crawlData,
  }
}

export default useCrawlData
