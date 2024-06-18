import { Box, Stack } from '@mui/material'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { useCallback, useContext, useState } from 'react'
import MainContext from '@/contexts/main-context'

export default function Component({ isGotoHome = true } : { isGotoHome?: boolean }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    onSignIn,
  } = useContext(MainContext)

  const [isLogging, setIsLogging] = useState(false)
  const [error, setError] = useState('')

  const onLogin = useCallback(async () => {
    setIsLogging(true)
    setError('')
    await onSignIn(email, password, (result: boolean) => {
      setIsLogging(false)
      if (result) {
        navigate('/')
      } else {
        setError('Sai email hoặc mật khẩu')
      }
    })
  }, [email, navigate, password, onSignIn])

  return (
    <Box className="p-2">
      {/* {customerLogged && customerLogged.email} */}
      <form className="flex flex-col gap-4">
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
        { error && <div className="text-red-500">{error}</div> }
        <Stack className="flex-row w-full space-x-4">
          {isLogging ? (
            <Button color="gray" className="w-full">
              <Spinner aria-label="Alternate spinner button example" size="sm" />
            </Button>
          ) : (
            <Button gradientMonochrome="failure" className="w-full" type="button" onClick={onLogin} >Đăng nhập</Button>
          )}
          { isGotoHome && (<Button color="light" className="w-full" type="button" onClick={ () => navigate('/') }>Trang chủ</Button>) }
          { !isGotoHome && (<Button color="light" className="w-full" type="button" onClick={ () => navigate('/register') }>Đăng ký</Button>) }
        </Stack>
      </form>
    </Box>
  )
}
