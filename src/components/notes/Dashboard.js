import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import SignIn from '../auth/SignIn';

const Dashboard = ({ auth, signOut }) => {
  if (!auth.uid) return <SignIn />;

  return (
    <>
      <div>Elo</div>
      <button type="button" onClick={signOut}>JAZDA</button>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, { signOut })(Dashboard);
