import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import axios from 'axios';

export interface UsersStoreState {
  allUsers: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const BASE_URL = 'https://randomuser.me/api/?results=';

export const fetchUsers = createAsyncThunk(
  'usersStore/fetchUsers',
  async (count: number) => {
    const response = await axios.get(BASE_URL + count);
    return response.data;
  },
);

const initialState: UsersStoreState = {
  allUsers: null,
  status: 'idle',
  error: null,
};

export const usersStoreSlice = createSlice({
  name: 'usersStore',
  initialState,
  reducers: {
    setUsersList: (state, action: PayloadAction<string | null>) => {
      state.allUsers = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const {setUsersList} = usersStoreSlice.actions;

export const selectUsersStore = (state: RootState) => state.usersStore;
export const getUsersStatus = (state: RootState) => state.usersStore.status;
export const getUsersError = (state: RootState) => state.usersStore.error;

export default usersStoreSlice.reducer;
