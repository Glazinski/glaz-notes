import { createMuiTheme } from '@material-ui/core/styles';

const spreadThis = {
  customError: {
    color: 'red',
    marginTop: 20,
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
