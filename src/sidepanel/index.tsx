import React from 'react'
import ReactDOM from 'react-dom/client'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { MainProvider } from '@/contexts/main-context'
import Header from '@/components/header'
import Timeline from '@/components/timeline'

import '@/styles/global.scss'
import Cart from '@/components/cart'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: Infinity } },
})

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainProvider>
        <Box className="p-5 space-y-5">
          <Header />
          <Timeline />
          <Cart />
        </Box>
      </MainProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
