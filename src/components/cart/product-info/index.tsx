import { type Product } from '@/models/product'
import { Link, Stack, Typography } from '@mui/material'
import { Button, Checkbox, Table } from 'flowbite-react'
import cls from 'classnames'
import { useMemo } from 'react'
import { formatPrice } from '@/utils/helpers'
import useExchangeRate from '@/hooks/use-exchange-rate'

type ProductProps = {
  product: Product,
  onRemoveProduct: (productId: string) => void
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, productId: string) => void
  productIdsSelected?: string[]
  increaseQty: (productId: string) => void
  decreaseQty: (productId: string) => void
  onChangeQty: (productId: string, qty: number) => void
}

const ProductInfo = ({
  product,
  onRemoveProduct,
  onCheckboxChange,
  productIdsSelected,
  increaseQty,
  decreaseQty,
  onChangeQty,
}: ProductProps) => {

  const { rate } = useExchangeRate('CNY')
  const checked = useMemo(() => {
    return productIdsSelected?.includes(product.id)
  }, [product.id, productIdsSelected])

  return (
    <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="p-4">
        <Checkbox onChange={(event) => onCheckboxChange(event, product.id)} checked={checked}/>
      </Table.Cell>
      <Table.Cell className="w-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Stack className="flex-row items-center space-x-4">
          <Stack className="w-[120px]">
            {product.image ? (
              <img srcSet={product.image} src={product.image} alt={product.name} loading="lazy" className="max-w-fit" />
            ) : (
              product.video ? <video src={product.video} controls className="max-w-fit" /> : ''
            )}
          </Stack>
          <Stack className="min-w-[240px]">
            <Link href={product.link} target="_blank" className="text-orange-500">
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
          <Typography className="whitespace-nowrap">{formatPrice(Number(product.price) * rate)}</Typography>
          {Boolean(product.salePrice) && (
            <Typography className="text-orange-500 whitespace-nowrap">
              <span>Sau Giảm Giá: </span>
              <span className="font-bold text-orange-500">{ formatPrice(Number(product.salePrice) * rate )} đ</span>
            </Typography>
          )}
        </Stack>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center">
          <button
            className="inline-flex items-center justify-center w-6 h-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full me-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
            onClick={() => decreaseQty(product.id)}
          >
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
            </svg>
          </button>
          <div>
            <input
              type="number"
              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1"
              required
              value={product.qty}
              onChange={(e) => onChangeQty(product.id, Number(e.target.value))}
            />
          </div>
          <button
            className="inline-flex items-center justify-center w-6 h-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full ms-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"
            onClick={() => increaseQty(product.id)}
          >
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
          </button>
        </div>
      </Table.Cell>
      <Table.Cell>
        <Stack className="flex-col">
          <Typography className={ cls('whitespace-nowrap', {
            'font-bold text-black': !Boolean(product.salePrice),
            'text-gray-400 line-through': Boolean(product.salePrice),
          }) }>
            { formatPrice(rate * Number(product.price) * Number(product.qty)) }
          </Typography>
          {Boolean(product.salePrice) && (
            <Typography className="font-bold text-orange-500 whitespace-nowrap">{ formatPrice(rate * Number(product.salePrice) * Number(product.qty)) }</Typography>
          )}
        </Stack>
      </Table.Cell>
      <Table.Cell>
        {false && (
          <Button color="light" size="md" className="me-2" onClick={ () => console.log(product) }>
            Tạo
          </Button>
        )}
        <Button color="light" size="md" onClick={() => onRemoveProduct(product.id)}>
          Xóa
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}

export default ProductInfo
