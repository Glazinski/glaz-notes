import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    maxWidth: 238,
    backgroundColor: theme.palette.background.default,
    padding: '10px',
    margin: '10px 0',
    transition: 'background-color .3s ease, opacity .3s ease',
    '&:hover': {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      cursor: 'default',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none',
      width: '100%',
    },
  },
  title: {
    wordBreak: 'break-word',
    direction: 'rtl',
    textAlign: 'left',
    textIndent: '12%',
  },
  btn: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
  },
  content: {
    margin: '5px 0 5px 0',
    minHeight: '20px',
    overflowWrap: 'anywhere',
  },
  note: {
    justifyContent: ({ view }) =>
      view === 'list' ? 'normal' : 'space-between',
    marginRight: ({ view }) => (view === 'list' ? 'auto' : 'none'),
    '& > *': {
      margin: ({ view }) => (view === 'list' ? '0 10px' : '0'),
    },
  },
}));
