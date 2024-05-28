import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import flattenDeep from 'lodash/flattenDeep'
import { api } from '@/utils/api'
import { SUPPORTED_MARKETS_ROUTE } from '@/utils/api_routes'

const useSupportedMarkets = () => {
  const { data: markets } = useQuery({
    queryKey: ['supported-markets'],
    queryFn: async () => {
      const { data } = await api.get(SUPPORTED_MARKETS_ROUTE)
      return data.data
    },
    refetchOnWindowFocus: false,
  })

  const marketWhiteList = useMemo(() => {
    return flattenDeep(markets?.map((market: any) => market.crawler_paths))
  }, [markets])

  return {
    markets,
    marketWhiteList,
  }
}

export default useSupportedMarkets
