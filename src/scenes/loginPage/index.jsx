import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Form from './Form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

  return (
    <Box>
      {/* HEADER */}
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'
        textAlign='center'
      >
        <Typography
          fontWeight='bold'
          // fontSize='clamp(1rem,2rem,2.25rem)'
          // font clamp minimal, preferred, maximum
          fontSize='32px'
          color='primary'
        >
          Social App
        </Typography>
      </Box>
      {/* FORM */}
      {/* <h1>LoginPage</h1> */}
      <Box
        width={isNonMobileScreen ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        backgroundColor={theme.palette.background.alt}
        borderRadius='1.5rem'
      >
        <Typography fontWeight={500} variant='h5' sx={{ mb: '1.5rem' }}>
          Welcome to Social App!
        </Typography>
        {/* Formik Form */}
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
