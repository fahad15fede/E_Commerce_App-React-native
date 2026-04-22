import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'cached_products';

// Async thunk — loads from cache first, falls back to API
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    try {
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) return JSON.parse(cached);
    } catch (_) {}

    const response = await axios.get('https://fakestoreapi.com/products');
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
    return response.data;
});

type IProductProps = {
    category: string;
    products: any[];
    loading: boolean;
    error: string | null;
};

const initialState: IProductProps = {
    category: '',
    products: [],
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.category = '';
        },
        category(state, action) {
            state.category = action.payload.category;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const reducer = slice.reducer;

export const changeCategory = (category: any) => (dispatch) => {
    dispatch(slice.actions.category({ category }));
};

export const { reset } = slice.actions;
