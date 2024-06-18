import useCustomer from "@/hooks/use-customer"
import { Box } from "@mui/material"
import { PropsWithChildren } from "react"
import LoginFrom from "@/components/login-form"

const Auth = ({ children }: PropsWithChildren) => {
  const {
    user,
  } = useCustomer()

  if (!user) return <LoginFrom isGotoHome={false} />

  return (
    <Box>
      {children}
    </Box>
  )
}

export default Auth
