"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createMenu, updateMenu } from '../services/api';

interface MenuFormProps {
  menu?: { id?: string; name: string; depth: number; parentId?: string | null };
}

const MenuForm: React.FC<MenuFormProps> = ({ menu }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: menu || { name: '', depth: 0, parentId: null },
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (menu?.id) {
      await updateMenu(menu.id, data);
    } else {
      await createMenu(data);
    }
    alert(menu?.id ? 'Menu updated!' : 'Menu created!');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
      </div>
      <div>
        <label>Depth</label>
        <input type="number" {...register('depth')} />
      </div>
      <button type="submit">{menu?.id ? 'Update' : 'Create'} Menu</button>
    </form>
  );
};

export default MenuForm;