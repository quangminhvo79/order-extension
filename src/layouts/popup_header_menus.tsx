import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import ContactsIcon from '@mui/icons-material/Contacts'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import MainContext from '@/contexts/main-context'

const PopupHeaderMenus = () => {
  const navigate = useNavigate()
  const {
    onSignOut,
    isLogged,
  } = useContext(MainContext)

  const openSideBar = useCallback(() => {
    chrome.runtime.sendMessage({ action: 'openSidebar' })
    const currentWindow = chrome.extension.getViews({ type: 'popup' })[0]
    currentWindow.close()
  }, [])

  const onChangeContact = useCallback(() => {
    navigate('/create_contact')
  }, [navigate])

  const onSignIn = useCallback(() => {
    navigate('/sign_in')
  }, [navigate])

  const onSignUp = useCallback(() => {
    navigate('/sign_up')
  }, [navigate])

  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        className="text-orange-500 hover:text-red-700 hover:bg-orange-200" label="Tổng đài" icon={<ConnectWithoutContactIcon />}
        onClick={() => window.open('https://t.me/dich_vu_nhap_hang_bot', '_blank')}
      />
      {isLogged && (
        <BottomNavigationAction
          className="text-orange-500 hover:text-red-700 hover:bg-orange-200" label="Địa chỉ" icon={<ContactsIcon />}
          onClick={onChangeContact}
        />
      )}
      {isLogged && (
        <BottomNavigationAction
          className="text-orange-500 hover:text-red-700 hover:bg-orange-200" label="Giỏ hàng" icon={<ShoppingCartCheckoutIcon />}
          onClick={openSideBar}
        />
      )}
      {isLogged && (
        <BottomNavigationAction
          className="text-orange-500 hover:text-red-700 hover:bg-orange-200" label="Đăng xuất" icon={<LogoutIcon />}
          onClick={onSignOut}
        />
      )}
      {!isLogged && (
        <BottomNavigationAction
          className="text-orange-500 hover:text-red-700 hover:bg-orange-200" label="Đăng nhập" icon={<LoginIcon />}
          onClick={onSignIn}
        />
      )}
      {!isLogged && (
        <BottomNavigationAction
          className="text-orange-500 hover:text-red-700 hover:bg-orange-200" label="Đăng ký" icon={<HowToRegIcon />}
          onClick={onSignUp}
        />
      )}
    </BottomNavigation>
  )
}

export default PopupHeaderMenus
