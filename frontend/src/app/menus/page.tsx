'use client';

import {
  createMenuThunk,
  deleteMenuThunk,
  fetchMenus,
  setFormItem,
  setFormMode,
  setSelectedMenuID,
  updateMenuThunk,
} from '@/features/menuSlice';
import { AppDispatch, RootState } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateForm from './components/CreateForm';
import Hierarchy from './components/Hierarchy';
import SaveForm from './components/SaveForm';
import SelectMenu from './components/SelectMenu';

function Menus() {
  const dispatch = useDispatch<AppDispatch>();
  const { menus, rootMenus, selectedMenuID, formMode, formItem } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    dispatch(fetchMenus());
  }, []);

  useEffect(() => {
    dispatch(setFormItem(rootMenus.find((menu: any) => menu.id === selectedMenuID)))
    dispatch(setFormMode('update'))
  }, [selectedMenuID])

  return (
    <div>
      <SelectMenu
        menus={rootMenus}
        selectedMenuID={selectedMenuID}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setSelectedMenuID(e.target.value))}
      />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Hierarchy Section */}
        <div className="md:w-1/2">
          <Hierarchy
            menus={menus}
            selectedMenuID={selectedMenuID}
            selectItem={(mode, item) => {
              dispatch(setFormMode(mode));
              dispatch(setFormItem(menus.find((menu: any) => menu.id === item.id)));
            }}
            deleteMenu={(id) => {
              if (confirm('Are you sure want to delete this item?')) {
                dispatch(deleteMenuThunk(id));
              }
            }}
          />
        </div>

        {/* Form Section */}
        <div className="hidden md:block md:w-1/2">
          {formMode === 'update' && (
            <SaveForm item={formItem} onSubmit={(item) => dispatch(updateMenuThunk(item))} />
          )}
          {formMode === 'create' && (
            <CreateForm item={formItem} onSubmit={(item) => dispatch(createMenuThunk(item))} />
          )}
        </div>
      </div>

      {/* Mobile Form Section */}
      <div className="block md:hidden mt-8">
        {formMode === 'update' && (
          <SaveForm item={formItem} onSubmit={(item) => dispatch(updateMenuThunk(item))} />
        )}
        {formMode === 'create' && (
          <CreateForm item={formItem} onSubmit={(item) => dispatch(createMenuThunk(item))} />
        )}
      </div>
    </div>
  );
}

export default Menus;