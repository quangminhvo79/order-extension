import { Dispatch, SetStateAction } from 'react'

export type RegisterFormViewProps = {
  onBack: () => void
  onSubmit: () => void
  formRef: React.RefObject<HTMLFormElement>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  firstName: string
  setFirstName: Dispatch<SetStateAction<string>>
  lastName: string
  setLastName: Dispatch<SetStateAction<string>>
  isRegistering: boolean
  isGotoHome: boolean
}
