import { useCallback, useState } from 'react'
import { Box, Link, Stack, Typography } from '@mui/material'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import { Table } from 'flowbite-react'
import { Product } from '@/models/product'
import { formatPrice } from '@/utils/helpers'
import cls from 'classnames'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const View = ({ orders }: { orders: any[] }) => {
  const [orderSelected, setOrderSelected] = useState<string | undefined>('')

  const toggleExpanded = useCallback((orderNumber: string) => {
    if (orderNumber !== orderSelected) {
      setOrderSelected(orderNumber)
    } else {
      setOrderSelected(undefined)
    }
  }, [orderSelected])

  return (
    <Box className="w-full p-4">
      <Stack direction="row" alignItems="center" justifyContent="space-between" className="p-3 mb-4 bg-red-100 border border-red-300 rounded">
        <Box className="space-x-2 text-2xl font-bold text-red-600">
          <CardGiftcardIcon />
          <span>Đơn đã đặt</span>
        </Box>
      </Stack>

      <Box className="p-2 overflow-x-auto">
        <Table hoverable>
          <Table.Head className="text-red-600 border-b border-gray-400">
            <Table.HeadCell className="bg-slate-100">Mã Đơn Hàng</Table.HeadCell>
            <Table.HeadCell className="bg-slate-100">Trạng Thái</Table.HeadCell>
            <Table.HeadCell className="bg-slate-100">Mã vận đơn</Table.HeadCell>
            <Table.HeadCell className="bg-slate-100">Số tiền</Table.HeadCell>
            <Table.HeadCell className="bg-slate-100 w-[100px]">Ngày đặt hàng</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            { orders && orders.map((order) => (
              <>
                <Table.Row
                  key={order.attributes.number}
                  className="bg-white cursor-pointer dark:border-gray-700 dark:bg-gray-800"
                  onClick={ () => toggleExpanded(order.attributes.number) }
                >
                  <Table.Cell className="pl-3 font-medium text-red-600 whitespace-nowrap dark:text-white">
                    <Typography>
                      {
                        order.attributes.number !== orderSelected ?
                          <KeyboardArrowDownIcon className="mb-1 mr-2 text-black"/> :
                          <KeyboardArrowUpIcon className="mb-1 mr-2 text-black"/>
                      }
                      <span className="font-bold text-gray-700">{order.attributes.number}</span>
                    </Typography>
                  </Table.Cell>

                  <Table.Cell className="font-medium text-red-600 whitespace-nowrap dark:text-white">
                    <Typography>
                      <span
                        className="px-3 py-2 text-white bg-red-400 border border-red-600 rounded-full cursor-pointer" dangerouslySetInnerHTML={
                        {__html: order.attributes.process_state}
                      }></span>
                    </Typography>
                  </Table.Cell>

                  <Table.Cell className="font-medium text-red-600 whitespace-nowrap dark:text-white">
                    {order.attributes.domestic_shipping_code && (
                      <Typography>
                        <span
                          className="px-3 py-2 text-white bg-red-400 border border-red-600 rounded-full cursor-pointer" dangerouslySetInnerHTML={
                          {__html: order.attributes.domestic_shipping_code}
                        }></span>
                      </Typography>
                    )}
                  </Table.Cell>

                  <Table.Cell className="font-medium text-red-600 whitespace-nowrap dark:text-white">
                    <Typography>
                      <span className="font-bold text-gray-700" dangerouslySetInnerHTML={
                        {__html: order.attributes.display_total}
                      }></span>
                    </Typography>
                  </Table.Cell>

                  <Table.Cell className="font-medium text-red-600 whitespace-nowrap dark:text-white">
                    <Typography>
                      <span className="text-gray-700 ">{order.attributes.created_at}</span>
                    </Typography>
                  </Table.Cell>
                </Table.Row>
                {order.attributes.products.map((product: Product) => (
                  <Table.Row
                    key={`${order.number}_product_${product.id}`}
                    className={cls('bg-white cursor-pointer dark:border-gray-700 dark:bg-gray-800', {
                      'hidden': order.attributes.number !== orderSelected,
                    })}
                  >
                    <Table.Cell className="w-10 font-medium text-gray-900 whitespace-nowrap dark:text-white" colSpan={3}>
                      <Stack className="flex-row items-center space-x-4">
                        <Stack className="w-[120px]">
                          {product.image ? (
                            <img srcSet={product.image} src={product.image} alt={product.name} loading="lazy" className="max-w-fit" />
                          ) : (
                            product.video ? <video src={product.video} controls className="max-w-fit" /> : ''
                          )}
                        </Stack>
                        <Stack className="min-w-[240px]">
                          <Link href={product.link} target="_blank" className="text-red-600">
                            <Stack>
                              <Typography className="text-wrap">{product.name}</Typography>
                              <Stack className="mt-2 space-x-1">
                                {product.variants.activeItems.map((variant, index) => (
                                  <Typography key={index} className="grid grid-cols-2 gap-2">
                                    <span key={product.variants.categoriesText[index]}
                                      className="font-bold text-sm text-gray-800 dark:text-gray-400 rounded cursor-default max-w-[200px] text-ellipsis overflow-hidden">
                                      {product.variants.categoriesText[index]}
                                    </span>
                                    <span key={variant}
                                      className="text-sm text-gray-800 dark:text-gray-400 rounded border border-gray-300 px-2 py-1 cursor-default max-w-[200px] text-ellipsis overflow-hidden">
                                      {variant}
                                    </span>
                                  </Typography>
                                ))}
                              </Stack>
                              {product.id}
                            </Stack>
                          </Link>
                        </Stack>
                      </Stack>
                    </Table.Cell>
                    <Table.Cell>
                      <Stack className="flex-col min-w-[100px] w-fit">
                        <Typography className="whitespace-nowrap">{formatPrice(Number(product.price) * Number(product.rate))}</Typography>
                        {Boolean(product.salePrice) && (
                          <Typography className="text-red-600 whitespace-nowrap">
                            <span>Sau Giảm Giá: </span>
                            <span className="font-bold text-red-600">{ formatPrice(Number(product.salePrice) * Number(product.rate))} đ</span>
                          </Typography>
                        )}
                      </Stack>
                      <hr className="my-3"/>
                      <Stack className="flex-row items-center justify-start w-full space-x-3">
                        <Typography className="whitespace-nowrap">Số lượng</Typography>
                        <input
                          type="number"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="1"
                          readOnly
                          value={product.qty}
                        />
                      </Stack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            )) }
          </Table.Body>
        </Table>
      </Box>
    </Box>
  )
}

export default View
