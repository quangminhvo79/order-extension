import flattenDeep from 'lodash/flattenDeep'
import { useCallback } from 'react'
import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

type CrawlFieldData = {
  selector: string[],
  query_type: 'class_relative' | 'exactly_match' | 'url_search_param' | 'url_search_param_from_element' | 'window_variable',
  selector_attribute: string,
  regex_pattern: string,
}

const useCrawlData = (config_name: string) => {
  const { data: crawlTags } = useQuery({
    queryKey: ['config-by-market'],
    queryFn: async () => {
      const { data } = await api.get('/crawler_selectors', { params: { market: config_name } })
      return data.data.attributes
    },
    refetchOnWindowFocus: false,
    enabled: !!config_name,
  })

  const getDataFromRelativePath = useCallback((classNames: string[], attributeName?: string) => {
    const elements = flattenDeep(
      classNames.map((className: string) => {
        return document.querySelector(`[class*="${className}"]`)
      }),
    ).filter((element: any) => element)

    return Array.from(elements).map((element: any) => attributeName ? (element[attributeName] as string) : element)
  }, [])

  const getAllDataFromClassName = useCallback((classNames: string[], attributeName?: string) => {
    const elements = flattenDeep(
      classNames.map((className: string) => {
        return Array.from(document.querySelectorAll(className))
      }),
    ).filter((element: any) => {
      if ((element.constructor === NodeList) || (element.constructor === Array))
        return element.length > 0
      return element
    })

    if (!elements) return []

    return Array.from(elements).map((element: any) => {
      return attributeName ? element[attributeName] : element
    })
  }, [])

  const getDataFromCrawlerField = useCallback((crawlerField: CrawlFieldData) => {
    if (crawlerField.query_type === 'class_relative') {
      return getDataFromRelativePath(crawlerField.selector, crawlerField.selector_attribute)
    } else if (crawlerField.query_type === 'exactly_match') {
      return getAllDataFromClassName(crawlerField.selector, crawlerField.selector_attribute)
    } else if (crawlerField.query_type === 'url_search_param') {
      return crawlerField.selector.map((selector: string) => {
          return new URLSearchParams(document.location.search).get(selector)
        })
    } else if (crawlerField.query_type === 'url_search_param_from_element') {
      const element = document.querySelector(crawlerField.selector[0]) as HTMLElement
      if (!element) return []

      const searchParam = new URLSearchParams(
        element.getAttribute(crawlerField.selector[1]) as string,
      ).get(crawlerField.selector_attribute)

      return searchParam ? [searchParam] : []
    } else if (crawlerField.query_type === 'window_variable') {
      let result = window
      crawlerField.selector.forEach((item: string) => {
        // @ts-ignore
        result = result[item]
      })

      return [result]
    }

    return []
  }, [getAllDataFromClassName, getDataFromRelativePath])

  const getAllVariants = useCallback((
    variants: {
      category: CrawlFieldData,
      item: CrawlFieldData,
      activeItem: CrawlFieldData,
      categoryText: CrawlFieldData,
    },
  ) => {
    // const variantsCategories = getAllDataFromClassName(variants.category)
    const categoriesText = getDataFromCrawlerField(variants.categoryText)
    const allItems = getDataFromCrawlerField(variants.item)
    const activeItems = getDataFromCrawlerField(variants.activeItem)
    // eslint-disable-next-line no-console
    return {
      categoriesText,
      allItems,
      activeItems,
    }
  }, [getDataFromCrawlerField])

  const getImages = useCallback((crawlerField: CrawlFieldData) => {
    const images = getDataFromCrawlerField(crawlerField)

    if (images && images.constructor === Array) {
      return images.map((image: string) => image.replace('110x10000', ''))
    }
    return []
  }, [getDataFromCrawlerField])

  const crawlData = () => {
    if (document) {
      const variants = getAllVariants(crawlTags.variants)

      const {
        categoriesText,
        activeItems,
      } = variants

      if (categoriesText && activeItems && (categoriesText.length === activeItems.length)) {
        const name = getDataFromCrawlerField(crawlTags.name)[0]
        const price = getDataFromCrawlerField(crawlTags.price)[0]
        const salePrice = getDataFromCrawlerField(crawlTags.salePrice)[0]
        const image = getDataFromCrawlerField(crawlTags.image).concat(getImages(crawlTags.activeThumbnail))[0]
        const video = getDataFromCrawlerField(crawlTags.video)[0]
        const quantity = getDataFromCrawlerField(crawlTags.quantity)[0]
        const service = getDataFromCrawlerField(crawlTags.service)
        const shopName = getDataFromCrawlerField(crawlTags.shopName)[0]
        const shopLink = getDataFromCrawlerField(crawlTags.shopLink)[0]
        const shopId = shopLink ? new URL(shopLink).host.split('.')[0] : ''
        const sku = getDataFromCrawlerField(crawlTags.skuId)[0]
        const productId = getDataFromCrawlerField(crawlTags.id)[0]

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
