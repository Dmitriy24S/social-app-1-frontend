import styled from '@emotion/styled'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import FlexBetween from '../../components/FlexBetween'
import { setLogin } from '../../state'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.string().required('required'),
})

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
})

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
}

// const initialValuesLogin = {
//   email: '',
//   password: '',
// }

const Form = () => {
  // const [pageType, setPageType] = useState('login')
  const [pageType, setPageType] = useState('register')
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery('(min-width: 600px)')
  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'

  const register = async (values, onSubmitProps) => {
    try {
      // because have picture image use FormData from JS API - allows to send form info with image
      const formData = new FormData()
      // cycle through values object
      for (let value in values) {
        formData.append(value, values[value])
      }
      formData.append('picturePath', values.picture.name) // manually append

      const savedUserResponse = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        body: formData,
      })
      const savedUser = await savedUserResponse.json()
      onSubmitProps.resetForm()

      if (savedUser) {
        setPageType('login')
      }
    } catch (error) {
      console.log('register error', error)
      alert('register error')
    }
  }

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const loggedIn = await loggedInResponse.json()
      onSubmitProps.resetForm()
      // console.log('login fetch, loggedIn:', loggedIn)
      // {
      //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDVhOWFlNGU0ZDU4NjViYzdkMTQ1NiIsImlhdCI6MTY3ODA5MzI4Mn0.sVM4lVXbJXMXeOoE_JnqG8fX91zoDS-Af7FHvNz8SR0",
      //     "user": {
      //         "_id": "6405a9ae4e4d5865bc7d1456",
      //         "firstName": "test1",
      //         "lastName": "test1",
      //         "email": "test1@test.com",
      //         "password": "$2b$10$vrFEF3bJgUwr4TAUWpiL.e7/yTaNwiP9/s7unr1fCBi3lqEZXVky.",
      //         "picturePath": "p3.jpeg",
      //         "friends": [],
      //         "location": "test1",
      //         "occupation": "test1",
      //         "viewedProfile": 2164,
      //         "impressions": 8147,
      //         "createdAt": "2023-03-06T08:51:58.441Z",
      //         "updatedAt": "2023-03-06T08:51:58.441Z",
      //         "__v": 0
      //     }
      // }

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user, // pass as redux payload
            token: loggedIn.token,
          })
        )
        navigate('/home')
      }
    } catch (error) {
      console.log('login error', error)
      alert('login error')
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) await register(values, onSubmitProps)
    if (isLogin) await login(values, onSubmitProps)
  }

  const formRef = useRef(null) // reset form TAB focus to beginning if switch between Login/Register State

  const CssTextField = styled(TextField)({
    // '& label.Mui-focused': {
    // color: 'green',
    // },
    // '& .MuiInput-underline:after': {
    // borderBottomColor: 'blue',
    // },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        // borderColor: 'pink',
      },
      '&:hover fieldset': {
        borderColor: '#5d5d5d',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00D5FA',
      },
      '&.Mui-error fieldset': {
        borderColor: '#f44336',
      },
    },
  })

  return (
    <Formik
      onSubmit={handleFormSubmit}
      // initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      initialValues={initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => {
        console.log('values', values)
        return (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))' // split into 4 sections minimum 0, otherwaise equal fractions of 4
              sx={{
                '& > div': {
                  gridColumn: isNonMobile ? undefined : 'span 4',
                },
                outline: 'none', // reset form TAB focus to beginning if switch between Login/Register State
              }}
              ref={formRef}
              tabIndex={-1}
            >
              {isRegister && (
                <>
                  {/* <TextField */}
                  <CssTextField
                    label='First Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name='firstName' // align name with initialValuesRegister
                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{
                      gridColumn: 'span 2',
                      // '&:hover .MuiOutlinedInput-notchedOutline:not(:focus-visible)': {
                      '&:hover:not(:focus) .MuiOutlinedInput-notchedOutline:not(:focus)':
                        {
                          // border: '1px solid transparent',
                          // borderColor: 'green',
                        },
                      '& .MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                        {
                          // borderColor: 'blue',
                        },
                      '& MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        // borderColor: 'blue',
                      },
                    }} // will be overwritten on mobile with parent's sx gridColumn // !
                    // .css-12vynk1-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline
                  />
                  <CssTextField
                    label='Last Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name='lastName'
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <CssTextField
                    label='Location'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name='location'
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: 'span 4' }} // take full line
                  />
                  <CssTextField
                    label='Occupation'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name='occupation'
                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <Box
                    gridColumn='span 4'
                    // border={`1px solid ${palette.neutral.medium}`}
                    border={`1px solid  ${
                      touched.picture && errors.picture
                        ? '#f44336'
                        : 'rgba(255, 255, 255, 0.23);'
                      // : palette.neutral.medium
                    }`}
                    borderRadius='5px'
                    p='1rem'
                    sx={{
                      '&:hover': {
                        // borderColor: '#8d8d8d',
                        borderColor: '#5d5d5d',
                      },
                    }}
                  >
                    <Dropzone
                      acceptedFiles='.jpeg,.jpg,.png'
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue('picture', acceptedFiles[0])
                      } // set formik picture value manually
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p='1rem'
                          // m='1rem'
                          sx={{
                            '&:hover': {
                              cursor: 'pointer',
                            },
                          }}
                        >
                          {/* // TODO: red error text & border on submit? helperText={touched.picture && errors.picture}
                           */}
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                    {touched.picture && errors.picture && (
                      <Typography mt='0.75rem' fontSize='0.7rem' color='#f44336'>
                        {errors.picture}
                      </Typography>
                    )}
                  </Box>
                </>
              )}
              {/* For both Register & Login */}
              <CssTextField
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email' // align name with initialValuesRegister
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <CssTextField
                label='Password'
                type='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name='password'
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                type='submit'
                fullWidth
                sx={{
                  m: '2rem 0',
                  p: '1rem',
                  // TODO: light mode colors change?
                  // backgroundColor: palette.background.default,
                  backgroundColor: palette.primary.light,
                  // color: palette.primary.main,
                  color: palette.background.alt,
                  '&:hover': {
                    // backgroundColor: palette.primary.light,
                    backgroundColor: palette.primary.main,
                    // color: palette.neutral.dark,
                    color: palette.background.alt,
                  },
                }}
              >
                {isLogin ? 'LOGIN' : 'REGISTER'}
              </Button>
              <Button
                variant='text'
                onClick={() => {
                  setPageType(isLogin ? 'register' : 'login')
                  // TODO: const vars? enum?
                  resetForm()
                  formRef.current.focus() // reset form TAB focus to beginning if switch between Login/Register State
                }}
                sx={{
                  width: 'fit-content',
                  textDecoration: 'underline',
                  // color: palette.primary.main,
                  color: palette.primary.light,
                  fontWeight: '400',
                  '&:hover': {
                    cursor: 'pointer',
                    //   color: palette.primary.light,
                    color: palette.primary.main,
                  },
                }}
              >
                {isLogin
                  ? `Don't have an account? Sign Up here.`
                  : `Already have an account? Login here.`}
              </Button>
            </Box>
          </form>
        )
      }}
    </Formik>
  )
}

export default Form
