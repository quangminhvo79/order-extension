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
import { OPEN_CART_PAGE } from '@/utils/constants'

const PopupHeaderMenus = () => {
  const navigate = useNavigate()
  const {
    onSignOut,
    isLogged,
  } = useContext(MainContext)

  const openSideBar = useCallback(() => {
    chrome.runtime.sendMessage({ action: OPEN_CART_PAGE })
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
        className="text-red-600 hover:text-red-700 hover:bg-red-200" label="Giá Vận Chuyển" icon={<ConnectWithoutContactIcon />}
        onClick={() => window.open('https://www.facebook.com/share/p/Cp4PU5HrRwWFFYDv/?mibextid=WC7FNe', '_blank')}
      />
      {isLogged && (
        <BottomNavigationAction
          className="text-red-600 hover:text-red-700 hover:bg-red-200" label="Địa chỉ" icon={<ContactsIcon />}
          onClick={onChangeContact}
        />
      )}
      {isLogged && (
        <BottomNavigationAction
          className="text-red-600 hover:text-red-700 hover:bg-red-200" label="Giỏ hàng" icon={<ShoppingCartCheckoutIcon />}
          onClick={openSideBar}
        />
      )}
      {isLogged && (
        <BottomNavigationAction
          className="text-red-600 hover:text-red-700 hover:bg-red-200" label="Đăng xuất" icon={<LogoutIcon />}
          onClick={onSignOut}
        />
      )}
      {!isLogged && (
        <BottomNavigationAction
          className="text-red-600 hover:text-red-700 hover:bg-red-200" label="Đăng nhập" icon={<LoginIcon />}
          onClick={onSignIn}
        />
      )}
      {!isLogged && (
        <BottomNavigationAction
          className="text-red-600 hover:text-red-700 hover:bg-red-200" label="Đăng ký" icon={<HowToRegIcon />}
          onClick={onSignUp}
        />
      )}
    </BottomNavigation>
  )
}

export default PopupHeaderMenus
