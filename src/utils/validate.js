export default (error) => {
  const errors = {};

  if (error) {
    const { code } = error;

    if (code === 'auth/invalid-email') {
      errors.email = 'Enter correct email';
    }

    if (code === 'auth/wrong-password') {
      errors.password = 'Enter correct password';
    }

    if (code === 'auth/user-not-found') {
      errors.general = 'User not found';
    }

    if (code === 'auth/too-many-requests') {
      errors.general =
        'Too many unsuccessful login attempts. Please try again later.';
    }

    if (code === 'auth/weak-password') {
      errors.password = 'The password must be 6 characters long or more';
    }
  }

  return errors;
};
