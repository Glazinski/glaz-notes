import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1200,
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
  test: {
    position: 'absolute',
    top: '-15px',
    left: 0,
  },
}));
