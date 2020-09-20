import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const backgroundImage = '/landing.png'

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    height: '900px',
  },
})

function Intro(props) {
  const { classes } = props

  return <div className={classes.background}></div>
}

export default withStyles(styles)(Intro)
