import { Box, Paper, Stack, Typography } from '@mui/material'
import { Button } from 'flowbite-react'
import PopupLayout from '@/layouts/popup_layout'

type LandingPageViewProps = {
  onSignIn: () => void
  onSignUp: () => void
  onSignOut: () => void
  user?: {
    attributes: object
  }
  userName?: string
}

const LandingPageView = ({
  onSignIn,
  onSignUp,
  onSignOut,
  user,
  userName,
}: LandingPageViewProps) => {
  return (
    <PopupLayout>
      <Box className="p-4">
        <Typography className="mb-5 text-2xl font-bold text-center text-orange-500">
          Dịch vụ nhập hàng Uy Tín
        </Typography>
        <Paper elevation={3} className="p-3">
          {user && (
            <Stack direction="row" className="justify-between">
              <Typography className="mb-5 text-2xl font-bold text-orange-500">
                Xin chào, {userName}
              </Typography>
              <Typography
                className="mb-5 text-gray-500 underline cursor-pointer underline-offset-4"
                onClick={onSignOut}
              >
                Thoát
              </Typography>
            </Stack>
          )}
          <img src="https://via.placeholder.com/500x200" alt="placeholder" className="w-full h-[200px] mb-5 rounded-lg" />
          {!user && (
            <Stack className="flex-row w-full space-x-4">
              <Button className="w-full" gradientDuoTone="purpleToPink" onClick={onSignUp}>Đăng ký</Button>
              <Button className="w-full" gradientDuoTone="pinkToOrange" onClick={onSignIn}>Đăng nhập</Button>
            </Stack>
          )}
        </Paper>
      </Box>
    </PopupLayout>
  )
}

export default LandingPageView
