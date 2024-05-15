import View from './view'
import { useCallback } from 'react'
import { Bounce, toast } from 'react-toastify'
import useCrawlData from '@/hooks/use-crawl-data'

import isEmpty from 'lodash/isEmpty'
import findKey from 'lodash/findKey'
import SuccessToastMessage from './create-success'
import ExistToastMessage from './product-existed'
import useProduct from '@/hooks/use-product'

const CreateOrderBtnContainer = (props: { market: string }) => {
  const { crawlData } = useCrawlData()
  const { getProducts, saveProducts } = useProduct()

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
    const data = crawlData(props.market)
    const currentProducts = await getProducts()

    if (!data) return
    const newProducts = isEmpty(currentProducts) ? [data] : [...currentProducts, data]

    if (!isEmpty(currentProducts) && findKey(currentProducts, { id: data.id })) {

      onExistData()
      return
    }

    saveProducts(newProducts)
    onSuccess()
  }, [crawlData, getProducts, onExistData, onSuccess, props.market, saveProducts])

  const computedProps = {
    onSubmit,
  }

  return <View {...computedProps} />
}
export default CreateOrderBtnContainer
