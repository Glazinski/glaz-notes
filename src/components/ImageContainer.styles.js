import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    marginBottom: 5,
  },
  image: {
    width: '100%',
  },
  viewImage: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
  },
  delImage: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: theme.palette.background.default,
    transition: 'opacity .3s ease',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
