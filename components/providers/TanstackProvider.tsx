'use client'
import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/config'
interface ProviderProps {
  children: ReactNode
}
const TanstackProvider = ({ children }: ProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default TanstackProvider
