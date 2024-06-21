import { useCallback, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import usePolling from '@/hooks/use-polling'
import { formatPrice } from '@/utils/helpers'
import useExchangeRate from '@/hooks/use-exchange-rate'
import { GET_NUMBER_REGEX_PATTERN } from '@/utils/constants'
const PriceAsVND = ({ priceTextSelector }: {priceTextSelector: string}) => {
  const [price, setPrice] = useState(0)
  const { rate } = useExchangeRate('CNY')

  const fetchPrice = useCallback((timeout = 0) => {
    setTimeout(() => {
      // get number from text

      const pricesText = Array.from(document.querySelectorAll(priceTextSelector)).map((el) => el.textContent || '')
      const prices = pricesText.map((item: string) => parseFloat(item.match(GET_NUMBER_REGEX_PATTERN)?.[0]?.replace(',', '') || '0') )
      setPrice( Number(Math.min(...prices)) )
    }, timeout)
  }, [priceTextSelector])

  const { stop } = usePolling(fetchPrice, 1000)

  useEffect(() => {
    if (price) {
      stop()
      document.querySelectorAll('.skuItem').forEach((skuItem: any) => {
        skuItem.onclick = () => fetchPrice(100)
      })
    }
  }, [fetchPrice, price, stop])

  return (
    <Box fontSize={32} className="text-red-600 ">{ formatPrice(Number(price) * rate)}</Box>
  )
}

export default PriceAsVND

// const priceText = document.querySelector(priceTextSelector)?.textContent?
