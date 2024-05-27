import { useEffect, useState, useCallback, useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import compact from 'lodash/compact'
import includes from 'lodash/includes'
import { type Product } from '@/models/product'

import { ItemByShopType } from './types'

import View from './view'
import useProduct from '@/hooks/use-product'
import { useQuery } from '@tanstack/react-query'
import { RELOAD_CART } from '@/utils/constants'
import useOrderRequest from '@/hooks/use-order-request'
import { toast } from 'react-toastify'
import useExchangeRate from '@/hooks/use-exchange-rate'

const CartContainer = () => {
  const [cart, setCart] = useState<ItemByShopType[]>()
  const [productIdsSelected, setProductIdsSelected] = useState<string[]>([])
  // const [openDepositDialog, setOpenDepositDialog] = useState(false)
  const { getProducts, removeAllProducts, saveProducts, calcProductTotalPrice } = useProduct()
  const {
    createOrderRequest,
  } = useOrderRequest()
  const { rate } = useExchangeRate('CNY')

  const productsSelectedData = useMemo(() => {
    return cart?.flatMap((item) => item.items.filter((product) => productIdsSelected.includes(product.id)))
  }, [cart, productIdsSelected])

  const totalCash = useMemo(() => {
    if (!productIdsSelected.length) return 0

    const totalToken = cart?.flatMap((item) => item.items.map((product) => {
      return productIdsSelected.includes(product.id) ? calcProductTotalPrice(product) : 0
    })).reduce((a: number, b: number) => a + b, 0) || 0

    return totalToken * rate
  }, [calcProductTotalPrice, cart, productIdsSelected, rate])

  const buildCart = useCallback(async (order: Product[]) => {
    if (!isEmpty(order)) {
      const result = Object.groupBy(order, ({ shopId }: Product) => shopId)

      if (result) {
        const _order = Object.keys(result).map((key) => {
          if (result[key]) {
            return {
              shopName: result[key]?.[0].shopName || key,
              shopLink: key,
              items: result[key] || [],
              shopId: result[key]?.[0].shopId || '',
            }
          }
          return null
        })

        if (_order) setCart(compact(_order))
      }
    }
  }, [])

  const onRemoveProducts = useCallback(async (productIds: string[]) => {
    const products = await getProducts()
    if (!products) return

    const newProducts = products.filter((item: Product) => !productIds.includes(item.id))

    if (isEmpty(newProducts)) {
      removeAllProducts()
      setCart(undefined)
    } else {
      saveProducts(newProducts)
      buildCart(newProducts)
    }
  }, [buildCart, getProducts, removeAllProducts, saveProducts])

  const onClearAll = useCallback(() => {
    setCart(undefined)
    setProductIdsSelected([])
    removeAllProducts()
  }, [removeAllProducts])

  const addProductToCheckoutList = useCallback((productId: string) => {
    setProductIdsSelected((prevState) => {
      if (prevState) {
        return prevState.includes(productId) ? [...prevState] : [...prevState, productId]
      }
      return [productId]
    })
  }, [])

  const removeProductFromCheckoutList = useCallback((productId: string) => {
    setProductIdsSelected((prevState) => {
      if (prevState) {
        return prevState.filter((id) => id !== productId)
      }
      return []
    })
  }, [])

  const onCheckboxChange = useCallback((evnet: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    if (evnet.target.checked) {
      addProductToCheckoutList(productId)
    } else {
      removeProductFromCheckoutList(productId)
    }
  }, [addProductToCheckoutList, removeProductFromCheckoutList])

  const onCheckAll = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      cart?.flatMap((item) => item.items.map((product) => addProductToCheckoutList(product.id)))
    } else {
      cart?.flatMap((item) => item.items.map((product) => removeProductFromCheckoutList(product.id)))
    }
  }, [addProductToCheckoutList, cart, removeProductFromCheckoutList])

  const allItemChecked = useMemo(() => {
    return productIdsSelected?.length === cart?.flatMap((item) => item.items.map((product) => product.id)).length
  }, [cart, productIdsSelected?.length])

  const allItemByShopChecked = useMemo(() => {
    const initialValue = {}
    if (!cart) return initialValue
    return cart.reduce((acc, shop) => {
      return {
        ...acc,
        [shop.shopId]: productIdsSelected.some(productId => includes(shop.items.map(item => item.id), productId) ),
      }
    }, initialValue)
  }, [cart, productIdsSelected])

  const onCheckAllByShop = useCallback((event: React.ChangeEvent<HTMLInputElement>, shopId: string) => {
    if (event.target.checked) {
      cart?.find((shop) => shop.shopId === shopId)?.items.map((product) => addProductToCheckoutList(product.id))
    } else {
      cart?.find((shop) => shop.shopId === shopId)?.items.map((product) => removeProductFromCheckoutList(product.id))
    }
  }, [addProductToCheckoutList, cart, removeProductFromCheckoutList])

  const increaseQty = useCallback(async (productId: string) => {
    const products = await getProducts()
    if (products) {
      const product = products.find((item: Product) => item.id === productId)
      product.qty = Number(product.qty) + 1
      buildCart(products)
      saveProducts(products)
    }
  }, [buildCart, getProducts, saveProducts])

  const decreaseQty = useCallback(async (productId: string) => {
    const products = await getProducts()
    if (products) {
      const product = products.find((item: Product) => item.id === productId)
      product.qty = Number(product.qty) - 1
      buildCart(products)
      saveProducts(products)
    }
  }, [buildCart, getProducts, saveProducts])

  const onChangeQty = useCallback(async (productId: string, qty: number) => {
    const products = await getProducts()
    if (products) {
      const product = products.find((item: Product) => item.id === productId)
      product.qty = qty
      buildCart(products)
      chrome.storage.sync.set(products)
    }
  }, [buildCart, getProducts])

  const { refetch: refetchCart } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const products = await getProducts()
      buildCart(products)
      return true
    },
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    chrome.runtime.onMessage.removeListener(() => true)
    chrome.runtime.onMessage.addListener(async (request) => {
      if (request.action === RELOAD_CART) {
        refetchCart()
      }
    })
  }, [refetchCart])

  const onCreateOrderRequest = useCallback(async () => {
    // console.log('create order request', productsSelectedData)
    if (!productsSelectedData) return
    const response = await createOrderRequest(productsSelectedData)
    // console.log('response', response)
    if (response.status === 200) {
      onRemoveProducts(productIdsSelected)
      setProductIdsSelected([])
      toast.success('Tạo order thành công', {
        autoClose: 5000,
        theme: 'light',
      })
    } else {
      toast.error(response.data.error || response.data.message, {
        autoClose: 5000,
        theme: 'light',
      })
    }

  }, [productsSelectedData, createOrderRequest, onRemoveProducts, productIdsSelected])

  const computedProps = {
    cart,
    onRemoveProducts,
    onClearAll,
    totalCash,
    productIdsSelected,
    onCheckboxChange,
    onCheckAll,
    onCheckAllByShop,
    allItemChecked,
    allItemByShopChecked,
    increaseQty,
    decreaseQty,
    onChangeQty,
    onCreateOrderRequest,
  }

  return <View {...computedProps} />
}

export default CartContainer
