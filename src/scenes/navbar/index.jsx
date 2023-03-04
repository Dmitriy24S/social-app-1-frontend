import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Menu,
  Message,
  Notifications,
  Search,
} from '@mui/icons-material'
// import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogout, setMode } from 'state'

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const alt = theme.palette.background.alt

  const fullName = `${user?.firstName} ${user?.lastName}` // undefined undefined

  return (
    // !
    <FlexBetween padding='1rem 6%' backgroundColor={alt}>
      <FlexBetween gap='1.75rem'>
        <Typography
          fontWeight='bold'
          // fontSize='clamp(1rem,2rem,2.25rem'
          fontSize='clamp(1rem,2rem,2.25rem)'
          // font clamp minimal, preferred, maximum
          color='primary'
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              // color: neutralLight,
              // color: 'red',
              cursor: 'pointer',
            },
          }}
        >
          Social Media
        </Typography>

        {/* DESKTOP SEARCH */}
        {isNonMobileScreen && (
          // <FlexBetween
          //   backgroundColor={neutralLight}
          //   borderRadius='9px'
          //   gap='3rem'
          //   padding='0.1rem 1.5rem'
          // >
          //   <Input placeholder='Search...' />
          //   <IconButton>
          //     <Search />
          //   </IconButton>
          // </FlexBetween>
          //
          <Box
            component='form'
            backgroundColor={neutralLight}
            borderRadius='9px'
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Search...'
              inputProps={{ 'aria-label': 'search' }}
            />
            {/* <IconButton type='button' sx={{ p: '10px' }} aria-label='search'> */}
            <IconButton type='button' aria-label='search'>
              {/* <Search  /> */}
              <Search sx={{ fontSize: '25px' }} />
            </IconButton>
          </Box>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreen ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <Message sx={{ fontSize: '25px' }} />
          </IconButton>
          <IconButton>
            <Notifications sx={{ fontSize: '25px' }} />
          </IconButton>
          <IconButton>
            <Help sx={{ fontSize: '25px' }} />
          </IconButton>
          <FormControl variant='standard' value='John Doe'>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem 1rem',
                '& .MuiSvgIcon-root': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        // MOBILE TOGGLE
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          height='100%'
          zIndex='10'
          maxWidth='500px'
          minWidth='300px'
          // backgroundColor={background}
          backgroundColor={alt}
        >
          {/* CLOSE ICON */}
          <Box
            display='flex'
            justifyContent='flex-end'
            // p='1rem'
            padding='1rem 6%'
          >
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween gap='1.5rem' flexDirection='column'>
            <IconButton
              onClick={() => dispatch(setMode())}
              // sx={{ fontSize: '25px' }} // ! not needed ?
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ fontSize: '25px' }} />
            </IconButton>
            <IconButton>
              <Notifications sx={{ fontSize: '25px' }} />
            </IconButton>
            <IconButton>
              <Help sx={{ fontSize: '25px' }} />
            </IconButton>
            <FormControl variant='standard' value='John Doe'>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar
