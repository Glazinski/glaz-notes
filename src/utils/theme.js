import { createMuiTheme } from '@material-ui/core/styles';

const spreadThis = {
  form: {
    flexGrow: 1,
    textAlign: 'center',
    padding: '12px',
    margin: 'auto auto',
    maxWidth: '400px',
    // height: '500px',
    marginTop: '50px',
  },
};

export default (typeOfTheme) => {
  if (typeOfTheme === 'dark') {
    return createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          main: '#fff',
        },
      },
      spreadThis,
    });
  }
  return createMuiTheme({
    palette: {
      type: 'light',
    },
    spreadThis,
  });
};
