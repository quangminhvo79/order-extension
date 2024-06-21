import { Box, Paper, Stack, Typography } from '@mui/material'
import packageData from '@/../package.json'

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
      <Paper elevation={3} className="p-3">
        {isLogged && (
          <Stack direction="row" className="justify-between">
            <Typography className="mb-5 text-2xl font-bold text-red-600">
              Xin chào {userName && <span>, {userName}</span>}
            </Typography>
          </Stack>
        )}
        <img src="/img/landing-logo.png"
          alt="placeholder"
          className="w-full h-auto my-5 rounded-lg"
        />
      </Paper>
      <div className="text-right text-red-600">Version: {packageData.version}</div>
    </Box>
  )
}

export default LandingPageView
