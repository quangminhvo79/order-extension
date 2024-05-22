import { Box, Stack, Typography } from '@mui/material'
import { Button } from 'flowbite-react'
import { Checkbox, Table } from 'flowbite-react'
import { CartViewProps } from './types'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ProductInfo from './product-info'
import Shop from './shop'
import ContactRow from './contact-info'
import { formatPrice } from '@/utils/helpers'

const CartView = ({
  cart,
  onRemoveProduct,
  onClearAll,
  totalCash,
  productIdsSelected,
  onCheckboxChange,
  onCheckAllByShop,
  onCheckAll,
  allItemChecked,
  allItemByShopChecked,
  openDepositDialog,
  setOpenDepositDialog,
  increaseQty,
  decreaseQty,
  onChangeQty,
  onCreateOrderRequest,
}: CartViewProps) => {

  const totalCashText = `Tổng thanh toán (${productIdsSelected?.length} sản phẩm): `

  return (
    <Box className="w-full p-4">
      <Stack direction="row" alignItems="center" justifyContent="space-between" className="p-3 mb-4 bg-orange-100 border border-orange-300 rounded">
        <Box className="space-x-2 text-2xl font-bold text-orange-500">
          <ShoppingCartIcon />
          <span>Giỏ Hàng</span>
        </Box>
        <Button color="light" onClick={onClearAll} size="md" className="text-orange-500 border-orange-300">
          Xóa tất cả đơn hàng
        </Button>
      </Stack>
      <Box className="p-2 overflow-x-auto">
        <Table hoverable>
          <Table.Head className="text-orange-500 border-b border-gray-400">
            <Table.HeadCell className="p-4 bg-slate-100">
              <Checkbox onChange={onCheckAll} checked={allItemChecked}/>
            </Table.HeadCell>
            <Table.HeadCell className="bg-slate-100">Sản phẩm</Table.HeadCell>
            <Table.HeadCell className="bg-slate-100">Đơn giá</Table.HeadCell>
            <Table.HeadCell className="bg-slate-100">Số lượng</Table.HeadCell>
            <Table.HeadCell className="bg-slate-100">Số tiền</Table.HeadCell>
            <Table.HeadCell className="bg-slate-100">
              <span className="sr-only">Thao Tác</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {cart && cart.map((orderByShop) => (
              <>
                <Shop key={orderByShop.shopId} orderByShop={orderByShop} onCheckAllByShop={onCheckAllByShop} checked={allItemByShopChecked[orderByShop.shopId]}/>
                {orderByShop.items && orderByShop.items.map((product) => (
                  <ProductInfo
                    key={product.id}
                    product={product}
                    onRemoveProduct={onRemoveProduct}
                    onCheckboxChange={onCheckboxChange}
                    productIdsSelected={productIdsSelected}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    onChangeQty={onChangeQty}
                  />
                ))}
                <Table.Row key={`${orderByShop.shopId}_row`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="w-10 font-medium text-orange-500 whitespace-nowrap dark:text-white bg-slate-100" colSpan={6}></Table.Cell>
                </Table.Row>
              </>
              ),
            )}
            {cart && <ContactRow />}
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="font-medium text-orange-500 whitespace-nowrap dark:text-white" colSpan={6}>
                <Stack className="flex-row items-center justify-end space-x-3">
                  <Typography>
                    <span className="text-sm text-gray-700">{totalCashText}</span>
                    <span className="text-2xl font-bold text-orange-500">{ formatPrice(Number(totalCash)) }</span>
                  </Typography>
                  <Button
                    color="light" size="md" className="text-orange-500 border-orange-300"
                    onClick={onCreateOrderRequest}
                    disabled={!totalCash || totalCash === 0}
                  >
                    Đặt cọc
                  </Button>
                </Stack>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Box>
    </Box>
  )
}

export default CartView
