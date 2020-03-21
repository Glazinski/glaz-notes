import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    // render={(props) => (auth.uid ? <Redirect to="/" /> : <Component {...props} />)}
    render={(props) => (auth.uid ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

AuthRoute.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object]),
};

export default connect(mapStateToProps)(AuthRoute);
