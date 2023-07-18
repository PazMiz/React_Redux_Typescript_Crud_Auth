// // App.tsx
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from './store';
// import { increment, decrement, incrementByAmount, reset } from './Counter/counterSlice';
// import './App.css'; // Import the CSS file
// import Letters from './Letters/Letters'; // Import the YourComponent
// import ProductList from './ProductCrud/ProductList';

// const App: React.FC = () => {
//   const counter = useSelector((state: RootState) => state.counter.value);
//   const dispatch = useDispatch();

//   const handleIncrement = () => {
//     dispatch(increment());
//   };

//   const handleDecrement = () => {
//     dispatch(decrement());
//   };

//   const handleIncrementByAmount = () => {
//     dispatch(incrementByAmount(5)); // Increase counter by 5
//   };

//   const handleReset = () => {
//     dispatch(reset());
//   };

//   return (
//     <div className="container">
//       <h1 className="counter">Paz Redux Counter: {counter}</h1>
//       <button className="button" onClick={handleIncrement}>Increment</button>
//       <button className="button" onClick={handleDecrement}>Decrement</button>
//       <button className="button" onClick={handleIncrementByAmount}>Increment by 5</button>
//       <button className="button" onClick={handleReset}>Reset</button>
//       <br></br>
//       <hr></hr>
//       <hr></hr>
//       <Letters/>
//       <ProductList></ProductList>
      
//     </div>
//   );
// };

// export default App;




// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { setButtonClicked } from './actions';
// import Hello from './HelloMerge/Hello';
// import Hello2 from './HelloMerge/Hello2';
// import Hello3 from './HelloMerge/Hello3';

// const App: React.FC = () => {
//   const dispatch = useDispatch();

//   const handleButtonClick = () => {
//     dispatch(setButtonClicked());
//   };

//   return (
//     <div>
//       <h1>Redux Button Effects</h1>
//       <button onClick={handleButtonClick}>Login</button>
//       <Hello />
//       {/* <Hello2 />
//       <Hello3 /> */}
//     </div>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './store';
// import { login, logout } from './actions';

// const App: React.FC = () => {
//   const dispatch = useDispatch();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
//   const usernameMessage = useSelector((state: RootState) => state.auth.usernameMessage);

//   const handleLogin = () => {
//     dispatch(login(username));
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <h1>Hello, {usernameMessage}!</h1>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <h1>Login</h1>
//           <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
//           <br />
//           <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
//           <br />
//           <button onClick={handleLogin}>Login</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;




import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { CssBaseline } from '@mui/material';
import store from './types/store';
import LoginForm from './LoginRedux/Login';
import ProductList from './ProductCrud/ProductList';
import RegistrationForm from './RegisterRedux/RegisterForm';
import LoginStatus from './LoginRedux/Loginstatus';

const theme = createTheme({
  palette: {
    primary: {
      main: red[400],
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RegistrationForm/>
        <Router>
          <LoginForm />
        </Router>
        <center><ProductList></ProductList></center>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
