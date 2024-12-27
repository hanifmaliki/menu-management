"use client"

import SaveForm from '@/components/SaveForm';
import { getMenus } from '@/services/api';
import { useEffect, useState } from 'react';
import ExpandCollapse from './components/ExpandCollapse';
import Hierarchy from './components/Hierarchy';
import SelectMenu from './components/SelectMenu';

function Menus() {
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const data = await getMenus();
      setMenus(data);
    };
    fetchMenus();
  }, []);

  return (
    <div>
      <SelectMenu menus={menus.filter(menu => menu.depth === 0)} />
      <ExpandCollapse />
      <Hierarchy menus={menus} />
      <SaveForm />
    </div>
  )
}

export default Menus