import { storefrontAPI } from '@/utils/api'
import { EXCHANGE_RATE_ROUTE } from '@/utils/api_routes'
import { BasePrice } from '@/utils/helpers'
import { useQuery } from '@tanstack/react-query'

const useExchangeRate = (currency: string) => {
  const { data: rate } = useQuery({
    queryKey: ['exchange-rate'],
    queryFn: async () => {
      const { data } = await storefrontAPI.get(EXCHANGE_RATE_ROUTE, { params: { currency: currency } })
      return data.exchange_rate
    },
    refetchOnWindowFocus: false,
  })

  return {
    rate: rate || BasePrice,
  }
}

export default useExchangeRate
