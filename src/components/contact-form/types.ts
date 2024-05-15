import { Dispatch, SetStateAction } from 'react'

export type ContactFormViewType = {
  address1?: string
  address2?: string
  firstname?: string
  lastname?: string
  companyName?: string
  phone?: number
  districts: string[] | null
  wards: string[] | null
  city?: string
  district?: string
  ward?: string
  label?: string
  address?: string
  cities: string[]
  note?: string

  setAddress1: Dispatch<SetStateAction<string | undefined>>
  setAddress2: Dispatch<SetStateAction<string | undefined>>
  setFirstname: Dispatch<SetStateAction<string | undefined>>
  setLastname: Dispatch<SetStateAction<string | undefined>>
  setCompanyName: Dispatch<SetStateAction<string | undefined>>
  setPhone: Dispatch<SetStateAction<number | undefined>>
  setCity: Dispatch<SetStateAction<string | undefined>>
  setDistrict: Dispatch<SetStateAction<string| undefined>>
  setWard: Dispatch<SetStateAction<string | undefined>>
  setLabel: Dispatch<SetStateAction<string | undefined>>
  setNote: Dispatch<SetStateAction<string | undefined>>

  onSubmit: () => void
  onBack: () => void
  formRef: React.RefObject<HTMLFormElement>
  invalid: boolean
  error?: string
}
