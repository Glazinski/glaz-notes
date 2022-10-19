/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useStyles } from './styles';
import { useForm } from '../../hooks/useForm';
import { signIn } from '../../store/actions/authActions';

const SignIn = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { formData, errors, handleChange, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: (data) => {
      dispatch(signIn(data));
    },
  });
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={classes.root}
      >
        <Paper className={classes.paper} variant="outlined">
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <AccountCircleIcon className={classes.avatarIcon} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Sign In</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={errors.email}
                onChange={handleChange}
                name="email"
                value={formData.email}
                type="email"
                variant="outlined"
                label="Email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.password}
                helperText={errors.password}
                onChange={handleChange}
                name="password"
                value={formData.password}
                type="password"
                variant="outlined"
                label="Password"
                color="primary"
                fullWidth
              />
            </Grid>
            {errors.general && (
              <Typography className={classes.customError} variant="body2">
                {errors.general}
              </Typography>
            )}
            <Grid
              container
              className={classes.bottomContainer}
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography color="primary">
                  <MuiLink
                    to="/signup"
                    component={Link}
                    color="primary"
                    variant="body2"
                  >
                    Create an account
                  </MuiLink>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Login
                  {loading && (
                    <CircularProgress
                      color="primary"
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
};

export default SignIn;
