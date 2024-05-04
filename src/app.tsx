import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter } from "react-router-dom";
import RootNavigations from '@/pages/RootNavigations';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: Infinity } },
});

const App = () => {
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <RootNavigations />
      </QueryClientProvider>
    </HashRouter>
  )
}

export default App
