import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const AUTH_COOKIE = 'Authorization'

const login = async (token) => {
  let authToken = `Token ${token}`
  cookies.set(AUTH_COOKIE, authToken, { path: '/' })
}

const logout = () => {
  cookies.remove(AUTH_COOKIE)
}

cookies.addChangeListener(({ name, value, op }) => {
  console.log(name, value)
  if (name === AUTH_COOKIE)
    axios.defaults.headers = {
      ...axios.defaults.headers,
      Authorization: value,
    }
})

export { login, logout }

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    cookies.get(AUTH_COOKIE) !== undefined
  )

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer
