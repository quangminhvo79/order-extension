import getDataOnPage from '@/utils/getDataOnPage'
import View from './view'
import { useCallback } from 'react'
import { Bounce, toast } from 'react-toastify'
import isEmpty from 'lodash/isEmpty'
import findKey from 'lodash/findKey'
import SuccessToastMessage from './create-success'
import ExistToastMessage from './product-existed'

const CreateOrderBtnContainer = (props: { market: string }) => {
  const onSuccess = useCallback(() => {
    toast.success(<SuccessToastMessage />, {
      autoClose: 10000,
      theme: 'light',
      transition: Bounce,
    })
  }, [])

  const onExistData = useCallback(() => {
    toast.error(<ExistToastMessage />, {
      autoClose: false,
      theme: 'light',
      transition: Bounce,
    })
  }, [])

  const onSubmit = useCallback(async () => {
    const data = getDataOnPage(props.market)
    const { order: oldOrderData } =  await chrome.storage.sync.get('order')

    if (!data) return
    if (isEmpty(oldOrderData)) {
      chrome.storage.sync.set({ order: [data] })
      onSuccess()
    } else {
      if (findKey(oldOrderData, { id: data.id })) {
        onExistData()
        return
      }
      chrome.storage.sync.set({ order: [...oldOrderData, data] })
      onSuccess()
    }
  }, [onExistData, onSuccess, props.market])

  const computedProps = {
    onSubmit,
  }

  return <View {...computedProps} />
}
export default CreateOrderBtnContainer
