
import { useCallback } from 'react'
import { BottomNavigation, BottomNavigationAction, Box, Paper, Stack, Typography } from '@mui/material'
import ContactsIcon from '@mui/icons-material/Contacts'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { Button } from 'flowbite-react'
import { useNavigate } from "react-router-dom";

const LandingPageView = () => {
  const navigate = useNavigate()

  const openSideBar = useCallback(() => {
    chrome.runtime.sendMessage({ action: 'openSidebar' })
    const currentWindow = chrome.extension.getViews({ type: "popup" })[0];
    currentWindow.close()
  }, [])

  const onChangeContact = useCallback(() => {
    navigate('/create_contact')
  }, [])

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          className="text-orange-500 hover:text-red-700 hover:bg-orange-200" label="Customer Services" icon={<ConnectWithoutContactIcon />}
          onClick={() => window.open('https://t.me/dich_vu_nhap_hang_bot', '_blank')}
        />
        <BottomNavigationAction
          className="text-orange-500 hover:text-red-700 hover:bg-orange-200" label="Contact" icon={<ContactsIcon />}
          onClick={onChangeContact}
        />
        <BottomNavigationAction
          className="text-orange-500 hover:text-red-700 hover:bg-orange-200" label="Cart" icon={<ShoppingCartCheckoutIcon />}
          onClick={openSideBar}
        />
      </BottomNavigation>
      <Box className="p-4">
        <Paper elevation={3} className="p-3">
          <Typography className="mb-5 text-2xl font-bold text-center text-orange-500">
            Dịch vụ nhập hàng Uy Tín
          </Typography>
          <img src="https://via.placeholder.com/500x200" alt="placeholder" className="w-full h-[200px] mb-5 rounded-lg" />
          <Stack>
            <Button className="w-full" gradientDuoTone="pinkToOrange">Đăng ký</Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

export default LandingPageView
