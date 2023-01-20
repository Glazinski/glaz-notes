import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  list: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: 225,
    minHeight: 50,
    zIndex: 99999,
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));
