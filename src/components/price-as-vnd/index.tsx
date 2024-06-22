import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Stack } from '@mui/material'
import usePolling from '@/hooks/use-polling'
import { formatPrice } from '@/utils/helpers'
import useExchangeRate from '@/hooks/use-exchange-rate'
import { GET_NUMBER_REGEX_PATTERN } from '@/utils/constants'
import useCrawlData from '@/hooks/use-crawl-data'
import { toast } from 'react-toastify'

const PriceAsVND = ({
  market,
}: {
  market: string
}) => {
  const [price, setPrice] = useState(0)
  const [salePrice, setSalePrice] = useState(0)

  const { rate } = useExchangeRate('CNY')
  const {
    crawlTags,
    getDataFromCrawlerField,
  } = useCrawlData(market)

  const detectNumber = useCallback((text: string) => {
    return parseFloat(text.match(GET_NUMBER_REGEX_PATTERN)?.[0]?.replace(',', '') || '0')
  }, [])

  const fetchPrice = useCallback((timeout = 0) => {
    setTimeout(() => {
      // get number from text
      const priceElements = getDataFromCrawlerField(crawlTags.price)
      const prices = priceElements.map((item: string) => detectNumber(item) )
      setPrice(Number(Math.max(...prices)) )
    }, timeout)
  }, [crawlTags?.price, detectNumber, getDataFromCrawlerField])

  const fetchSalePrice = useCallback((timeout = 0) => {
    setTimeout(() => {
      // get number from text
      const salePriceElements = getDataFromCrawlerField(crawlTags.salePrice)
      const salePrices = salePriceElements.map((item: string) => detectNumber(item) )
      setSalePrice(Math.max(...salePrices))
    }, timeout)
  }, [crawlTags?.salePrice, detectNumber, getDataFromCrawlerField])

  const updatePriceBaseOnQuantity = useCallback(() => {
    if (crawlTags && crawlTags?.adjustQuantity?.selector && crawlTags?.totalPrice?.selector)
      document.querySelectorAll(crawlTags.adjustQuantity.selector.join(', ')).forEach(item =>
        item.addEventListener('click', () => {
          setTimeout(() => {
            const totalPriceText = document.querySelector(crawlTags.totalPrice?.selector.join(', '))?.textContent || ''
            const totalPriceAsNumber = parseFloat(totalPriceText.match(GET_NUMBER_REGEX_PATTERN)?.[0]?.replace(',', '') || '0')
            if (totalPriceAsNumber > 0) {
              setPrice(Number(totalPriceAsNumber))
            }
          }, 100)
        }, true),
      )
  }, [crawlTags])

  const preventClickOtherProduct = useCallback(() => {
    if (market !== '1688') return

    document.querySelectorAll('.prop-item-wrapper .prop-item').forEach((skuItem: any) => {
      skuItem.addEventListener('click', (event: any) => {
        if (document.querySelector(crawlTags.totalPrice?.selector.join(', '))?.textContent) {
          event.stopPropagation()
          event.preventDefault()
          toast.error('Vui lòng bỏ vào giỏ hàng sản phẩm hiện tại trước khi chọn sản phẩm khác')
        }
    }, true)
    })
  }, [crawlTags?.totalPrice?.selector, market])

  const { stop } = usePolling(fetchPrice, 1000)
  const { stop: stopSalePrice } = usePolling(fetchSalePrice, 1000)

  const variantItemsSelector = useMemo(() => {
    if (crawlTags?.variants?.item?.selector) {
      if (crawlTags.variants?.item?.query_type === 'class_relative') {
        return crawlTags.variants?.item?.selector.map((className: string) => `[class*="${className}"]`).join(', ')
      } else if (crawlTags.variants?.item?.query_type === 'exactly_match') {
        return crawlTags.variants?.item?.selector.join(', ')
      }
    }
  }, [crawlTags?.variants?.item?.query_type, crawlTags?.variants?.item?.selector])

  useEffect(() => {
    if (price) stop()
  }, [price, stop])

  useEffect(() => {
    if (salePrice) stopSalePrice()
  }, [salePrice, stopSalePrice])

  useEffect(() => {
    updatePriceBaseOnQuantity()
    preventClickOtherProduct()
  }, [preventClickOtherProduct, updatePriceBaseOnQuantity])

  useEffect(() => {
    document.querySelectorAll(variantItemsSelector).forEach((skuItem: any) => {
      skuItem.onclick = () => {
        if (market === '1688') {
          setTimeout(updatePriceBaseOnQuantity, 100)
        } else {
          fetchSalePrice(100)
          fetchPrice(100)
        }
      }
    })
  }, [fetchPrice, fetchSalePrice, market, updatePriceBaseOnQuantity, variantItemsSelector])

  return (
    <Stack direction="row" className="space-x-[15px]">
      <Box fontSize={32} className="text-red-600">
        { formatPrice(Number(price) * rate)}
      </Box>
      {salePrice > 0 && (
        <Box
          fontSize={32}
          className="text-white bg-[#ff5000] rounded-full w-fit"
          style={{ background: '#ff5000', padding: '0px 15px', marginBottom: '10px' }}
        >
          Sale { formatPrice(Number(salePrice) * rate)}
        </Box>
      )}
    </Stack>
  )
}

export default PriceAsVND

// const priceText = document.querySelector(priceTextSelector)?.textContent?
