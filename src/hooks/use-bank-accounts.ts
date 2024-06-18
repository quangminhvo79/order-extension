import { storefrontAPI } from '@/utils/api'
import { BANK_ACCOUNTS_ROUTE } from '@/utils/api_routes'
import { useQuery } from '@tanstack/react-query'
import useCustomer, { errorResponseUnauthorized } from './use-customer'

const useBankAccounts = () => {
  const {
    authData,
  } = useCustomer()

  const { data: bankAccounts } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: async () => {
      try {
        if (!authData) return errorResponseUnauthorized

        const response = await storefrontAPI.get(BANK_ACCOUNTS_ROUTE, {
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
    bankAccounts,
  }
}

export default useBankAccounts
