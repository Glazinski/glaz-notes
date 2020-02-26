import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// MUI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  avatarIcon: {
    fontSize: 100,
  },
  paper: {
    padding: theme.spacing(3),
  },
  textField: {
    marginTop: '15px',
  },
  button: {
    marginTop: '15px',
  },
}));

const SignIn = () => {
  const classes = useStyles();

  return (
    <div className={`${classes.form} ${classes.root}`}>
      <Grid container>
        <Grid item sm={12}>
          <Paper className={classes.paper}>
            <Grid item>
              <AccountCircleIcon className={classes.avatarIcon} />
            </Grid>
            <Grid item>
              <TextField
                className={classes.textField}
                type="email"
                variant="outlined"
                label="Email"
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.textField}
                type="password"
                variant="outlined"
                label="Password"
                color="primary"
              />
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
