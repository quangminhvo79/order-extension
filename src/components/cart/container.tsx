import { useEffect, useState, useCallback, useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import compact from 'lodash/compact'
import includes from 'lodash/includes'
import { ProductType } from '@/types/product'

import { ItemByShopType } from './types'

import View from './view'

const CartContainer = () => {
  const [cart, setCart] = useState<ItemByShopType[]>()
  const [productSelected, setProductSelected] = useState<string[]>([])

  const totalCash = useMemo(() => {
    if (!productSelected.length) return 0

    // return cart.map((item: ProductType) => )
                // .reduce((a: number, b: number) => a + b, 0)
    return cart?.flatMap((item) => item.items.map((product) => {
      return productSelected.includes(product.id) ? (
        Number(product.salePrice) !== 0 ? Number(product.salePrice) : Number(product.price)
      ) : 0
    })).reduce((a: number, b: number) => a + b, 0)
  }, [cart, productSelected])

  const buildCart = useCallback(async (order: ProductType[]) => {
    if (!isEmpty(order)) {
      const result = Object.groupBy(order, ({ shopId }: ProductType) => shopId)

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

  const onRemoveProduct = useCallback((productId: string) => {
    const fetchData = async () => {
      const { order } = await chrome.storage.sync.get('order')
      if (!order) return
      const newOrder = order.filter((item: ProductType) => item.id !== productId)

      if (isEmpty(newOrder)) {
        chrome.storage.sync.remove('order')
        setCart(undefined)
      } else {
        chrome.storage.sync.set({ order: newOrder })
        buildCart(newOrder)
      }
    }

    fetchData()
  }, [buildCart])

  const onClearAll = useCallback(() => {
    setCart(undefined)
    chrome.storage.sync.remove('order')
  }, [])

  const addProductToCheckoutList = useCallback((productId: string) => {
    setProductSelected((prevState) => {
      if (prevState) {
        return prevState.includes(productId) ? [...prevState] : [...prevState, productId]
      }
      return [productId]
    })
  }, [])

  const removeProductFromCheckoutList = useCallback((productId: string) => {
    setProductSelected((prevState) => {
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
    return productSelected?.length === cart?.flatMap((item) => item.items.map((product) => product.id)).length
  }, [cart, productSelected?.length])

  const allItemByShopChecked = useMemo(() => {
    const initialValue = {}
    if (!cart) return initialValue
    return cart.reduce((acc, shop) => {
      return {
        ...acc,
        [shop.shopId]: productSelected.some(productId => includes(shop.items.map(item => item.id), productId) ),
      }
    }, initialValue)
  }, [cart, productSelected])

  const onCheckAllByShop = useCallback((event: React.ChangeEvent<HTMLInputElement>, shopId: string) => {
    if (event.target.checked) {
      cart?.find((shop) => shop.shopId === shopId)?.items.map((product) => addProductToCheckoutList(product.id))
    } else {
      cart?.find((shop) => shop.shopId === shopId)?.items.map((product) => removeProductFromCheckoutList(product.id))
    }
  }, [addProductToCheckoutList, cart, removeProductFromCheckoutList])

  useEffect(() => {
    const fetchData = async () => {
      const { order } = await chrome.storage.sync.get('order')
      buildCart(order)
    }

    fetchData()
  }, [buildCart])

  const computedProps = {
    cart,
    onRemoveProduct,
    onClearAll,
    totalCash,
    productSelected,
    onCheckboxChange,
    onCheckAll,
    onCheckAllByShop,
    allItemChecked,
    allItemByShopChecked,
  }

  return <View {...computedProps} />
}

export default CartContainer
