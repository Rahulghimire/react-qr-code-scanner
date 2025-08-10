import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  notification: string | null;
};

const initialState: CartState = { items: [], notification: null };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existing = state.items.find((i) => i.name === action.payload.name);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
      state.notification = `${action.payload.name} added to cart`;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.name !== action.payload);
      state.notification = `${action.payload} removed from cart`;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearNotification, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
