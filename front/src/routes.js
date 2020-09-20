import React from 'react'
import { Switch } from 'react-router-dom'
import { Register, Intro, Todos, Login } from './components'
import { PrivateRoute, PublicRoute } from './routers'

export default function Routes() {
  return (
    <Switch>
      <PublicRoute exact path='/' component={Intro} />
      <PublicRoute exact path='/register' component={Register} />
      <PublicRoute exact path='/login' component={Login} />
      <PrivateRoute exact path='/todos' component={Todos} />
    </Switch>
  )
}
