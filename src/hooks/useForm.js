import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearForm } from '../store/auth/actions';
import validate from '../validators/formValidator';

export const useForm = (props) => {
  const { defaultValues, onSubmit } = props;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(defaultValues || {});
  const dispatch = useDispatch();
  const { authErrors } = useSelector((state) => state.auth);

  useEffect(() => () => dispatch(clearForm()), []);

  useEffect(() => {
    const err = validate(authErrors);
    setErrors({ ...err });
  }, [authErrors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return { formData, errors, handleSubmit, handleChange };
};
