import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import categoryReducer from './Categories/categoriesSlice';
import productReducer from './Products/productSlice';
const reducer = combineReducers({
    auth : authReducer,
    category : categoryReducer,
    product : productReducer
});

export default reducer;