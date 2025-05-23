import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GOODS_URL} from '../const';

export const fetchGender = createAsyncThunk(
  'goods/fetchGender',
  async (gender) => {
    const url = new URL(GOODS_URL);
    url.searchParams.append('gender', gender);
    url.searchParams.append('count', 8);
    const reponse = await fetch(url);
    return await reponse.json();
  }
);

export const fetchAll = createAsyncThunk('goods/fetchAll', async (param) => {
  const url = new URL(GOODS_URL);
  for (const key in param) {
    if (Object.prototype.hasOwnProperty.call(param, key)) {
      url.searchParams.append(key, param[key]);
    }
  }
  url.searchParams.append('count', 'all');
  const reponse = await fetch(url);
  return await reponse.json();
});

export const fetchCategory = createAsyncThunk(
  'goods/fetchGoods',
  async (param) => {
    const url = new URL(GOODS_URL);
    for (const key in param) {
      if (Object.prototype.hasOwnProperty.call(param, key)) {
        url.searchParams.append(key, param[key]);
      }
    }
    const reponse = await fetch(url);
    return await reponse.json();
  }
);

const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    status: 'idle',
    goodsList: [],
    error: null,
    page: 0,
    pages: 0,
    totalCount: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGender.pending, (state) => {
        state.status = 'loading';
        state.totalCount = null;
      })
      .addCase(fetchGender.fulfilled, (state, action) => {
        state.status = 'success';
        state.goodsList = action.payload.goods;
        state.pages = 0;
        state.totalCount = null;
      })
      .addCase(fetchGender.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.totalCount = null;
      })
      .addCase(fetchCategory.pending, (state) => {
        state.status = 'loading';
        state.totalCount = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = 'success';
        state.goodsList = action.payload.goods;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.totalCount = null;
      })
      .addCase(fetchAll.pending, (state) => {
        state.status = 'loading';
        state.totalCount = null;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.status = 'success';
        state.goodsList = action.payload.goods;
        state.pages = 0;
        state.totalCount = null;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.totalCount = null;
      });
  },
});

export const {setPage} = goodsSlice.actions;
export default goodsSlice.reducer;
