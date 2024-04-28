import { useCallback, useEffect, useState } from 'react'

import { Box } from '@mui/material'
import ReactDOM from 'react-dom/client'
import React from 'react';
import usePolling from '@/hooks/use-polling'

const PriceAsVND = () => {
  const [priceAdded, setPriceAdded] = useState(false)

  const addPriceAsVND = useCallback(() => {
    const priceWrap = document.querySelector('[class*="Price--root--"]')
    if (priceWrap && !document.getElementById('price-in-vnd')) {
      const app = document.createElement('div')
      app.style.marginTop = '10px'
      app.id = 'price-in-vnd'

      priceWrap.after(app)

      const price = document.querySelector('[class*="Price--priceText--"]')?.textContent

      ReactDOM.createRoot(document.getElementById('price-in-vnd') as HTMLElement).render(
        <React.StrictMode>
          <Box className="text-[2rem] text-orange-500">{price} VND</Box>
        </React.StrictMode>,
      )
      setPriceAdded(true)
    } else {
      console.log('not')
    }
  }, [])

  const { stop } = usePolling(addPriceAsVND, 1000)

  useEffect(() => {
    if (priceAdded) {
      console.log('stop')
      stop()
    }
  }, [priceAdded])

  return (
    <div></div>
  )
}

export default PriceAsVND
