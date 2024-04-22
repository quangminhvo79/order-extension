import React from 'react'
import { createRoot } from 'react-dom/client';
import OrderButton from '@/components/create-order-btn'
import '@/styles/global.scss'

const actionBtns = document.querySelector('[class*="Actions--root--"]')
const app = document.createElement('div')

app.style.float = 'left'
app.style.marginRight = '20px'
app.id = 'create-order-btn'


if (actionBtns && document.location.hostname === 'item.taobao.com') {
  if (!document.getElementById('create-order-btn')) {
    actionBtns.prepend(app)
  }

  createRoot(document.getElementById('create-order-btn') as HTMLElement).render(
    <React.StrictMode>
      <OrderButton />
    </React.StrictMode>,
  )

  console.info('Order Extension Loaded')
}
