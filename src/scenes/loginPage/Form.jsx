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
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import FlexBetween from '../../components/FlexBetween'
import { setlogin } from '../../state'

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

const initialValuesLogin = {
  email: '',
  password: '',
}

const Form = () => {
  //   const [pageType, setPageType] = useState('login')
  const [pageType, setPageType] = useState('register')
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery('(min-width: 600px)')
  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'

  const handleFormSubmit = async (values, onSubmitProps) => {
    //
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
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
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))' // split into 4 sections minimum 0, otherwaise equal fractions of 4
            sx={{
              '& > div': {
                gridColumn: isNonMobile ? undefined : 'span 4',
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label='First Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name='firstName' // align name with initialValuesRegister
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }} // will be overwritten on mobile with parent's sx gridColumn // !
                />
                <TextField
                  label='Last Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name='lastName'
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label='Location'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name='location'
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: 'span 4' }} // take full line
                />
                <TextField
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
                  border={`1px solid ${palette.neutral.medium}`}
                  //
                  //   border={`1px solid  ${
                  //     touched.picture && errors.picture ? '#f44336' : palette.neutral.medium
                  //   }`}
                  borderRadius='5px'
                  p='1rem'
                >
                  <Dropzone
                    acceptedFiles='.jpeg,.jpg,.png'
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])} // set formik picture value manually
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p='1rem'
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
                </Box>
              </>
            )}
            {/* For both Register & Login */}
            <TextField
              label='Email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='email' // align name with initialValuesRegister
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
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
            <Typography
              onClick={() => {
                setPageType(isLogin ? 'register' : 'login')
                // TODO: const vars? enum?
                resetForm()
              }}
              sx={{
                textDecoration: 'underline',
                // color: palette.primary.main,
                color: palette.primary.light,
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
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
