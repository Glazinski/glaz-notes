import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import validate from '../../utils/validate';

// Redux
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';

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
import CircularProgress from '@material-ui/core/CircularProgress';

// MUI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  root: {
    flexGrow: 1,
    minHeight: '80vh',
    textAlign: 'center',
  },
  avatarIcon: {
    fontSize: 100,
  },
  paper: {
    padding: theme.spacing(4),
    width: '450px',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.background.default,
      border: 'none',
    },
  },
  bottomContainer: {
    marginTop: '20px',
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signUp(formData);
  };

  const { auth: { loading, authErrors } } = props;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const err = validate(authErrors);
    setErrors({ ...err });
  }, [authErrors]);

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Paper className={classes.paper} variant="outlined">
        <Grid container justify="center" spacing={2}>
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
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Sign up
                {loading && (
                  <CircularProgress color="primary" size={24} className={classes.buttonProgress} />
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

SignUp.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  signUp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signUp })(SignUp);
