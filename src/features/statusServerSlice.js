import {createSlice} from '@reduxjs/toolkit';

const statusSereverSlice = createSlice({
  name: 'statusServer',
  initialState: {
    status: true,
  },
  reducers: {
    setStatusServer(state, action) {
      state.status = action.payload;
    },
  },
});

export const {setStatusServer} = statusSereverSlice.actions;
export default statusSereverSlice.reducer;
