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
import { signUp } from '../../store/auth/actions';
import { useForm } from '../../hooks/useForm';

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { formData, errors, handleSubmit, handleChange } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: (data) => {
      dispatch(signUp(data));
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
              <Typography variant="h5">Sign Up</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                value={formData.firstName}
                name="firstName"
                variant="outlined"
                label="First Name"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                value={formData.lastName}
                name="lastName"
                variant="outlined"
                label="Last Name"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={errors.email}
                onChange={handleChange}
                value={formData.email}
                name="email"
                type="email"
                variant="outlined"
                label="Email"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.password}
                helperText={errors.password}
                onChange={handleChange}
                value={formData.password}
                name="password"
                type="password"
                variant="outlined"
                label="Password"
                color="primary"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid
              container
              className={classes.bottomContainer}
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography color="primary">
                  <MuiLink
                    to="/login"
                    component={Link}
                    color="primary"
                    variant="body2"
                  >
                    Sign in instead
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
                  Sign up
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
export default SignUp;
