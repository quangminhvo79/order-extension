import { useCallback } from 'react'

const ExistToastMessage = () => {
  const onCloseExistToast = useCallback(() => {
    chrome.runtime.sendMessage({ action: 'openSidebar' })
  }, [])

  return (
    <div className="relative font-['tahoma']">
      <p>Sản phẩm đã có trong giỏ hàng</p>
      <p className="text-orange-400 cursor-pointer" onClick={onCloseExistToast}>
        Đi đến giỏ hàng
      </p>
    </div>
  )
}

export default ExistToastMessage
