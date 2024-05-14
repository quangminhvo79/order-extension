import { Customer, CreateCustomer, AuthInfo } from '@/models/customer'
import { useCallback } from 'react'
import { storefrontAPI, authAPI } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

const ACCOUNT_API = '/account'

const useCustomer = () => {
  const authInfo = useCallback(async () => {
    const { authInfo } = await chrome.storage.sync.get('authInfo')
    return authInfo as AuthInfo
  }, [])

  const { data: userInfo, refetch: refetchUserInfo, isFetching: isFetchingUserInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      try {
        const authData = await authInfo()
        if (!authData) return null

        const response = await storefrontAPI.get(ACCOUNT_API, {
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
  })

  const saveAuthInfo = useCallback(async (authInfo: AuthInfo) => {
    await chrome.storage.sync.set({
      authInfo,
    })
  }, [])

  const isValidCustomer = useCallback((customer: Customer) => {
    return customer.email && customer.password && customer.firstName && customer.lastName
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!email || !password) return
    try {
      const { data } = await authAPI.post('/token', {
        username: email,
        password,
        grant_type: 'password',
      })
      saveAuthInfo(data)
      return true
    } catch (err) {
      // console.log(err)
      return false
    }
  }, [saveAuthInfo])

  const createUser = useCallback(async (customer: CreateCustomer) => {
    if (!customer || !isValidCustomer(customer)) return
    try {
      const response = await storefrontAPI.post(ACCOUNT_API, {
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
      const { data } = await storefrontAPI.patch(ACCOUNT_API, {
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
    try {
      const auth = await authInfo()
      const { data } = await authAPI.post('/token', {
        grant_type: 'refresh_token',
        refresh_token: auth.refresh_token,
      })
      // console.log(data)
      saveAuthInfo(data)
    } catch (err) {
      return null
    }
  }, [authInfo, saveAuthInfo])

  const signOut = useCallback(async () => {
    await chrome.storage.sync.remove('authInfo')
  }, [])

  return {
    createUser,
    updateUser,
    signIn,
    signOut,
    refrestToken,
    userInfo,
    refetchUserInfo,
    isFetchingUserInfo,
  }
}

export default useCustomer
