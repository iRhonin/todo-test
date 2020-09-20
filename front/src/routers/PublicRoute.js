import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../auth'

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthConsumer>
        {(value) => (
          <Fragment>
            {!value.authenticated || <Redirect to='/todos' />}
            <Component {...matchProps} />
          </Fragment>
        )}
      </AuthConsumer>
    )}
  />
)

export default PublicRoute
