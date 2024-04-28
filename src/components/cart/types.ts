import { ProductType } from '@/types/product'
import { Dispatch, SetStateAction } from 'react'

export type ItemByShopType = {
  shopName: string
  shopLink: string
  shopId: string
  items: ProductType[]
}

export type CartViewProps = {
  cart?: ItemByShopType[]
  onRemoveProduct: (productId: string) => void
  onClearAll: () => void
  totalCash?: number
  productSelected: string[] | undefined
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, productId: string) => void
  onCheckAllByShop: (event: React.ChangeEvent<HTMLInputElement>, shopId: string) => void
  onCheckAll: (event: React.ChangeEvent<HTMLInputElement>) => void
  allItemChecked: boolean
  allItemByShopChecked: {
    [key: string]: boolean
  },
  openDepositDialog: boolean
  setOpenDepositDialog: Dispatch<SetStateAction<boolean>>
  increaseQty: (productId: string) => void
  decreaseQty: (productId: string) => void
  onChangeQty: (productId: string, qty: number) => void
}
