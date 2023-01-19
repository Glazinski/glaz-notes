import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    padding: '10px',
    overflowWrap: 'anywhere',
    transition: 'background-color .3s ease',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      padding: '0',
    },
  },
  dialog: {
    marginBottom: '200px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      minHeight: '100vh',
    },
  },
}));
