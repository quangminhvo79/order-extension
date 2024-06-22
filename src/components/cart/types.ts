import { type Product } from '@/models/product'
import { Dispatch, SetStateAction } from 'react'

export type ItemByShopType = {
  shopName: string
  shopLink: string
  shopId: string
  items: Product[]
}

export type CartViewProps = {
  cart?: ItemByShopType[]
  onRemoveProducts: (productId: string[]) => void
  onClearAll: () => void
  totalCash?: number
  productIdsSelected: string[] | undefined
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, productId: string) => void
  onCheckAllByShop: (event: React.ChangeEvent<HTMLInputElement>, shopId: string) => void
  onCheckAll: (event: React.ChangeEvent<HTMLInputElement>) => void
  allItemChecked: boolean
  allItemByShopChecked: {
    [key: string]: boolean
  },
  increaseQty: (productId: string) => void
  decreaseQty: (productId: string) => void
  onChangeQty: (productId: string, qty: number) => void
  onCreateOrderRequest: () => void
  rate: number
  openDepositDialog: boolean
  setOpenDepositDialog: Dispatch<SetStateAction<boolean>>
  setInvoice: Dispatch<SetStateAction<File | undefined>>
  invoice?: File
  isSubmitting: boolean
}
