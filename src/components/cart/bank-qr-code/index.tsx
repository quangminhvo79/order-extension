import { useCallback, useEffect, useMemo, useState } from 'react'
import useBankAccounts from '@/hooks/use-bank-accounts'
import { formatPrice } from '@/utils/helpers'
import View from './view'
import { BankQrCodeProps, BankAccount } from './types'
import { toast } from 'react-toastify'

const BankQrCode = ({
  isOpened,
  setOpenDepositDialog,
  totalCash,
  onCreateOrderRequest,
  invoice,
  setInvoice,
}: BankQrCodeProps) => {
  const {
    bankAccounts,
  } = useBankAccounts()
  const [bankAccount, setBankAccount] = useState<BankAccount | undefined>()
  const [filename, setFilename] = useState<string>()

  const handleClose = useCallback(() => {
    setOpenDepositDialog(false)
  }, [setOpenDepositDialog])

  const transferDescription = useMemo(() => {
    return `Chuyển tiền đặt hàng Todo Logistics: ${formatPrice(Number(totalCash))}`
  }, [totalCash])

  const bankQRCode = useCallback(() => {
    if (!bankAccount) return ''
    return `
      https://img.vietqr.io/image/${bankAccount.bank_name}-${bankAccount.account_number}-compact.png?amount=${totalCash}&addInfo=${transferDescription}&accountName=${bankAccount.account_name}`
  }, [bankAccount, totalCash, transferDescription])

  const onSubmit = useCallback(() => {
    if (invoice) onCreateOrderRequest(handleClose)

    toast.error('Vui lòng upload hóa đơn')
  }, [handleClose, onCreateOrderRequest])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('acceptedFiles', acceptedFiles)
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setFilename(file.name)
    setInvoice(file)
  }, [setInvoice])

  useEffect(() => {
    if (bankAccounts && bankAccounts.length > 0) {
      setBankAccount(bankAccounts[0].attributes)
    }
  }, [bankAccounts])

  const computedProps = {
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
  }

  return <View {...computedProps} />
}

export default BankQrCode
