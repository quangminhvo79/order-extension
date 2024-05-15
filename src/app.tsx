import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter } from 'react-router-dom'
import RootNavigations from '@/pages/RootNavigations'
import PopupLayout from '@/layouts/popup_layout'
import { MainProvider } from '@/contexts/main-context'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: Infinity } },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <MainProvider>
          <PopupLayout>
            <RootNavigations />
            <ToastContainer />
          </PopupLayout>
        </MainProvider>
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
