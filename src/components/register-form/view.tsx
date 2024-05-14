import PopupLayout from '@/layouts/popup_layout'
import { Box, Stack } from '@mui/material'
import { Button, Label, TextInput } from 'flowbite-react'
import { RegisterFormViewProps } from './types'

const RegisterFormView = ({
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
}: RegisterFormViewProps) => {
  return (
    <PopupLayout>
      <Box className="p-2">
        <form className="flex flex-col max-w-md gap-4" ref={formRef}>
          <div>
            <div className="block mb-2">
              <Label htmlFor="first_name" value="Họ" />
            </div>
            <TextInput
              id="first_name"
              type="text"
              placeholder="Nguyễn"
              required
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="last_name" value="Tên" />
            </div>
            <TextInput
              id="last_name"
              type="text"
              placeholder="Văn A"
              required
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="password" value="Mật khẩu" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Stack className="flex-row w-full space-x-4">
            <Button gradientDuoTone="purpleToBlue" className="w-full" type="button" onClick={onSubmit}>Đăng ký</Button>
            <Button gradientDuoTone="cyanToBlue" className="w-full" type="button" onClick={onBack}>Trở về</Button>
          </Stack>
        </form>
      </Box>
    </PopupLayout>
  )
}

export default RegisterFormView
