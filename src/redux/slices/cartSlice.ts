import shopApi from '@/apis/shopApi';
import { ICartProduct, IOrderSummary } from '@/interfaces/cart';
import { IOrder, ShippingAddress } from '@/interfaces/order';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface ICart {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

const initialState: ICart = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  taxRate: Number(process.env.NEXT_PUBLIC_TAX_RATE || 0),
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ICartProduct>) => {
      const newNumberOfItems = state.numberOfItems + action.payload.quantity;
      const newSubTotal = state.subTotal + action.payload.price * action.payload.quantity;
      const newTax = newSubTotal * state.taxRate;
      const newTotal = state.total + action.payload.price * action.payload.quantity;

      const productInCart = state.cart.some((product) => product._id === action.payload?._id);
      if (!productInCart) {
        state.cart = [...state.cart, action.payload];
        state.numberOfItems = newNumberOfItems;
        state.subTotal = newSubTotal;
        state.tax = newTax;
        state.total = newTotal;

        return;
      }

      const productInCartButDifferentSize = state.cart.some(
        (product) => product._id === action.payload?._id && product.size === action.payload?.size,
      );

      if (!productInCartButDifferentSize) {
        state.cart = [...state.cart, action.payload];
        state.numberOfItems = newNumberOfItems;
        state.subTotal = newSubTotal;
        state.tax = newTax;
        state.total = newTotal;

        return;
      }

      // Accumulate
      const updatedProducts = state.cart.map((product) => {
        if (product._id !== action.payload?._id) return product;
        if (product.size !== action.payload?.size) return product;

        // Update the quantity
        product.quantity += action.payload?.quantity;
        return product;
      });

      state.cart = updatedProducts;
      state.numberOfItems = newNumberOfItems;
      state.subTotal = newSubTotal;
      state.tax = newTax;
      state.total = newTotal;
    },
    updateCartQuantity: (state, action: PayloadAction<ICartProduct>) => {
      let newNumberOfItems = 0;
      let newSubTotal = 0;

      const newCart = state.cart.map((product) => {
        if (product._id !== action.payload._id) {
          newNumberOfItems += product.quantity;
          newSubTotal += product.price * product.quantity;
          return product;
        }
        if (product.size !== action.payload.size) {
          newNumberOfItems += product.quantity;
          newSubTotal += product.price * product.quantity;
          return product;
        }

        newNumberOfItems += action.payload.quantity;
        newSubTotal += action.payload.price * action.payload.quantity;
        return action.payload;
      });

      state.cart = newCart;
      state.numberOfItems = newNumberOfItems;
      state.subTotal = newSubTotal;
      state.tax = newSubTotal * state.taxRate;
      state.total = newSubTotal;
    },
    removeCartProduct: (state, action: PayloadAction<ICartProduct>) => {
      const newNumberOfItems = state.numberOfItems - action.payload.quantity;
      const newSubTotal = state.subTotal - action.payload.price * action.payload.quantity;
      const newTax = newSubTotal * state.taxRate;
      const newTotal = state.total - action.payload.price * action.payload.quantity;

      state.cart = state.cart.filter(
        (product) => !(product._id === action.payload._id && product.size === action.payload.size),
      );
      state.numberOfItems = newNumberOfItems;
      state.subTotal = newSubTotal;
      state.tax = newTax;
      state.total = newTotal;
    },
    updateAddress: (state, action: PayloadAction<ShippingAddress>) => {
      // state.cartItems = [];
    },
    orderComplete: (state, action: PayloadAction<ShippingAddress>) => {
      state = initialState;
    },
  },
});

// Actions

export const createOrder = createAsyncThunk('cart/createOrder', async (body: IOrder, thunkAPI) => {
  // const { getState } = thunkAPI; // <-- invoke and access state object
  // const state = getState() as RootState;
  // try {
  //   if (!state?.cart?.shippingAddress) {
  //     throw new Error('There is no delivery address');
  //   }
  //   // const { data } = await shopApi.post<IOrder>('/orders', body);
  //   // if (body) {
  //   //   const { data } = await shopApi.post<IOrder>('/orders', body);
  //   //   return data?.Procedures;
  //   // }
  // } catch (e) {
  //   const message = 'Failed to fetch Procedures for Asset';
  //   // toast.error(message);
  //   return thunkAPI.rejectWithValue(message);
  // }
});

// Action creators are generated for each case reducer function
export const { addProductToCart, updateCartQuantity, removeCartProduct, updateAddress } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
