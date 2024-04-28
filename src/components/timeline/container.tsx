import { useMemo } from 'react'
import View from './view'

const TimelineContainer = () => {
  const steps = useMemo(() => [
    'Giỏ Hàng',
    'Xác nhận địa chỉ nhận hàng',
    'Đặt cọc và kết đơn',
  ], [])

  const computedProps = {
    steps,
  }
  return <View {...computedProps} />
}

export default TimelineContainer
