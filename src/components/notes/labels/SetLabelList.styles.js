import { makeStyles } from '@material-ui/core/styles';

const listHeight = 50;

export const useStyles = makeStyles((theme) => ({
  list: {
    width: 225,
    minHeight: listHeight,
  },
  item: {
    height: 25,
    margin: '5px 0',
  },
  iconBtn: {
    padding: '7px',
    color: theme.palette.text.primary,
  },
}));
