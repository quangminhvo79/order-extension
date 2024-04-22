import { Stack } from "@mui/material";
import { Checkbox, Table } from "flowbite-react";
import { useEffect, useState } from "react";

const products = [
  {
    image: '/img/apple-watch.png',
    name: 'Apple Watch',
    price: 599,
    qty: 1,
  },
  {
    image: '/img/imac.png',
    name: 'iMac 27"',
    price: 2499,
    qty: 2,
  },
  {
    image: '/img/iphone-12.png',
    name: 'IPhone 12 ',
    price: 999,
    qty: 3,
  },
]

const OrderDetailView = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data =  await chrome.storage.sync.get("orders");
      setOrders(data.orders)
    }
    fetchData()
  }, [chrome.storage.sync])

  return (
    <div className="overflow-x-hidden">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell className="text-center">Image</Table.HeadCell>
          <Table.HeadCell>Product</Table.HeadCell>
          <Table.HeadCell>Qty</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Total</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Action</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {(orders || products).map(item => (
            <Table.Row key={item.name} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="p-4">
                <Checkbox />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-10">
                <Stack className="w-24">
                  <img
                    srcSet={item.image}
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                  />
                </Stack>
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
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
                      value={item.qty}
                    />
                  </div>
                  <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                  </button>
                </div>
              </Table.Cell>
              <Table.Cell>${item.price}</Table.Cell>
              <Table.Cell>
                <span className="font-bold text-black">${item.price * item.qty}</span>
              </Table.Cell>
              <Table.Cell>
                <Stack direction="row" className="flex-col">
                  <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                    Remove
                  </a>
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default OrderDetailView
