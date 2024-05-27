import View from './view'
import { useCallback } from 'react'
import { Bounce, toast } from 'react-toastify'
import useCrawlData from '@/hooks/use-crawl-data'

import isEmpty from 'lodash/isEmpty'
import findKey from 'lodash/findKey'
import SuccessToastMessage from './create-success'
import ExistToastMessage from './product-existed'
import useProduct from '@/hooks/use-product'
import { RELOAD_CART } from '@/utils/constants'
import useExchangeRate from '@/hooks/use-exchange-rate'

const CreateOrderBtnContainer = (props: { market: string }) => {
  const { crawlData } = useCrawlData(props.market)
  const { getProducts, saveProducts } = useProduct()
  const { rate } = useExchangeRate('CNY')

  const onSuccess = useCallback(() => {
    toast.success(<SuccessToastMessage />, {
      autoClose: 5000,
      theme: 'light',
      transition: Bounce,
    })
    chrome.runtime.sendMessage({ action: RELOAD_CART })
  }, [])

  const onExistData = useCallback(() => {
    toast.error(<ExistToastMessage />, {
      autoClose: 5000,
      theme: 'light',
      transition: Bounce,
    })
  }, [])

  const onInvalidProduct = useCallback(() => {
    toast.error((
      <div className="relative font-['tahoma']">
        <p>Vui lòng chọn loại sản phẩm</p>
      </div>
    ), {
      autoClose: 5000,
      theme: 'light',
      transition: Bounce,
    })
  }, [])

  const onSubmit = useCallback(async () => {
    const data = crawlData()
    if (data) {
      const currentProducts = await getProducts()

      if (!data) return
      const newProducts = isEmpty(currentProducts) ? [{...data, rate}] : [...currentProducts, {...data, rate}]

      if (!isEmpty(currentProducts) && findKey(currentProducts, { id: data.id })) {

        onExistData()
        return
      }

      saveProducts(newProducts)
      onSuccess()
    } else {
      onInvalidProduct()
    }
  }, [crawlData, getProducts, onExistData, onInvalidProduct, onSuccess, rate, saveProducts])

  const computedProps = {
    onSubmit,
  }

  return <View {...computedProps} />
}
export default CreateOrderBtnContainer
