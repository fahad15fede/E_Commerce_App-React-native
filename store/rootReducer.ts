import { combineReducers } from "@reduxjs/toolkit";
import { reducer as productReducer } from "./productSlice";
import { reducer as cartReducer } from "./cartSlice";

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
});

export default rootReducer;
