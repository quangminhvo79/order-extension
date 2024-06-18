import { Dispatch, SetStateAction, forwardRef, useCallback, useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useBankAccounts from '@/hooks/use-bank-accounts'
import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Button, Flowbite } from 'flowbite-react';
import { formatPrice } from '@/utils/helpers';
import { Tooltip } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type BankAccount = {
  account_number: string
  account_name: string
  bank_name: string
  bank_fullname: string
}

const customTheme: CustomFlowbiteTheme = {
  tooltip: {
    "target": "",
  },
};

const BankQrCode = ({
  isOpened,
  setOpenDepositDialog,
  totalCash,
} : {
  isOpened: boolean,
  setOpenDepositDialog: Dispatch<SetStateAction<boolean>>
  totalCash: number | string
}) => {
  const {
    bankAccounts,
  } = useBankAccounts()

  const [bankAccount, setBankAccount] = useState<BankAccount | undefined>()

  const handleClose = () => {
    setOpenDepositDialog(false);
  };

  const transferDescription = useMemo(() => {
    return `Chuyển tiền đặt hàng cho TodoLogistics: ${formatPrice(Number(totalCash))}`
  }, [])

  const bankQRCode = useCallback(() => {
    if (!bankAccount) return ''
    return `
      https://img.vietqr.io/image/${bankAccount.bank_name}-${bankAccount.account_number}-compact.png?amount=${totalCash}&addInfo=${transferDescription}&accountName=${bankAccount.account_name}`
  }, [bankAccount])

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
            Vui lòng chuyển khoảng trước khi đặt hàng
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Flowbite theme={{ theme: customTheme }}>
              <Stack className="flex-row gap-3">
                { bankAccounts && bankAccounts.map((bank_account: { attributes: BankAccount}) => (
                  <Tooltip content={bank_account.attributes.bank_fullname} style="light">
                    <Button color="light" onClick={() => setBankAccount(bank_account.attributes)} className="w-full">
                      {bank_account.attributes.bank_name.toUpperCase()}
                    </Button>
                  </Tooltip>
                ))}
              </Stack>
            </Flowbite>

            { bankAccount && (
              <>
                <Stack alignItems="center" className="relative mt-4">
                  <img src={bankQRCode()} alt="QR Code" className="w-[400px]" />
                </Stack>
                <Stack className="items-center justify-center">
                  <Typography className="font-bold text-red-600">
                    Ngân hàng: {bankAccount.bank_name.toUpperCase()}
                  </Typography>
                  <Typography className="font-bold text-red-600">
                    Tên chủ tài khoản: {bankAccount.account_name}
                  </Typography>
                  <Typography className="font-bold text-red-600">
                    Số tài khoản: {bankAccount.account_number}
                  </Typography>
                  <Typography className="font-bold text-red-600">
                    Số tiền cần chuyển: {formatPrice(Number(totalCash))}
                  </Typography>
                </Stack>
              </>
            )}

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" className="items-center justify-center w-full gap-3 px-4 pb-3">
            <Button color="light" onClick={handleClose} className="w-full">Đóng</Button>
            <Button gradientMonochrome="failure" onClick={handleClose} className="w-full">Đã Thanh Toán</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BankQrCode
