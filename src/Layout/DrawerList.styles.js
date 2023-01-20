import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  item: {
    margin: '10px 0',
    borderRadius: '0 50px 50px 0',
  },
  subtitle: {
    margin: '15px 0 15px 15px',
  },
  selected: {
    backgroundColor: 'red',
  },
}));
