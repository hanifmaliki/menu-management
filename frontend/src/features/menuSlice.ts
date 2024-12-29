import { createMenu, deleteMenu, getMenus, updateMenu } from '@/services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  menus: [],
  rootMenus: [],
  selectedMenuID: '',
  formMode: 'update',
  formItem: null,
  status: 'idle',
  error: null,
  isFirstFetch: true,
};

// Async thunks for API calls
export const fetchMenus = createAsyncThunk('menu/fetchMenus', async () => {
  const menus = await getMenus();
  const rootMenus = menus.filter((menu: any) => menu.depth === 0);
  return { menus, rootMenus };
});

export const createMenuThunk = createAsyncThunk('menu/createMenu', async (item: any, { dispatch }) => {
  await createMenu(item);
  dispatch(fetchMenus());
});

export const updateMenuThunk = createAsyncThunk('menu/updateMenu', async (item: any, { dispatch }) => {
  await updateMenu(item.id, item);
  dispatch(fetchMenus());
});

export const deleteMenuThunk = createAsyncThunk('menu/deleteMenu', async (id: string, { dispatch }) => {
  await deleteMenu(id);
  dispatch(fetchMenus());
});

// Slice
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedMenuID(state, action) {
      state.selectedMenuID = action.payload;
    },
    setFormMode(state, action) {
      state.formMode = action.payload;
    },
    setFormItem(state, action) {
      state.formItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenus.fulfilled, (state: any, action) => {
        state.status = 'succeeded';
        state.menus = action.payload.menus;
        state.rootMenus = action.payload.rootMenus;
        
        if (state.isFirstFetch && state.rootMenus.length > 0) {
          state.selectedMenuID = state.rootMenus[0].id;
          state.isFirstFetch = false;
        }
      })
      .addCase(fetchMenus.rejected, (state: any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedMenuID, setFormMode, setFormItem } = menuSlice.actions;
export default menuSlice.reducer;