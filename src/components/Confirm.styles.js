import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 430,
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
  },
  title: {
    fontSize: '1rem',
  },
}));
