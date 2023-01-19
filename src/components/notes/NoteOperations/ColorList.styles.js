import { makeStyles } from '@material-ui/core/styles';

const listHeight = 100;

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 150,
    height: listHeight,
    position: 'absolute',
    top: -listHeight,
    left: 0,
    zIndex: 1400,
    padding: '5px',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridRowGap: '5px',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25px',
    height: '25px',
    borderRadius: '100px',
    border: 'none',
    margin: 'auto',
    '&:hover': {
      border: `2px solid ${theme.palette.text.primary}`,
      cursor: 'pointer',
    },
    outline: 'none',
    '&:first-child': {
      border: `1px solid ${theme.palette.text.primary}`,
    },
  },
  icon: {
    color: theme.palette.text.primary,
  },
}));
