import { createMuiTheme } from '@material-ui/core/styles';

const spreadThis = {
  // form: {
  //   flexGrow: 1,
  //   // marginTop: '20px',
  // },
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
