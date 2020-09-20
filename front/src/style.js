import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'flex',
      'text-align-last': 'center',
      width: '80%',
      margin: '60px auto',
    },
  },
}))
