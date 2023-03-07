import { CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from 'scenes/homePage'
import LoginPage from 'scenes/loginPage'
import ProfilePage from 'scenes/profilePage'
// import { createTheme } from '@mui/system'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  console.log('theme', theme)
  // theme {breakpoints: {…}, direction: 'ltr', components: {…}, palette: {…}, spacing: ƒ, …} // !
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* resets css for MUI */}
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to='/' />} />
            {/* ! could manualy set token in localstorage? but routes are protected? */}
            <Route
              path='/profile/:userId'
              element={isAuth ? <ProfilePage /> : <Navigate to='/' />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
