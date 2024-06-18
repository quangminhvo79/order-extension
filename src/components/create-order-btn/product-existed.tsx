import { OPEN_CART_PAGE } from '@/utils/constants'
import { useCallback } from 'react'

const ExistToastMessage = () => {
  const onCloseExistToast = useCallback(() => {
    chrome.runtime.sendMessage({ action: OPEN_CART_PAGE })
  }, [])

  return (
    <div className="relative font-['tahoma']">
      <p>Sản phẩm đã có trong giỏ hàng</p>
      <p className="text-red-400 cursor-pointer" onClick={onCloseExistToast}>
        Đi đến giỏ hàng
      </p>
    </div>
  )
}

export default ExistToastMessage
