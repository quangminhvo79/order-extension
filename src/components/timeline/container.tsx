import { useEffect, useMemo, useState } from 'react'
import View from './view'
import useProduct from '@/hooks/use-product'
import useContact from '@/hooks/use-contact'

const TimelineContainer = () => {
  const { products } = useProduct()
  const { contact } = useContact()

  const steps = useMemo(() => [
    'Giỏ Hàng',
    'Xác nhận địa chỉ nhận hàng',
    'Đặt cọc và kết đơn',
  ], [])

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    products && contact ? setActiveStep(1) : setActiveStep(0)
  }, [products, contact])

  const computedProps = {
    steps,
    activeStep,
  }
  return <View {...computedProps} />
}

export default TimelineContainer
