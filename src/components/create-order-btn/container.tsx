import getDataOnPage from '@/utils/getDataOnPage'
import View from './view'
import { useCallback } from 'react'

const CreateOrderBtnContainer = () => {
  const onSubmit = useCallback(() => {
    const data = getDataOnPage('taobao')
    console.log(data)
    chrome.storage.sync.set({ orders: [data] })
    chrome.runtime.sendMessage({ action: 'openSidebar' })
  }, [])

  const computedProps = {
    onSubmit,
  }

  return <View {...computedProps} />
}
export default CreateOrderBtnContainer
