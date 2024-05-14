import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import ContactsIcon from '@mui/icons-material/Contacts'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

const PopupHeaderMenus = () => {
  const navigate = useNavigate()

  const openSideBar = useCallback(() => {
    chrome.runtime.sendMessage({ action: 'openSidebar' })
    const currentWindow = chrome.extension.getViews({ type: 'popup' })[0]
    currentWindow.close()
  }, [])

  const onChangeContact = useCallback(() => {
    navigate('/create_contact')
  }, [navigate])

  return (
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
  )
}

export default PopupHeaderMenus
