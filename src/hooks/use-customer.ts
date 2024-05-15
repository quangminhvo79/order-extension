import { Customer, CreateCustomer, AuthInfo } from '@/models/customer'
import { useCallback, useMemo } from 'react'
import { storefrontAPI, authAPI } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { ACCOUNT_ROUTE } from '@/utils/api_routes'

const useCustomer = () => {
  const {
    data: authData,
    refetch: refetchAuthData,
    isFetching: isFetchingAuthData,
  } = useQuery({
    queryKey: ['authData'],
    queryFn: async () => {
      const { authData } = await chrome.storage.sync.get('authData')
      return authData || false
    },
    refetchOnWindowFocus: false,
  })

  const { data: user, refetch: refetchUserInfo, isFetching: isFetchingUserInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      try {
        if (!authData) return false
        const response = await storefrontAPI.get(ACCOUNT_ROUTE, {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        })
        if (response.status === 200) {
          return response.data.data
        }
        return false
      } catch (err) {
        return false
      }
    },
    refetchOnWindowFocus: false,
    enabled: Boolean(authData),
  })

  const isLogged = useMemo(() => {
    return authData && user
  }, [authData, user])

  const saveAuthInfo = useCallback(async (authData: AuthInfo) => {
    await chrome.storage.sync.set({
      authData,
    })
  }, [])

  const isValidCustomer = useCallback((customer: Customer) => {
    return customer.email && customer.password && customer.firstName && customer.lastName
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!email || !password) return
    try {
      const response = await authAPI.post('/token', {
        username: email,
        password,
        grant_type: 'password',
      })

      if (response.status === 200) {
        await saveAuthInfo(response.data)
        refetchAuthData()
        refetchUserInfo()
        return true
      }

      return false
    } catch (err) {
      // console.log(err)
      return false
    }
  }, [refetchAuthData, refetchUserInfo, saveAuthInfo])

  const createUser = useCallback(async (customer: CreateCustomer) => {
    if (!customer || !isValidCustomer(customer)) return
    try {
      const response = await storefrontAPI.post(ACCOUNT_ROUTE, {
        user: {
          first_name: customer.firstName,
          last_name: customer.lastName,
          email: customer.email,
          password: customer.password,
          password_confirmation: customer.password,
        },
      })

      if (response.status === 200) {
        signIn(customer.email, customer.password)
      }

      return response.statusText
    } catch (err) {
      return null
    }
  }, [isValidCustomer, signIn])

  const updateUser = useCallback(async (customer: Customer) => {
    if (!customer || !isValidCustomer(customer)) return
    try {
      const { data } = await storefrontAPI.patch(ACCOUNT_ROUTE, {
        user: {
          first_name: customer.firstName,
          last_name: customer.lastName,
          email: customer.email,
          password: customer.password,
          password_confirmation: customer.password,
        },
      })

      return data
    } catch (err) {
      return null
    }
  }, [isValidCustomer])

  const refrestToken = useCallback(async () => {
    if (!authData) return
    try {
      const { data } = await authAPI.post('/token', {
        grant_type: 'refresh_token',
        refresh_token: authData.refresh_token,
      })
      // console.log(data)
      saveAuthInfo(data)
    } catch (err) {
      return null
    }
  }, [authData, saveAuthInfo])

  const signOut = useCallback(async () => {
    await chrome.storage.sync.remove('authData')
    refetchAuthData()
    refetchUserInfo()
    chrome.runtime.sendMessage({ action: 'REFETCH_USER_INFO' })
  }, [refetchAuthData, refetchUserInfo])

  return {
    createUser,
    updateUser,
    signIn,
    signOut,
    refrestToken,
    user,
    refetchUserInfo,
    isFetchingUserInfo,
    authData,
    refetchAuthData,
    isFetchingAuthData,
    isLogged,
  }
}

export default useCustomer
