import { Navbar } from 'flowbite-react'
import Logo from '@/assets/logo.png'
import { useNavigate } from 'react-router-dom'

const SidepanelHeaderMenu = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src={Logo} className="h-6 mr-3 sm:h-9" alt="Flowbite React Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Order Tool</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="javascript:void(0)" onClick={() => navigate('/cart')}>
            Giỏ hàng
          </Navbar.Link>
          <Navbar.Link href="javascript:void(0)" onClick={() => navigate('/my_orders')}>
            Đơn đã đặt
          </Navbar.Link>
          <Navbar.Link href="#">Khiếu Nại</Navbar.Link>
          <Navbar.Link href="#">Biểu Phí</Navbar.Link>
          <Navbar.Link href="#">Hỗ Trợ</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default SidepanelHeaderMenu
