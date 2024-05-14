import { useNavigate } from 'react-router-dom'
import View from './view'
import { useCallback, useMemo } from 'react'
import useCustomer from '@/hooks/use-customer'

const LandingPageContainer = () => {
  const navigate = useNavigate()
  const {
    userInfo,
    signOut,
    refetchUserInfo,
  } = useCustomer()

  const onSignIn = useCallback(() => {
    navigate('/sign_in')
  }, [navigate])

  const onSignUp = useCallback(() => {
    navigate('/sign_up')
  }, [navigate])

  const onSignOut = useCallback(() => {
    signOut()
    refetchUserInfo()
  }, [refetchUserInfo, signOut])

  const userName = useMemo(() => {
    return `${userInfo?.attributes?.first_name} ${userInfo?.attributes?.last_name}`
  }, [userInfo])

  const computedProps = {
    onSignIn,
    onSignUp,
    onSignOut,
    user: userInfo,
    userName,
  }

  return <View {...computedProps} />
}

export default LandingPageContainer
