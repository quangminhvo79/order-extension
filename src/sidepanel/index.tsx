import React from 'react'
import ReactDOM from 'react-dom/client'
import { Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { MainProvider } from '@/contexts/main-context'
import Timeline from '@/components/timeline'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/global.scss'
import { Bounce, ToastContainer } from 'react-toastify'
import SidepanelLayout from '@/layouts/sidepanel_layout'
import SidepanelNavigations  from '@/pages/SidepanelNavigations'
import { HashRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: Infinity } },
})

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <MainProvider>
          <SidepanelLayout>
            <SidepanelNavigations />
            <ToastContainer transition={Bounce} />
          </SidepanelLayout>
        </MainProvider>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
