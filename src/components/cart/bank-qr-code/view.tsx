import { forwardRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Button, Flowbite } from 'flowbite-react'
import { formatPrice } from '@/utils/helpers'
import type { CustomFlowbiteTheme } from 'flowbite-react'
import { BankQrCodeViewProps, BankAccount } from './types'
import { useDropzone } from 'react-dropzone'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const customTheme: CustomFlowbiteTheme = {
  tooltip: {
    'target': '',
  },
}

const BankQrCodeView = ({
  handleClose,
  bankAccounts,
  bankAccount,
  setBankAccount,
  bankQRCode,
  totalCash,
  isOpened,
  onSubmit,
  onDrop,
  filename,
  isSubmitting,
}: BankQrCodeViewProps) => {
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5242880,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
    },
  })

  return (
    <>
      <Dialog
        open={isOpened}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography className="text-lg font-bold text-red-600">
            Vui lòng chuyển khoản trước khi đặt hàng
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" className="pt-3">
            <Flowbite theme={{ theme: customTheme }}>
              <Stack className="flex-row gap-3">
                { bankAccounts && bankAccounts.map((bank_account: { attributes: BankAccount}) => (
                  <Button key={bank_account.attributes.account_number} color="light" onClick={() => setBankAccount(bank_account.attributes)} className="w-full">
                    {bank_account.attributes.bank_name.toUpperCase()}
                  </Button>
                ))}
              </Stack>
            </Flowbite>

            { bankAccount && (
              <Stack direction="row">
                <Stack alignItems="center" className="relative mt-4">
                  <img src={bankQRCode()} alt="QR Code" className="w-[300px]" />
                </Stack>
                <Stack className="justify-center">
                  <Box className="font-bold text-red-600">
                    <span className="text-sm">Ngân hàng:</span> {bankAccount.bank_name.toUpperCase()}
                  </Box>
                  <Box className="font-bold text-red-600">
                    <p className="text-sm">Tên chủ tài khoản: </p>
                    <p className="whitespace-nowrap">{bankAccount.account_name}</p>
                  </Box>
                  <Box className="font-bold text-red-600">
                    <span className="text-sm">Số tài khoản:</span> {bankAccount.account_number}
                  </Box>
                  <Box className="font-bold text-red-600">
                    <span className="text-sm">Số tiền cần chuyển:</span> {formatPrice(Number(totalCash))}
                  </Box>

                  <Box
                    {...getRootProps()}
                    className="flex items-center justify-center w-full mt-5 border border-gray-600 border-dashed rounded-lg cursor-pointer">
                    <Box className="flex flex-col items-center justify-center pt-3 pb-2">
                      <svg
                        className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <div className="mb-2 text-xs text-center text-gray-500 dark:text-gray-400">
                        <p className="font-semibold">Click hoặc kéo thả để tải lên</p>
                        <p className="font-semibold"> bằng chứng chuyển khoản</p>
                      </div>
                      <p className="text-xs overflow-hidden text-gray-500 truncate dark:text-gray-400 text-ellipsis w-[200px] text-center">
                        {filename ? filename : 'SVG, PNG, JPG or GIF (MAX. 5MB)'}
                      </p>
                    </Box>
                    <input id="dropzone-file" className="hidden" {...getInputProps()} />
                  </Box>
                </Stack>
              </Stack>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" className="items-center justify-center w-full gap-3 px-4 pb-3">
            <Button color="light" onClick={handleClose} className="w-full">Đóng</Button>
            <Button
              gradientMonochrome="failure" onClick={onSubmit} className="w-full"
              disabled={!bankAccount || !filename}
              isProcessing={isSubmitting}
            >
              {'Đã Thanh Toán (Đặt hàng)'}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BankQrCodeView
