import {
  type PropsWithChildren,
  createContext,
  useMemo,
  useCallback,
} from 'react'
import useCustomer from '@/hooks/use-customer'

type MainContextType = {
  user: object
  refetchUserInfo: () => void
  isLogged: boolean
  onSignOut: () => void
  userName?: string
  onSignIn: (email: string, password: string, callback?: () => void) => void
}

const initContextState: MainContextType = {
  user: {},
  refetchUserInfo: () => true,
  isLogged: false,
  userName: undefined,
  onSignOut: () => true,
  onSignIn: () => true,
}

const MainContext = createContext<MainContextType>(initContextState)

export const MainProvider = ({ children }: PropsWithChildren) => {
  const {
    user,
    signOut,
    refetchUserInfo,
    isLogged,
    signIn,
  } = useCustomer()

  const onSignOut = useCallback(() => {
    signOut()
    refetchUserInfo()
  }, [refetchUserInfo, signOut])

  const onSignIn = useCallback((email: string, password: string, callback?: () => void) => {
    signIn(email, password).then((result) => {
      if (result) {
        // alert('Đăng nhập thành công')
        callback?.()
      }
    })
  }, [refetchUserInfo, signIn])

  const userName = useMemo(() => {
    return `${user?.attributes?.first_name} ${user?.attributes?.last_name}`
  }, [user])

  const contextValue = useMemo((): MainContextType => {
    return {
      user,
      refetchUserInfo,
      isLogged,
      onSignOut,
      userName,
      onSignIn,
    }
  }, [
    isLogged,
    refetchUserInfo,
    user,
    userName,
    onSignOut,
    onSignIn,
  ])

  return (
    <MainContext.Provider value={contextValue}>
      {children}
    </MainContext.Provider>
  )
}

MainContext.displayName = 'MainContext'
export default MainContext
