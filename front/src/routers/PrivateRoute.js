import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthConsumer>
        {(value) => (
          <Fragment>
            {value.authenticated || <Redirect to='/login' />}
            <Component {...matchProps} />
          </Fragment>
        )}
      </AuthConsumer>
    )}
  />
)

export default PrivateRoute
