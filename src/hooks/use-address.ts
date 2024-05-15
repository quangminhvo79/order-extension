import { useCallback } from 'react'
import { CreateAddress, UpdateAddress } from '@/models/address'
import { storefrontAPI } from '@/utils/api'
import { ADDRESS_ROUTE } from '@/utils/api_routes'
import useCustomer from './use-customer'
import { useQuery } from '@tanstack/react-query'

const errorResponseUnauthorized = {
  error: 'Unauthorized',
  status: 'error',
  statusCode: 401,
}

const useAddress = () => {
  const {
    authData,
  } = useCustomer()

  const createAddress = useCallback(async (address: CreateAddress) => {
    if (!authData) return errorResponseUnauthorized

    try {
      const response = await storefrontAPI.post(ADDRESS_ROUTE, {
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        },
      )

      console.log('response', response)
    } catch (err) {
      return null
    }
  }, [authData])

  const updateAddress = useCallback(async (address: UpdateAddress, id: string) => {
    if (!authData) return errorResponseUnauthorized

    try {
      const response = await storefrontAPI.patch(`${ADDRESS_ROUTE}/${id}`, {
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        },
      )

      console.log('response', response)
    } catch (err) {
      return null
    }
  }, [authData])

  const { data: addresses, isFetching: isFetchingAddresses, refetch: refetchAddresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      try {
        if (!authData) return errorResponseUnauthorized

        const response = await storefrontAPI.get(ADDRESS_ROUTE, {
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
    createAddress,
    updateAddress,
    addresses,
    isFetchingAddresses,
    refetchAddresses,
  }
}

export default useAddress
