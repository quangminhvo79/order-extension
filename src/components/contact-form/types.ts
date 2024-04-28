import { Dispatch, SetStateAction } from 'react'

export type ContactFormViewType = {
  provinces: string[]
  districts: string[] | null
  wards: string[] | null
  province: string
  district: string
  ward: string
  setProvince: Dispatch<SetStateAction<string>>
  setDistrict: Dispatch<SetStateAction<string>>
  setWard: Dispatch<SetStateAction<string>>
  address: string
  recipient: string
  phone: string
  note: string
  setAddress: Dispatch<SetStateAction<string>>
  setRecipient: Dispatch<SetStateAction<string>>
  setPhone: Dispatch<SetStateAction<string>>
  setNote: Dispatch<SetStateAction<string>>
  onSubmit: () => void
  formRef: React.RefObject<HTMLFormElement>
}

export type ContactType = {
  recipient: string
  phone: string
  address: string
  note: string
  province: string
  district: string
  ward: string
}
