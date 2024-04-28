import { Link, Stack } from '@mui/material'
import { Checkbox, Table } from 'flowbite-react'
import StoreIcon from '@mui/icons-material/Store'
import { ItemByShopType } from './types'

const Shop = ({
  orderByShop,
  onCheckAllByShop,
  checked,
}: {
  orderByShop: ItemByShopType,
  onCheckAllByShop: (event: React.ChangeEvent<HTMLInputElement>, shopId: string) => void
  checked: boolean
}) => {

  return (
    <Table.Row key={orderByShop.shopName} className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="p-4">
        <Checkbox onChange={(event) => onCheckAllByShop(event, orderByShop.shopId)} checked={checked}/>
      </Table.Cell>
      <Table.Cell className="w-10 font-medium text-orange-500 whitespace-nowrap dark:text-white" colSpan={5}>
        <Stack className="flex-row items-center justify-start space-x-2">
          <Link href={orderByShop.shopLink} target="_blank" className="text-orange-500">
            <StoreIcon />
            <span className="font-bold">{orderByShop.shopName}</span>
          </Link>
        </Stack>
      </Table.Cell>
    </Table.Row>
  )
}

export default Shop
