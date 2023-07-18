import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../types/authlogres';
import { RootState } from '../types/store';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { Button, Checkbox, Alert, AlertTitle, Typography, Box, TextField } from '@mui/material';
import jwt_decode from 'jwt-decode';
import Captcha from '../GoogleCaphta/reCAPTCHA';
import LoginStatus from '../LoginRedux/Loginstatus';

const LoginForm: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [showRefreshTokenError, setShowRefreshTokenError] = useState(false);
  const [showRefreshTokenSuccess, setShowRefreshTokenSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this line to define the isLoggedIn state

  const error = useSelector((state: RootState) => (state.auth as { error: string }).error);
  const successMessage = useSelector((state: RootState) => state.auth.successMessage);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedRememberMe = localStorage.getItem('rememberMe');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (storedRememberMe === 'true') {
      setRememberMe(true);
    }

    // Check if the user is already logged in when the component mounts
    const storedAccessToken = sessionStorage.getItem('accessToken');
    setIsLoggedIn(!!storedAccessToken);
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        username,
        password,
      });

      const { access, refresh, email } = response.data;
      console.log('Login successful:', response.data);
      console.log('Refresh Token:', refresh);

      const decodedToken = jwt_decode<{ email: string }>(access);
      const emailFromToken = decodedToken.email;

      localStorage.setItem('email', emailFromToken);
      setEmail(emailFromToken);

      sessionStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      await dispatch(login(username, password));

      setUsername('');
      setPassword('');
      setIsLoggedIn(true); // Set isLoggedIn to true after successful login
    } catch (error) {
      console.error('Login error:', (error as { response: { data: string } }).response.data);
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    try {
      // Clear the stored tokens from local storage and session storage
      localStorage.removeItem('email');
      setEmail(null);
  
      if (rememberMe) {
        localStorage.removeItem('refreshToken'); // Remove the refresh token from local storage
      } else {
        sessionStorage.removeItem('refreshToken'); // Remove the refresh token from session storage if "Remember Me" is not checked
      }
  
      sessionStorage.removeItem('accessToken'); // Remove the access token from session storage
  
      // Dispatch logout action to update authentication status
      dispatch(logout());
  
      // Show logout success message
      setLogoutSuccess(true);
  
      // Reset the message after a short delay
      setTimeout(() => {
        setLogoutSuccess(false);
      }, 3000);
  
      // Set isLoggedIn to false after successful logout
      setIsLoggedIn(false);
    } catch (error) {
      console.error('An error occurred during logout');
    }
  };
    
  const isFormValid = username !== '' && password !== '';

  const handleGetNewRefreshToken = async () => {
    try {
      if (!rememberMe) {
        setShowRefreshTokenError(true);
        setTimeout(() => {
          setShowRefreshTokenError(false);
        }, 3000);
        return;
      }

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.error('Refresh token not found.');
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/token/refresh/',
        { refresh: refreshToken }
      );

      console.log('Refresh Token Response:', response.data);

      const { access } = response.data;
      sessionStorage.setItem('accessToken', access);

      setShowRefreshTokenSuccess(true);

      setTimeout(() => {
        setShowRefreshTokenSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {logoutSuccess && (
        <Alert severity="success">
          Logout successful
        </Alert>
      )}
      {email && (
        <Box mt={2} mb={2}>
          <Typography variant="h6" color="primary">
            Welcome, {email}
          </Typography>
        </Box>
      )}
      {showRefreshTokenError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Please check "Remember Me" to get a new refresh token.
        </Alert>
      )}
      {showRefreshTokenSuccess && (
        <Alert severity="success">
          Refresh token obtained successfully!
        </Alert>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <TextField
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoggedIn} // Disable the input field if the user is logged in
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <TextField
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoggedIn} // Disable the input field if the user is logged in
          />
        </div>
        <div className="mb-3">
          <label>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>
        {/* Add the Captcha component here */}
        <div className="mb-3">
          <Captcha
            sitekey="6Ld0gConAAAAAMet4QAOCm24MC0skRR8VpihtpkL" // Replace with your actual reCAPTCHA site key
            onChange={(value) => console.log('Captcha value:', value)} // Handle the captcha value here
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color={isFormValid ? 'primary' : 'error'}
          disabled={!isFormValid || isLoggedIn} // Disable the login button if the user is logged in
        >
          Login
        </Button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <br />
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      <Button variant="contained" color="secondary" onClick={handleGetNewRefreshToken}>
        Get New Refresh Token
      </Button>
      {/* Add the LoginStatus component here */}
      <LoginStatus isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default LoginForm;
