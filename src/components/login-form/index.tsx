import { Box, Stack } from '@mui/material'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { useCallback, useContext, useState } from 'react'
import MainContext from '@/contexts/main-context'

export default function Component() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    onSignIn,
  } = useContext(MainContext)

  const [isLogging, setIsLogging] = useState(false)

  const onLogin = useCallback(async () => {
    setIsLogging(true)
    await onSignIn(email, password, () => {
      setIsLogging(false)
      navigate('/')
    })
  }, [email, navigate, password, onSignIn])

  return (
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
        <Stack className="flex-row w-full space-x-4">
          {isLogging ? (
            <Button color="gray" className="w-full">
              <Spinner aria-label="Alternate spinner button example" size="sm" />
            </Button>
          ) : (
            <Button gradientDuoTone="purpleToBlue" className="w-full" type="button" onClick={onLogin} >Đăng nhập</Button>
          )}
          <Button gradientDuoTone="cyanToBlue" className="w-full" type="button" onClick={ () => navigate('/') }>Trang chủ</Button>
        </Stack>
      </form>
    </Box>
  )
}
