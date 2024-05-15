import { Box, Paper, Stack, Typography } from '@mui/material'

type LandingPageViewProps = {
  isLogged: boolean
  userName?: string
  onSignOut: () => void
}

const LandingPageView = ({
  userName,
  isLogged,
}: LandingPageViewProps) => {

  return (
    <Box className="p-4">
      <Typography className="mb-5 text-2xl font-bold text-center text-orange-500">
        Dịch vụ nhập hàng Uy Tín
      </Typography>
      <Paper elevation={3} className="p-3">
        {isLogged && (
          <Stack direction="row" className="justify-between">
            <Typography className="mb-5 text-2xl font-bold text-orange-500">
              Xin chào, {userName}
            </Typography>
          </Stack>
        )}
        <img src="https://via.placeholder.com/500x200" alt="placeholder" className="w-full h-[200px] mb-5 rounded-lg" />
      </Paper>
    </Box>
  )
}

export default LandingPageView
