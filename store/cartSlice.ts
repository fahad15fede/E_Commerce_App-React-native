/**
 * cartSlice.ts — manages bag, favorites, and active filters
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    rating?: { rate: number; count: number };
};

type BagItem = Product & { quantity: number };

type FilterState = {
    priceLow: number;
    priceHigh: number;
    colors: string[];
    sizes: string[];
    category: string;
};

type CartState = {
    bag: BagItem[];
    favorites: Product[];
    filters: FilterState;
};

const defaultFilters: FilterState = {
    priceLow: 0,
    priceHigh: 1000,
    colors: [],
    sizes: [],
    category: 'All',
};

const initialState: CartState = {
    bag: [],
    favorites: [],
    filters: defaultFilters,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToBag(state, action: PayloadAction<Product>) {
            const existing = state.bag.find(p => p.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.bag.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromBag(state, action: PayloadAction<number>) {
            state.bag = state.bag.filter(p => p.id !== action.payload);
        },
        incrementQuantity(state, action: PayloadAction<number>) {
            const item = state.bag.find(p => p.id === action.payload);
            if (item) item.quantity += 1;
        },
        decrementQuantity(state, action: PayloadAction<number>) {
            const item = state.bag.find(p => p.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    // remove if quantity hits 0
                    state.bag = state.bag.filter(p => p.id !== action.payload);
                }
            }
        },
        clearBag(state) {
            state.bag = [];
        },
        toggleFavorite(state, action: PayloadAction<Product>) {
            const index = state.favorites.findIndex(p => p.id === action.payload.id);
            if (index >= 0) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(action.payload);
            }
        },
        applyFilters(state, action: PayloadAction<FilterState>) {
            state.filters = action.payload;
        },
        resetFilters(state) {
            state.filters = defaultFilters;
        },
    },
});

export const {
    addToBag,
    removeFromBag,
    incrementQuantity,
    decrementQuantity,
    clearBag,
    toggleFavorite,
    applyFilters,
    resetFilters,
} = cartSlice.actions;

export const reducer = cartSlice.reducer;
