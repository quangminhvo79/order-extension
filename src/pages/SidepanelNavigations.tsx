import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Cart from '@/components/cart'
import MyOrders from '@/components/my-orders'
import Auth from './Auth'
import LoginFrom from '@/components/login-form'
import RegisterForm from '@/components/register-form'

const SidepanelNavigations = () => {
  return (
    <Suspense fallback={<Cart />}>
      <Routes>
        <Route path="/" element={<Auth><Cart /></Auth>} />
        <Route path="/my_orders" element={<Auth><MyOrders /></Auth>} />
        <Route path="/register" element={<RegisterForm isGotoHome={false} />} />
        <Route path="/login" element={<LoginFrom isGotoHome={false} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default SidepanelNavigations
