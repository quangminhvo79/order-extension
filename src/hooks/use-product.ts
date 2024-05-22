import { Product } from '@/models/product'
import { useCallback, useEffect, useState } from 'react'

const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([])

  const getProducts = useCallback(async () => {
    const { products } = await chrome.storage.sync.get('products')
    setProducts(products)

    return products
  }, [])

  const saveProducts = useCallback((products: any) => {
    chrome.storage.sync.set({ products })
    setProducts(products)
  }, [])

  const removeAllProducts = useCallback(() => {
    chrome.storage.sync.remove('products')
  }, [])

  const calcProductTotalPrice = useCallback((product: Product) => {
    if (Number(product.salePrice) > 0)
      return Number(product.salePrice) * Number(product.qty)

    return Number(product.price) * Number(product.qty)
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return {
    getProducts,
    saveProducts,
    removeAllProducts,
    calcProductTotalPrice,
    products,
  }
}

export default useProduct
