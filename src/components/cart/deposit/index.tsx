import * as React from 'react'
import { Button } from 'flowbite-react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { FileInput } from 'flowbite-react'
import BankQRcode from '@/assets/bank_qrcode.jpg'
import { Stack } from '@mui/material'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

type DepositProps = {
  isOpened: boolean
  setOpen: (open: boolean) => void
}

const Deposit = ({
  isOpened,
  setOpen,
}: DepositProps) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={isOpened}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <div className="flex flex-col items-center justify-center">
            <Stack className="mb-3">
              <p className="mb-3 font-bold text-black">Thông tin chuyển khoản: </p>
              <img src={BankQRcode} alt="BankQRCode" width={200}/>
            </Stack>
            <div>
              <FileInput id="file-upload" />
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack className="items-center w-full space-y-2">
          <Button className="w-full text-white bg-sky-800" onClick={handleClose} size="sm">Xác nhận đặt cọc</Button>
          <Button className="w-full" color="gray" onClick={handleClose} size="sm">Đóng</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

export default Deposit
