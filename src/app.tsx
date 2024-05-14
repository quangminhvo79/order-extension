import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter } from 'react-router-dom'
import RootNavigations from '@/pages/RootNavigations'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: Infinity } },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <RootNavigations />
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
