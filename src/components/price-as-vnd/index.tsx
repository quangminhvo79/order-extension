import { useCallback, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import usePolling from '@/hooks/use-polling'
import { BasePrice, formatPrice } from '@/utils/helpers'

const PriceAsVND = () => {
  const [price, setPrice] = useState(0)

  const fetchPrice = useCallback((timeout = 0) => {
    setTimeout(() => {
      const priceText = document.querySelector('[class*="Price--priceText--"]')?.textContent
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
    <Box className="text-[2rem] text-orange-500">{ formatPrice(Number(price) * BasePrice)}</Box>
  )
}

export default PriceAsVND
