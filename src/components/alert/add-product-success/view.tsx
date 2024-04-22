import { Alert } from "flowbite-react";
import { Typography, Link } from "@mui/material";

const AddProductSuccessAlertView = () => {
  return (
    <Alert color="success" onDismiss={() => alert('Alert dismissed!')}>
      <Typography>
        <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
      </Typography>
      Đi đến <Link href="#">Giỏ hàng</Link>.
    </Alert>
  )
}

export default AddProductSuccessAlertView
