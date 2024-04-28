import { useEffect, useMemo, useState } from 'react'
import View from './view'

const TimelineContainer = () => {
  const steps = useMemo(() => [
    'Giỏ Hàng',
    'Xác nhận địa chỉ nhận hàng',
    'Đặt cọc và kết đơn',
  ], [])

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const { order } = await chrome.storage.sync.get('order')
      const { contact } = await chrome.storage.sync.get('contact')
      order && contact ? setActiveStep(1) : setActiveStep(0)
    }
    fetchData()
  }, [])

  const computedProps = {
    steps,
    activeStep,
  }
  return <View {...computedProps} />
}

export default TimelineContainer
