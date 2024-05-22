import React from 'react'
import ReactDOM from 'react-dom/client'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SidePanelProvider } from '@/contexts/sidepanel-context'
import Header from '@/components/header'
import Timeline from '@/components/timeline'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/global.scss'
import Cart from '@/components/cart'
import { Bounce, ToastContainer } from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: Infinity } },
})

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidePanelProvider>
        <Box className="p-5 space-y-5">
          <Header />
          <Timeline />
          <Cart />
          <ToastContainer transition={Bounce} />
        </Box>
      </SidePanelProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
