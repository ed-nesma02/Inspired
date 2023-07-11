import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CATEGORIES_URL, GOODS_URL } from "../const";

export const fetchProduct = createAsyncThunk(
    "product/fetchProduct",
    async (id)=>{
        const reponse = await fetch(`${GOODS_URL}/${id}`);
        return await reponse.json();
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState:{
        status:'idle',
        error: null,
        product: {},
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchProduct.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action)=>{
                state.status = 'success';
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action)=>{
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default productSlice.reducer;