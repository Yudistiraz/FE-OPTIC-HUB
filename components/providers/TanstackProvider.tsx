'use client'
import { ReactNode, useState } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'

interface ProviderProps {
  children: ReactNode
}
const TanstackProvider = ({ children }: ProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default TanstackProvider
