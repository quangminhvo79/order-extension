import { useCallback, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import usePolling from '@/hooks/use-polling'
import { formatPrice } from '@/utils/helpers'
import useExchangeRate from '@/hooks/use-exchange-rate'

const PriceAsVND = () => {
  const [price, setPrice] = useState(0)
  const { rate } = useExchangeRate('CNY')

  const fetchPrice = useCallback((timeout = 0) => {
    setTimeout(() => {
      const priceText = document.querySelector('[class*="Price--priceText--"], .price-text')?.textContent
      setPrice( Number(priceText) )
    }, timeout)
  }, [])

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
    <Box fontSize={32} className="text-orange-500 ">{ formatPrice(Number(price) * rate)}</Box>
  )
}

export default PriceAsVND
