import { configureStore, ThunkAction, Action, getDefaultMiddleware, Middleware } from '@reduxjs/toolkit';
import { fetchProducts, deleteProductById } from '../ProductCrud/productAPI';
import counterReducer from '../Counter/counterSlice';
import letterCountReducer from '../Letters/letterCountSlice';
import productsReducer from '../ProductCrud/productsSlice';
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import { AuthActionTypes } from './authTypes';
import authReducer from '../types/authReducer';

// const middleware: readonly (ThunkMiddleware<RootState, AppDispatch> | Middleware<{}, RootState>)[] = [
//   ...getDefaultMiddleware(),
//   thunk.withExtraArgument({ fetchProducts, deleteProductById }),
// ] as const;

const store = configureStore({
  reducer: {
    counter: counterReducer,
    letterCount: letterCountReducer,
    products: productsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;




// import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import thunk from 'redux-thunk';
// import authReducer from '../types/authReducer';
// // import { AuthActionTypes } from './authTypes';

// // Combine reducers
// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// // Define root state type
// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;

// // Configure Redux DevTools extension
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // Create store
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// export default store;
