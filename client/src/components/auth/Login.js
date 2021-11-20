import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { loginUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (error === 'Invalid Password' || error === 'Invalid E-mail') {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, props.history, isAuthenticated]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      loginUser({ email, password });
    }
  };

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <div className='form-container'>
      <form onSubmit={onSubmit}>
        <h1 className='text-center'>
          Account <span className='text-primary'> Login</span>
        </h1>
        <div className='form-group'>
          <label htmlFor='email'> Email Adress </label>
          <input
            type='email'
            value={email}
            name='email'
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'> Password </label>
          <input
            type='password'
            value={password}
            name='password'
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-block btn-primary'
        />
      </form>
    </div>
  );
};

export default Login;
