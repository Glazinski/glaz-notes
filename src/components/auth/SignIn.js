import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

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
  textField: {
    marginTop: '20px',
  },
  bottomContainer: {
    marginTop: '20px',
  },
}));

const SignIn = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signIn(formData);
  };

  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Paper className={classes.paper}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <AccountCircleIcon className={classes.avatarIcon} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Sign In</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              className={classes.textField}
              name="email"
              type="email"
              variant="outlined"
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              className={classes.textField}
              name="password"
              type="password"
              variant="outlined"
              label="Password"
              color="primary"
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
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  authErrors: state.auth.authErrors,
  auth: state.firebase.auth,
});

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signIn })(SignIn);
