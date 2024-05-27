import useMyOrders from '@/hooks/use-my-orders'
import View from './view'

const Container = () => {
  const {
    orders,
  } = useMyOrders()

  return <View orders={orders} />
}

export default Container
