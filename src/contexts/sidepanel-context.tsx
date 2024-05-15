import {
  type PropsWithChildren,
  createContext,
  useMemo,
  useCallback,
} from 'react'
import useCustomer from '@/hooks/use-customer'
import { Bounce, toast } from 'react-toastify'

type SidePanelType = {
  user: object
  refetchUserInfo: () => void
  isLogged: boolean
  onSignOut: () => void
  userName?: string
  onSignIn: (email: string, password: string, callback?: () => void) => void
  showToastSuccess: (message: string) => void
  showToastError: (message: string) => void
}

const initContextState: SidePanelType = {
  user: {},
  refetchUserInfo: () => true,
  isLogged: false,
  userName: undefined,
  onSignOut: () => true,
  onSignIn: () => true,
  showToastSuccess: (message: string) => true,
  showToastError: (message: string) => true,
}

const SidePanel = createContext<SidePanelType>(initContextState)

export const SidePanelProvider = ({ children }: PropsWithChildren) => {
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
  }, [signIn])

  const showToastSuccess = useCallback((message: string) => {
    toast.success(message, {
      autoClose: 5000,
      theme: 'light',
      transition: Bounce,
    })
  }, [])

  const showToastError = useCallback((message: string) => {
    toast.error(message, {
      autoClose: 5000,
      theme: 'light',
      transition: Bounce,
    })
  }, [])

  const userName = useMemo(() => {
    return `${user?.attributes?.first_name} ${user?.attributes?.last_name}`
  }, [user])

  const contextValue = useMemo((): SidePanelType => {
    return {
      user,
      refetchUserInfo,
      isLogged,
      onSignOut,
      userName,
      onSignIn,
      showToastSuccess,
      showToastError,
    }
  }, [
    isLogged,
    refetchUserInfo,
    user,
    userName,
    onSignOut,
    onSignIn,
    showToastSuccess,
    showToastError,
  ])

  return (
    <SidePanel.Provider value={contextValue}>
      {children}
    </SidePanel.Provider>
  )
}

SidePanel.displayName = 'SidePanel'
export default SidePanel
