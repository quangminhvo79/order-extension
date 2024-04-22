import { Button } from "flowbite-react";

const CreateOrderBtnView = ({
  onSubmit,
}: {
  onSubmit: () => void
}) => {
  return <Button gradientMonochrome="failure" onClick={onSubmit} size="lg">
    Tạo Đơn
  </Button>
}

export default CreateOrderBtnView;
