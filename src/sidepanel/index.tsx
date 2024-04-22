import React from 'react'
import ReactDOM from 'react-dom/client'
import { Box } from '@mui/material'

import Header from '@/components/header'
import Timeline from '@/components/timeline'
import OrderDetail from '@/components/order-detail'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@/styles/global.scss'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Box className="p-5 space-y-5">
      <Header />
      <Timeline />
      <OrderDetail />
    </Box>
  </React.StrictMode>,
)
