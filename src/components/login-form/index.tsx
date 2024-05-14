import PopupLayout from '@/layouts/popup_layout'
import { Box, Stack } from '@mui/material'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import useCustomer from '@/hooks/use-customer'

export default function Component() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    signIn,
  } = useCustomer()

  const onLogin = useCallback(async () => {
    const result = await signIn(email, password)
    if (result) {
      navigate('/')
    }
  }, [email, navigate, password, signIn])

  return (
    <PopupLayout>
      <Box className="p-2">
        {/* {customerLogged && customerLogged.email} */}
        <form className="flex flex-col max-w-md gap-4">
          <div>
            <div className="block mb-2">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="email@example.com"
              required
              value={email} onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="password1" value="Mật khẩu" />
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Stack className="flex-row w-full space-x-4">
            <Button gradientDuoTone="purpleToBlue" className="w-full" type="button" onClick={onLogin} >Đăng nhập</Button>
            <Button gradientDuoTone="cyanToBlue" className="w-full" type="button" onClick={ () => navigate('/') }>Quay lại</Button>
          </Stack>
        </form>
      </Box>
    </PopupLayout>
  )
}
