import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { amber, deepPurple } from '@material-ui/core/colors'

import './index.css'
import Routes from './routes'
import { AppBar } from './components'
import { AuthProvider } from './auth'

const theme = createMuiTheme({
  overrides: {
    Link: { 'text-decoration': null },
    button: {
      background: '#FFFFFF',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 24,
      padding: '0 30px',
      margin: '20px',
    },
  },
  palette: {
    primary: deepPurple,
    secondary: {
      main: '#CFCFC4',
      light: amber[200],
      dark: '#AF2124',
    },
    type: 'dark',
  },
  spacing: 10,
})

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <Router>
        <AppBar />
        <Routes />
      </Router>
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('app')
)
