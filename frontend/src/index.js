import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import productsReducer, { productsFetch } from "./slices/sliceProducts";
import categoriesReducer, { categoriesFetch } from "./slices/sliceCategories";
import brandReducer, { brandFetch } from "./slices/sliceBrand";
import resupplyReducer, { resupplyFetch } from "./slices/sliceResupply";
import usersReducer, { usersFetch } from "./slices/sliceUsers";
import AuthReducer from "./slices/sliceAuth";

axios.defaults.withCredentials = true;

const store = configureStore({
  reducer: {
    session: AuthReducer,
    products: productsReducer,
    categories: categoriesReducer,
    brand: brandReducer,
    resupply: resupplyReducer,
    users: usersReducer,
  },
});

store.dispatch(productsFetch());
store.dispatch(categoriesFetch());  
store.dispatch(brandFetch());  
store.dispatch(resupplyFetch());  
store.dispatch(usersFetch());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
