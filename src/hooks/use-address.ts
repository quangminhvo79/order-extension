import { useCallback, useMemo } from 'react'
import { CreateAddress, UpdateAddress } from '@/models/address'
import { storefrontAPI } from '@/utils/api'
import { ADDRESS_ROUTE } from '@/utils/api_routes'
import useCustomer from './use-customer'
import { useQuery } from '@tanstack/react-query'

const errorResponseUnauthorized = {
  error: 'Unauthorized',
  statusText: 'error',
  status: 401,
}

const useAddress = () => {
  const {
    authData,
  } = useCustomer()

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

  const address = useMemo(() => {
    return addresses && addresses[0]
  }, [addresses])

  const createAddress = useCallback(async (address: CreateAddress, callback?: () => void) => {
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
      refetchAddresses()
      callback?.()
      return response
    } catch (err) {
      return null
    }
  }, [authData, refetchAddresses])

  const updateAddress = useCallback(async (address: UpdateAddress, id: string, callback?: () => void) => {
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

      chrome.runtime.sendMessage({ action: 'RELOAD_CONTACT_INFO' })
      refetchAddresses()
      callback?.()
      return response
    } catch (err) {
      return null
    }
  }, [authData, refetchAddresses])

  return {
    createAddress,
    updateAddress,
    addresses,
    address,
    isFetchingAddresses,
    refetchAddresses,
  }
}

export default useAddress
