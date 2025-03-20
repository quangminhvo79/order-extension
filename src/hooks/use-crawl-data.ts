import flattenDeep from 'lodash/flattenDeep'
import { useCallback } from 'react'
import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { CRAWLER_SELECTORS_ROUTE } from '@/utils/api_routes'
import { GET_NUMBER_REGEX_PATTERN } from '@/utils/constants'

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
      const { data } = await api.get(CRAWLER_SELECTORS_ROUTE, { params: { market: config_name } })
      return data.data.attributes
    },
    refetchOnWindowFocus: false,
    enabled: !!config_name,
  })

  const addDataIndexTag = useCallback((elements: Element[], dataTagName?: string) => {
    if (dataTagName) {
      Array.from(elements).forEach((element: any, index: number) => {
        element.dataset[dataTagName] = index
      })
    }
  }, [])

  const getElements = useCallback((crawlerField: CrawlFieldData) => {
    let classNameBuilt = ''
    if (crawlerField.query_type === 'class_relative') {
      classNameBuilt = crawlerField.selector.map((className: string) => `[class*="${className}"]`).join(', ')
    } else if (crawlerField.query_type === 'exactly_match') {
      classNameBuilt = crawlerField.selector.join(', ')
    }
    return Array.from(document.querySelectorAll(classNameBuilt))
  }, [])

  const getDataFromElements = useCallback((elements: Element[], attributeName?: string, dataTagName?: string) => {
    if (!elements) return []

    addDataIndexTag(elements, dataTagName)

    return elements.map((element: any) => {
      return element[(attributeName || 'textContent')] || '' as string
    }).filter((value: string) => value !== '')
  }, [addDataIndexTag])

  const getDataFromCrawlerField = useCallback((crawlerField: CrawlFieldData, dataTagName?: string) => {
    if (crawlerField.query_type === 'class_relative' || crawlerField.query_type === 'exactly_match') {
      const elements = getElements(crawlerField)
      return getDataFromElements(elements, crawlerField.selector_attribute, dataTagName)

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
  }, [getDataFromElements, getElements])

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
    const allItems = getDataFromCrawlerField(variants.item, 'variantId')
    const activeItems = getDataFromCrawlerField(variants.activeItem)
    // eslint-disable-next-line no-console
    return {
      categoriesText,
      allItems,
      activeItems,
    }
  }, [getDataFromCrawlerField])

  const getActiveVariantId = useCallback((crawlerField: CrawlFieldData, dataTagName: string) => {
    const elements = flattenDeep(
      crawlerField.selector.map((className: string) => {
        if (crawlerField.query_type === 'exactly_match') {
          return Array.from(document.querySelectorAll(className))
        } else {
          return Array.from(document.querySelectorAll(`[class*="${className}"]`))
        }
      }),
    ).filter((element: any) => {
      if ((element.constructor === NodeList) || (element.constructor === Array))
        return element.length > 0
      return element
    })

    if (!elements) return ''

    return Array.from(elements).map((element: any) => {
      return element.dataset[dataTagName]?.toString() || ''
    }).join('')
  }, [])

  const getImages = useCallback((crawlerField: CrawlFieldData) => {
    const images = getDataFromCrawlerField(crawlerField)

    if (images && images.constructor === Array) {
      return images.map((image: string) => image.replace('110x10000', ''))
    }
    return []
  }, [getDataFromCrawlerField])

  const getQuantityFrom1688 = useCallback((crawlerField: CrawlFieldData) => {
    const quantities = getDataFromCrawlerField(crawlerField)
    return quantities.map((item: string) => {
      const match = item?.match(/(\d+)/)
      return match ? Number(match[0]) : 0
    }).reduce((acc: number, cur: number) => acc + cur, 0)
  }, [getDataFromCrawlerField])

  const crawlData = () => {
    if (document) {
      const variants = getAllVariants(crawlTags.variants)

      const {
        categoriesText,
        activeItems,
      } = variants

      if (categoriesText && activeItems && (activeItems.length >= categoriesText.length)) {
        const name = getDataFromCrawlerField(crawlTags.name)[0]

        const salePriceElements = getDataFromCrawlerField(crawlTags.salePrice)
        const salePrices = salePriceElements.map((item: string) => parseFloat(item.match(GET_NUMBER_REGEX_PATTERN)?.[0]?.replace(',', '') || '0') )
        const salePrice = Math.max(...salePrices)

        const image = getDataFromCrawlerField(crawlTags.image).concat(getImages(crawlTags.activeThumbnail))[0]
        const video = getDataFromCrawlerField(crawlTags.video)[0]
        const quantity = Math.max(
          getDataFromCrawlerField(crawlTags.quantity).reduce((acc: number, cur: number) => Number(acc) + Number(cur), 0),
          getQuantityFrom1688(crawlTags.quantity),
          1,
        )

        const priceElements = getDataFromCrawlerField(crawlTags.price)
        const prices = priceElements.map((item: string) => parseFloat(item.match(GET_NUMBER_REGEX_PATTERN)?.[0]?.replace(',', '') || '0') )
        let price = Math.max(...prices)

        if (crawlTags.totalPrice?.selector) {
          const totalPriceText = document.querySelector(crawlTags.totalPrice.selector.join(', '))?.textContent || ''
          const totalPriceAsNumber = parseFloat(totalPriceText.match(GET_NUMBER_REGEX_PATTERN)?.[0]?.replace(',', '') || '0')
          if (totalPriceAsNumber > 0) price = Number(totalPriceAsNumber) / quantity
        }

        const service = getDataFromCrawlerField(crawlTags.service)
        const shopName = getDataFromCrawlerField(crawlTags.shopName)[0]
        const shopLink = new URL(getDataFromCrawlerField(crawlTags.shopLink)[0]).origin
        const shopHost = new URL(getDataFromCrawlerField(crawlTags.shopLink)[0]).host
        const shopId = shopLink ? shopHost.split('.')[0] : ''

        const activeVariantId = getActiveVariantId(crawlTags.variants.activeItem, 'variantId')
        const productIdFromElement = getDataFromCrawlerField(crawlTags.id)[0]
        const sku = getDataFromCrawlerField(crawlTags.skuId)[0] || `${productIdFromElement}${activeVariantId}`
        const productId = config_name.toString() === '1688' ? `${productIdFromElement}_${sku}` : productIdFromElement

        if (config_name.toString() === '1688') {
          const variantCategoryName = getDataFromCrawlerField(crawlTags.variantQuantityCategory)
          const variantQuantityCount = getDataFromCrawlerField(crawlTags.variantQuantityCount)
          const variantQuantityPrice = getDataFromCrawlerField(crawlTags.variantQuantityPrice)
          const priceAndQuantity = variantQuantityPrice.map((item: string, index: number) => {
            if (Number(variantQuantityCount[index]) === 0) return null

            return `${item} -- ${variantQuantityCount[index]}`
          }).filter((item: string | null) => item)
          variants.categoriesText = variants.categoriesText.concat(variantCategoryName)
          variants.activeItems = variants.activeItems.concat(priceAndQuantity)
        }

        const product = {
          id: `${productId}${activeVariantId}`,
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
    crawlTags,
    getDataFromCrawlerField,
    getElements,
  }
}

export default useCrawlData
