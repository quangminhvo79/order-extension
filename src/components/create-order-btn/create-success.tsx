import { OPEN_CART_PAGE } from '@/utils/constants'
import { useCallback } from 'react'

const SuccessToastMessage = () => {
  const onClose = useCallback(() => {
    chrome.runtime.sendMessage({ action: OPEN_CART_PAGE })
  }, [])

  return (
    <div className="relative font-['tahoma']">
      <p>Sản phẩm đã được thêm vào giỏ hàng</p>
      <p className="text-orange-400 cursor-pointer" onClick={onClose}>
        Đi đến giỏ hàng
      </p>
    </div>
  )
}

export default SuccessToastMessage
