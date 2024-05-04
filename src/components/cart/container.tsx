import { useEffect, useState, useCallback, useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import compact from 'lodash/compact'
import includes from 'lodash/includes'
import { type Product } from '@/models/product'

import { ItemByShopType } from './types'

import View from './view'
import { BasePrice } from '@/utils/helpers'
import useProduct from '@/hooks/use-product'

const CartContainer = () => {
  const [cart, setCart] = useState<ItemByShopType[]>()
  const [productSelected, setProductSelected] = useState<string[]>([])
  const [openDepositDialog, setOpenDepositDialog] = useState(false)
  const { getProducts, removeAllProducts, saveProducts } = useProduct()

  const totalCash = useMemo(() => {
    if (!productSelected.length) return 0

    const totalToken = cart?.flatMap((item) => item.items.map((product) => {
      return productSelected.includes(product.id) ? (
        Number(product.salePrice) !== 0 ? Number(product.salePrice) * Number(product.qty) : Number(product.price) * Number(product.qty)
      ) : 0
    })).reduce((a: number, b: number) => a + b, 0) || 0

    return totalToken * BasePrice
  }, [cart, productSelected])

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

  const onRemoveProduct = useCallback((productId: string) => {
    const fetchData = async () => {
      const products = await getProducts()
      if (!products) return
      const newProducts = products.filter((item: Product) => item.id !== productId)

      if (isEmpty(newProducts)) {
        removeAllProducts()
        setCart(undefined)
      } else {
        saveProducts(newProducts)
        buildCart(newProducts)
      }
    }

    fetchData()
  }, [buildCart])

  const onClearAll = useCallback(() => {
    setCart(undefined)
    setProductSelected([])
    removeAllProducts()
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

  const increaseQty = useCallback(async (productId: string) => {
    const products = await getProducts()
    if (products) {
      const product = products.find((item: Product) => item.id === productId)
      product.qty = Number(product.qty) + 1
      buildCart(products)
      saveProducts(products)
    }
  }, [buildCart])

  const decreaseQty = useCallback(async (productId: string) => {
    const products = await getProducts()
    if (products) {
      const product = products.find((item: Product) => item.id === productId)
      product.qty = Number(product.qty) - 1
      buildCart(products)
      saveProducts(products)
    }
  }, [buildCart])

  const onChangeQty = useCallback(async (productId: string, qty: number) => {
    const products = await getProducts()
    if (products) {
      const product = products.find((item: Product) => item.id === productId)
      product.qty = qty
      buildCart(products)
      chrome.storage.sync.set(products)
    }
  }, [buildCart])

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts()
      buildCart(products)
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
    openDepositDialog,
    setOpenDepositDialog,
    increaseQty,
    decreaseQty,
    onChangeQty,
  }

  return <View {...computedProps} />
}

export default CartContainer
