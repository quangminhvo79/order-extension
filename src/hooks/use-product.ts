import { Product } from "@/models/product"
import { useCallback, useEffect, useState } from "react"

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

  useEffect(() => {
    getProducts()
  }, [])

  return {
    getProducts,
    saveProducts,
    removeAllProducts,
    products,
  }
}

export default useProduct
