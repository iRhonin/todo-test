import React, { useState, useContext } from 'react'
import Input from '@material-ui/core/Input'
import { Button } from '@material-ui/core'

import { loginApi } from '../api'
import { login, AuthContext } from '../auth'
import useStyles from '../style'

const Login = () => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  const context = useContext(AuthContext)

  function handleLogin() {
    loginApi({ username, password })
      .then(async (res) => {
        await login(res.data.auth_token)
        context.setAuthenticated(true)
      })
      .catch((e) => {
        if (e.response) {
          let errors = []
          for (const [k, v] of Object.entries(e.response.data)) {
            v.map((e) => {
              e = e.replaceAll('This field', k)
              errors.push(e)
            })
          }
          setError(errors)
        }
      })
  }

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Input
        placeholder='Username'
        name='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder='Password'
        name='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant='contained' color='primary' onClick={handleLogin}>
        Login
      </Button>
      {error.map((e) => (
        <li> {e} </li>
      ))}
    </form>
  )
}

export default Login
