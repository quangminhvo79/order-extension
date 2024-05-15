import { useEffect, useMemo, useState } from 'react'
import View from './view'
import useProduct from '@/hooks/use-product'
import useAddress from '@/hooks/use-address'

const TimelineContainer = () => {
  const { products } = useProduct()
  const {
    addresses,
  } = useAddress()

  const address = useMemo(() => {
    return addresses && addresses[0]
  }, [addresses])

  const steps = useMemo(() => [
    'Giỏ Hàng',
    'Xác nhận địa chỉ nhận hàng',
    'Đặt cọc và kết đơn',
  ], [])

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    products && address ? setActiveStep(1) : setActiveStep(0)
  }, [products, address])

  const computedProps = {
    steps,
    activeStep,
  }
  return <View {...computedProps} />
}

export default TimelineContainer
