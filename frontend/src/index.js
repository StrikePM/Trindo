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
import transactionReducer, { transactionFetch } from "./slices/sliceTransaction";
import usersReducer, { usersFetch } from "./slices/sliceUsers";
import cartReducer, { getTotals } from "./slices/sliceCart";
import AuthReducer from "./slices/sliceAuth";
import criteriaReducer, { criteriaFetch } from "./slices/sliceCriteria";
import miatkWrenchReducer, { miatkWrenchFetch } from './slices/sliceMiatk';
import rankWrenchReducer, { rankWrenchFetch } from './slices/sliceRankWrench';
import rankHammerReducer, { rankHammerFetch } from './slices/sliceRankHammer';
import rankDrillReducer, { rankDrillFetch } from './slices/sliceRankDrill';
import rankGrinderReducer, { rankGrinderFetch } from './slices/sliceRankGrinder';

axios.defaults.withCredentials = true;

const store = configureStore({
  reducer: {
    session: AuthReducer,
    products: productsReducer,
    categories: categoriesReducer,
    brand: brandReducer,
    resupply: resupplyReducer,
    transaction: transactionReducer,
    users: usersReducer,
    cart: cartReducer,
    criteria: criteriaReducer,
    miatkWrench: miatkWrenchReducer,
    rankWrench: rankWrenchReducer,
    rankHammer: rankHammerReducer,
    rankDrill: rankDrillReducer,
    rankGrinder: rankGrinderReducer
  },
});

store.dispatch(productsFetch());
store.dispatch(categoriesFetch());  
store.dispatch(brandFetch());  
store.dispatch(resupplyFetch());  
store.dispatch(transactionFetch());  
store.dispatch(usersFetch());
store.dispatch(getTotals());
store.dispatch(criteriaFetch());
store.dispatch(miatkWrenchFetch());
store.dispatch(rankWrenchFetch());
store.dispatch(rankHammerFetch());
store.dispatch(rankDrillFetch());
store.dispatch(rankGrinderFetch());

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
