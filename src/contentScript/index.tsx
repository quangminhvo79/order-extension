import React from 'react'
import { createRoot } from 'react-dom/client'
import OrderButton from '@/components/create-order-btn'
import PriceAsVND from '@/components/price-as-vnd'
import { ToastContainer } from 'react-toastify'

import '@/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { api } from '@/utils/api'
import { SUPPORTED_MARKETS_ROUTE } from '@/utils/api_routes'
import flattenDeep from 'lodash/flattenDeep'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: Infinity } },
})

const handleAddPriceTag = () => {
  const AddPriceTag = () => {
    const priceWrap = document.querySelector('[class*="Price--root--"], .price-content')
    try {
      if (priceWrap) {
        if (!document.getElementById('price-in-vnd')) {
          const app = document.createElement('div')
          app.style.marginTop = '10px'
          app.id = 'price-in-vnd'

          priceWrap.after(app)
          clearInterval(interval)
        }

        createRoot(document.getElementById('price-in-vnd') as HTMLElement).render(
          <React.StrictMode>
            <QueryClientProvider client={queryClient}>
              <PriceAsVND />
            </QueryClientProvider>
          </React.StrictMode>,
        )
      }
    } catch (error) {
      clearInterval(interval)
    }
  }

  const interval = setInterval(() => {
    AddPriceTag()
  }, 100)
}

const handleAddCreateOrderBtn = (
  marketWhiteList: string[],
  markets: { name: string, code: string, crawler_paths: string[] }[],
) => {
  const actionBtns = document.querySelector('[class*="Actions--root--"], .order-button-children-list')
  const app = document.createElement('div')
  const toastContainer = document.createElement('div')

  app.style.float = 'left'
  app.style.marginRight = '20px'
  app.id = 'create-order-btn'
  toastContainer.id = 'toast-container'

  const market = markets.find((m) => m.crawler_paths.find((i) => document.location.hostname.match(i)))
  const validMarket = marketWhiteList.find(i => document.location.host.match(i)) && market

  if (!actionBtns) {
    setTimeout(() => {
      handleAddCreateOrderBtn(marketWhiteList, markets)
    }, 200)
    return
  }

  if (actionBtns && validMarket) {
    if (!document.getElementById('create-order-btn')) {
      actionBtns.prepend(app)
    }

    document.body.prepend(toastContainer)
    createRoot(document.getElementById('create-order-btn') as HTMLElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <OrderButton market={market.code}/>
        </QueryClientProvider>
      </React.StrictMode>,
    )

    createRoot(toastContainer).render(
      <React.StrictMode>
        <ToastContainer />
      </React.StrictMode>,
    )

    handleAddPriceTag()
    // eslint-disable-next-line no-console
    console.info('Content Script: Order Extension Loaded')
  }
}

api.get(SUPPORTED_MARKETS_ROUTE).then((res) => {
  // eslint-disable-next-line no-console
  const { data: markets } = res
  const marketWhiteList = flattenDeep(markets.map((market: any) => market.crawler_paths)) as string[]

  handleAddCreateOrderBtn(marketWhiteList, markets)
})
