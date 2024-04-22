import AddProductForm from "../add-product-form"
import AddProductSuccessAlert from '../alert/add-product-success'

const OrderFormView = () => {
  return (
    <>
      <AddProductSuccessAlert />
      <AddProductForm />
    </>
  )
}

export default OrderFormView
