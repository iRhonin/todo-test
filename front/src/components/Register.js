import React, { useState, useContext } from 'react'
import { Input, Button } from '@material-ui/core'

import { registerApi, loginApi } from '../api'
import { login, AuthContext } from '../auth'
import useStyles from '../style'

const Register = (props) => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  const context = useContext(AuthContext)

  function handleSubmit() {
    registerApi({ email, username, password })
      .then((res) => {
        loginApi({ username, password }).then((res) => {
          login(res.data.auth_token)
          context.setAuthenticated(true)
        })
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
    <form className={classes.root}>
      {/* validation */}
      <Input
        placeholder='Username'
        name='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder='Email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder='Password'
        name='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Register
      </Button>
      {error.map((e) => (
        <li> {e} </li>
      ))}
    </form>
  )
}

export default Register
