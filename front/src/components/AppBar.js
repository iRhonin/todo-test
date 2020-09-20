import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { AuthContext, logout } from '../auth'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF',
  },
  button: {
    margin: '10px',
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  const context = useContext(AuthContext)

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          {!context.authenticated ? (
            <>
              <Typography variant='h6' className={classes.title}>
                Another Todo List Project...
              </Typography>
              <Link to='/login'>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='secondary'
                >
                  Login
                </Button>{' '}
              </Link>
              <Link className={classes.button} to='/register'>
                <Button variant='contained' color='secondary'>
                  Register
                </Button>{' '}
              </Link>{' '}
            </>
          ) : (
            <>
              <Typography variant='h6' className={classes.title}>
                Hello
              </Typography>{' '}
              <Link to='/login'>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    logout()
                    context.setAuthenticated(false)
                  }}
                >
                  Logout
                </Button>{' '}
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
