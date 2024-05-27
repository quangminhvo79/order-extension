import { storefrontAPI } from '@/utils/api'
import { MY_ORDERS_ROUTE } from '@/utils/api_routes'
import { useQuery } from '@tanstack/react-query'
import useCustomer, { errorResponseUnauthorized } from './use-customer'

const useMyOrders = () => {
  const {
    authData,
  } = useCustomer()

  const { data: orders } = useQuery({
    queryKey: ['my-orders'],
    queryFn: async () => {
      try {
        if (!authData) return errorResponseUnauthorized

        const response = await storefrontAPI.get(MY_ORDERS_ROUTE, {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        })
        if (response.status === 200) {
          return response.data.data
        }
        return null
      } catch (err) {
        return null
      }
    },
    refetchOnWindowFocus: false,
    enabled: Boolean(authData),
  })

  return {
    orders,
  }
}

export default useMyOrders
