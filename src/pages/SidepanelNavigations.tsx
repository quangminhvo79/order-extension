import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Cart from '@/components/cart'
import MyOrders from '@/components/my-orders'

const SidepanelNavigations = () => {
  return (
    <Suspense fallback={<Cart />}>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/my_orders" element={<MyOrders />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default SidepanelNavigations
