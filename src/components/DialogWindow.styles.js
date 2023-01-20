import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  dialog: {
    marginBottom: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '0',
  },
}));
