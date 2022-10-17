import { createTheme } from '@material-ui/core/styles';

const spreadThis = {
  customError: {
    color: 'red',
    marginTop: 20,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
};

export default (typeOfTheme) => {
  if (typeOfTheme === 'dark') {
    return createTheme({
      palette: {
        type: 'dark',
        primary: {
          main: '#fff',
        },
        action: {
          selected: 'rgba(163, 137, 60, .5)',
        },
      },
      spreadThis,
    });
  }
  return createTheme({
    palette: {
      type: 'light',
      action: {
        selected: '#feefc3',
      },
    },
    spreadThis,
  });
};
