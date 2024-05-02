import { createSlice } from '@reduxjs/toolkit';
import {  fetchProducts } from '../actions/productAction';

const initialState = {
    products: [],
    cartItems: [],
    status: 'idle',
    error: null,
  };
  

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      addtoCart(state, action) {
        state.cartItems.push(action.payload);
      },
      removeFromCart(state, action) {
        const index = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id);
        if (index !== -1) {
          state.cartItems.splice(index, 1);
        }
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
      },
});
// Export Actions
export const {addtoCart, removeFromCart } = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;
export const selectAllCartProducts = (state) => state.products.cartItems;

// Export Reducer
export default productSlice.reducer;
