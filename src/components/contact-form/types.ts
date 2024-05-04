import { Dispatch, SetStateAction } from 'react'

export type ContactFormViewType = {
  provinces: string[]
  districts: string[] | null
  wards: string[] | null
  province?: string
  district?: string
  ward?: string
  setProvince: Dispatch<SetStateAction<string | undefined>>
  setDistrict: Dispatch<SetStateAction<string| undefined>>
  setWard: Dispatch<SetStateAction<string | undefined>>
  address?: string
  recipient?: string
  phone?: string
  note?: string
  setAddress: Dispatch<SetStateAction<string | undefined>>
  setRecipient: Dispatch<SetStateAction<string | undefined>>
  setPhone: Dispatch<SetStateAction<string | undefined>>
  setNote: Dispatch<SetStateAction<string | undefined>>
  onSubmit: () => void
  formRef: React.RefObject<HTMLFormElement>
}
