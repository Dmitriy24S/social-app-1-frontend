import { Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'

const AdvertWidget = () => {
  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main
  const medium = palette.neutral.medium

  return (
    <WidgetWrapper>
      {/* AdvertWidget */}
      <FlexBetween>
        <Typography color={dark} variant='h5' fontWeight='500'>
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        // src={`http://localhost:3001/assets/info4.jpeg`}
        src={`${process.env.REACT_APP_API_URL}/assets/info4.jpeg`}
        alt='advert'
        width='100%'
        height='auto'
        style={{ borderRadius: '0.75rem', margin: '0.5rem 0' }}
      />
      <FlexBetween gap='0.3rem'>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m='0.5rem 0'>
        Your pathway to stunning and immaculate beauty and made sure your skin is
        exfoliating and shining like light.
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget
