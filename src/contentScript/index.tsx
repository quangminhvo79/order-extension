import React from 'react'
import { createRoot } from 'react-dom/client'
import OrderButton from '@/components/create-order-btn'
import { ToastContainer } from 'react-toastify'

import '@/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

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

if (actionBtns && marketWhiteList.includes(document.location.hostname)) {
  if (!document.getElementById('create-order-btn')) {
    actionBtns.prepend(app)
  }

  document.body.prepend(toastContainer)

  createRoot(document.getElementById('create-order-btn') as HTMLElement).render(
    <React.StrictMode>
      <OrderButton market={marketMap[document.location.hostname.toString()]}/>
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
