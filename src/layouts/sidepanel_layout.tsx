import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'
import SidepanelHeaderMenu from './sidepanel_header_menus'

const SidepanelLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box className="w-full p-5 space-y-5">
      <SidepanelHeaderMenu />
      <Box className="p-4">
        {children}
      </Box>
    </Box>
  )
}

export default SidepanelLayout
