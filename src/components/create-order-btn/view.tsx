import { Button } from "flowbite-react";
import PriceAsVND from "@/components/price-as-vnd";

const CreateOrderBtnView = ({
  onSubmit,
}: {
  onSubmit: () => void
}) => {
  return (
    <>
      <div>
        <Button gradientMonochrome="failure" onClick={onSubmit} size="lg">
          Tạo Đơn
        </Button>
      </div>
      <PriceAsVND />
    </>
  )

}

export default CreateOrderBtnView;
