import { Button } from 'flowbite-react'

const CreateOrderBtnView = ({
  onSubmit,
}: {
  onSubmit: () => void
}) => {
  return (
    <div>
      <Button gradientMonochrome="failure" onClick={onSubmit} size="lg">
        Tạo Đơn
      </Button>
    </div>
  )

}

export default CreateOrderBtnView
