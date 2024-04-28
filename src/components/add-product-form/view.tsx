import { Typography, Box, Stack } from '@mui/material'
import { TextInput, Select, Button, Flowbite } from 'flowbite-react'
import type { CustomFlowbiteTheme } from 'flowbite-react'
import { useCallback } from 'react'

const customTheme: CustomFlowbiteTheme = {
  textInput: {
    'addon': 'min-w-[100px] text-center inline-flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400',
  },
  select: {
    'addon': 'min-w-[100px] text-center inline-flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400',
  },
}

const AddProductForm = () => {
  const openSideBar = useCallback(() => {
    chrome.runtime.sendMessage({ action: 'openSidebar' })
  }, [])

  return (
    <Box className="p-5 min-w-[500px]">
      <Typography className="px-3 py-2 mb-5 text-lg font-bold bg-gray-200 border border-gray-300 rounded">Đặt hàng</Typography>
      <Box className="max-w">
        <Flowbite theme={{theme: customTheme}}>
          <Stack className="space-y-3" flex="col">
            <TextInput id="price" value="Bonnie Green" addon="Đơn Giá" required />
            <TextInput id="weight" placeholder="Khối lượng" addon="Khối lượng" required />
            <TextInput id="total" placeholder="Tổng Tiền" addon="Tổng Tiền" required />
            <Select id="area" addon="Khu vực" required>
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
            <TextInput id="note" placeholder="Ghi chú" addon="Ghi chú" required />
          </Stack>
          <Stack className="mt-5">
            <Button gradientMonochrome="success" className="right" onClick={openSideBar}>
              Đặt hàng
            </Button>
          </Stack>
        </Flowbite>
      </Box>
    </Box>
  )
}

export default AddProductForm
