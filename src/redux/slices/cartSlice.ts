import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ICart {
  [key: string]: any;
}

const initialState: ICart = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      state.cartItems.push(action.payload);
    },
    updateCart(state, action: PayloadAction<any>) {
      state.cartItems = action.payload;
    },
    emptyCart(state, action: PayloadAction<any>) {
      state.cartItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
