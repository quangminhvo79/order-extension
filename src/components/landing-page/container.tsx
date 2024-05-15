import { useContext } from 'react'
import MainContext from '@/contexts/main-context'
import View from './view'

const LandingPageContainer = () => {
  const {
    isLogged,
    userName,
    onSignOut,
  } = useContext(MainContext)

  const computedProps = {
    isLogged,
    userName,
    onSignOut,
  }

  return <View {...computedProps} />
}

export default LandingPageContainer
