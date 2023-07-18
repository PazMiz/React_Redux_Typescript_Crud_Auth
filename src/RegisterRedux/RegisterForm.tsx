import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../types/authlogres';
import { RootState } from '../types/store';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { Button } from '@mui/material';

const RegistrationForm: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Perform validation
    if (username.trim().length < 5 || password.trim().length < 5) {
      setError('Username and password must be at least 5 characters long');
      return;
    }

    try {
      // Send registration request to backend server
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        password,
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);
      setSuccess(true);
      setError('');
      setUsername('');
      setPassword('');

      // Dispatch the registration action
      await dispatch(register(username, password));
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration');
    }
  };

  const isFormValid = username.trim().length >= 5 && password.trim().length >= 5;

  return (
    <div className="container">
      <h2>Registration Form</h2>
      {success ? (
        <p className="success-message">Registration successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color={isFormValid ? 'primary' : 'error'}
            disabled={!isFormValid}
          >
            Register
          </Button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
      <br />
    </div>
  );
};

export default RegistrationForm;
