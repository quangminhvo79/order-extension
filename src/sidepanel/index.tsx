import React from 'react'
import ReactDOM from 'react-dom/client'
import { Box } from '@mui/material'

import Header from '@/components/header'
import Timeline from '@/components/timeline'

import '@/styles/global.scss'
import Cart from '@/components/cart'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Box className="p-5 space-y-5">
      <Header />
      <Timeline />
      <Cart />
    </Box>
  </React.StrictMode>,
)
