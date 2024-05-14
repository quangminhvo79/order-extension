import { useCallback, useRef, useState } from 'react'
import View from './view'
import { useNavigate } from 'react-router-dom'
import useCustomer from '@/hooks/use-customer'

const RegisterFormContainer = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const navigate = useNavigate()
  const { createUser } = useCustomer()

  const onSubmit = useCallback(() => {
    if (formRef.current?.checkValidity()) {
      createUser({ email, password, firstName, lastName })
    }
  }, [createUser, email, firstName, lastName, password])

  const onBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  const computedProps = {
    onBack,
    onSubmit,
    formRef,
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
  }

  return <View {...computedProps} />
}

export default RegisterFormContainer
