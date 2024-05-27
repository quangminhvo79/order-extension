import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import LandingPage from '@/components/landing-page'
import ContactForm from '@/components/contact-form'
import LoginFrom from '@/components/login-form'
import RegisterForm from '@/components/register-form'
import Cart from '@/components/cart'

const PopupNavigation = () => {
  return (
    <Suspense fallback={<LandingPage />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create_contact" element={<ContactForm />} />
        <Route path="/create_contact_on_new_window" element={<ContactForm newWindow={true} />} />
        <Route path="/sign_in" element={<LoginFrom />} />
        <Route path="/sign_up" element={<RegisterForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default PopupNavigation
