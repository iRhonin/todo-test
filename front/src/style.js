import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex',
      'text-align-last': 'center',
      width: '80%',
      'max-width': '320px',
      margin: '60px auto',
    },
  },
}))
