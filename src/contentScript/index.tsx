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

const marketWhiteList = ['item.taobao.com', 'detail.tmall.com']
const marketMap: { [key: string]: string } = {
  'item.taobao.com': 'taobao',
  'detail.tmall.com': 'tmall',
}

const actionBtns = document.querySelector('[class*="Actions--root--"]')
const app = document.createElement('div')
const toastContainer = document.createElement('div')

app.style.float = 'left'
app.style.marginRight = '20px'
app.id = 'create-order-btn'
toastContainer.id = 'toast-container'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: Infinity } },
})


if (actionBtns && marketWhiteList.includes(document.location.hostname)) {
  if (!document.getElementById('create-order-btn')) {
    actionBtns.prepend(app)
  }

  document.body.prepend(toastContainer)

  createRoot(document.getElementById('create-order-btn') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <OrderButton market={marketMap[document.location.hostname.toString()]}/>
      </QueryClientProvider>
    </React.StrictMode>,
  )

  createRoot(toastContainer).render(
    <React.StrictMode>
      <ToastContainer />
    </React.StrictMode>,
  )

  // eslint-disable-next-line no-console
  console.info('Content Script: Order Extension Loaded')
}

const interval = setInterval(() => {
  AddPriceTag()
}, 100)

const AddPriceTag = () => {
  const priceWrap = document.querySelector('[class*="Price--root--"]')
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
