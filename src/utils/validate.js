export default (error) => {
  const errors = {};

  if (error && error.code === 'auth/invalid-email') {
    errors.email = 'Enter correct email';
  }

  if (error && error.code === 'auth/wrong-password') {
    errors.password = 'Enter correct password';
  }

  if (error && error.code === 'auth/user-not-found') {
    errors.general = 'User not found';
  }

  return errors;
};
