import { StoreProvider } from 'src/store/storeContext'
import 'src/styles/globals.scss'
import { YMaps } from '@pbe/react-yandex-maps'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') TagManager.initialize({ gtmId: 'GTM-PT8DLDFS' })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <YMaps>
          <Component {...pageProps} />
        </YMaps>
      </StoreProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}
