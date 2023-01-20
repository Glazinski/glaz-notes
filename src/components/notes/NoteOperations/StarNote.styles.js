import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: 10,
    right: 7,
    transition: 'opacity .3s ease',
    [theme.breakpoints.down('sm')]: {
      top: 15,
      right: 10,
    },
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));
