import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'
import PopupHeaderMenus from './popup_header_menus'

const PopupLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ width: 500 }}>
      <PopupHeaderMenus />
      <Box className="p-4">
        {children}
      </Box>
    </Box>
  )
}

export default PopupLayout
