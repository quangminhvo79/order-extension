
import { useCallback } from 'react'
import { Product } from '@/models/product'
import { storefrontAPI } from '@/utils/api'
import useCustomer from './use-customer'
import { errorResponseUnauthorized } from './use-customer'
import { serialize } from 'object-to-formdata';

const useOrderRequest = () => {
  const {
    authData,
  } = useCustomer()

  const createOrderRequest = useCallback(async (products: Product[], invoice: File) => {
    if (!authData) return errorResponseUnauthorized

    const formData = serialize(
      products, undefined, undefined, 'products'
    );
    formData.append("invoice", invoice)

    try {
      const response = await storefrontAPI.post('/order_requests', formData, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      return response
    } catch (error: any) {
      return error.response
    }
  }, [authData])

  const updateOrderRequest = useCallback(async (orderId: string | number, products: Product[]) => {
    if (!authData) return errorResponseUnauthorized

    try {
      const response = await storefrontAPI.patch(`/order_requests/${orderId}`, {
        products,
      },{
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      })

      return response
    } catch (error) {
      return error
    }

  }, [authData])

  const deleteOrderRequest = useCallback(async (orderId: string | number) => {
    const response = await storefrontAPI.delete(`/order_requests/${orderId}`)

    return response
  }, [])

  return {
    createOrderRequest,
    updateOrderRequest,
    deleteOrderRequest,
  }
}

export default useOrderRequest
