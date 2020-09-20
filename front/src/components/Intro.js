import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Intro = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Link to='/register'>
          <Button variant='contained' color='primary'>
            Register
          </Button>
        </Link>
        <Link to='/login'>
          <Button variant='contained' color='primary'>
            Login
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Intro
