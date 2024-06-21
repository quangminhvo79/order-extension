import { Dispatch, SetStateAction } from 'react'

export type BankAccount = {
  account_number: string
  account_name: string
  bank_name: string
  bank_fullname: string
}

export type BankQrCodeViewProps = {
  handleClose: () => void
  bankAccounts: any
  bankAccount?: BankAccount
  setBankAccount: Dispatch<SetStateAction<BankAccount | undefined>>
  bankQRCode: () => string
  totalCash: number | string
  isOpened: boolean
  onSubmit: () => void
  onDrop: (acceptedFiles: File[]) => void
  filename?: string
}

export type BankQrCodeProps = {
  isOpened: boolean,
  setOpenDepositDialog: Dispatch<SetStateAction<boolean>>
  totalCash: number | string
  onCreateOrderRequest: (callback?: () => void) => void
  setInvoice: Dispatch<SetStateAction<File | undefined>>
  invoice?: File
}
