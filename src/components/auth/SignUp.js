import React from 'react';

// React router
import { Link } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

// MUI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    flexGrow: 1,
    minHeight: '80vh',
    // textAlign: 'center',
  },
  avatarIcon: {
    fontSize: 100,
  },
  paper: {
    padding: theme.spacing(4),
    width: '750px',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.background.default,
      border: 'none',
    },
  },
  textField: {
    marginTop: '20px',
  },
  bottomContainer: {
    marginTop: '20px',
  },
}));

const SignUp = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container justify="center" alignItems="center">
      <Paper className={classes.paper}>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="h5">Sign Up</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  type="email"
                  variant="outlined"
                  label="Email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  type="password"
                  variant="outlined"
                  label="Password"
                  color="primary"
                  fullWidth
                />
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                className={classes.bottomContainer}
              >
                <Grid item>
                  <MuiLink
                    to="/login"
                    component={Link}
                    color="primary"
                    variant="body2"
                  >
                    Sign in instead
                  </MuiLink>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    Signup
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} style={{ textAlign: 'center' }}>
            <AccountCircleIcon className={classes.avatarIcon} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SignUp;
