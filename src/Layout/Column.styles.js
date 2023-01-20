import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    minWidth: '256px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  title: {
    position: 'absolute',
    top: -20,
    left: 10,
  },
  list: {
    padding: '8px',
    flexGrow: 1,
  },
}));
