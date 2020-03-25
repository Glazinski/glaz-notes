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

  if (error && error.code === 'auth/too-many-requests') {
    errors.general = 'Too many unsuccessful login attempts. Please try again later.';
  }

  if (error && error.code === 'auth/weak-password') {
    errors.password = 'The password must be 6 characters long or more';
  }

  return errors;
};
