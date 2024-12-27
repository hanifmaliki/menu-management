"use client"

import { getMenus } from '@/services/api';
import { useEffect, useState } from 'react';
import CreateForm from './components/CreateForm';
import ExpandCollapse from './components/ExpandCollapse';
import Hierarchy from './components/Hierarchy';
import SaveForm from './components/SaveForm';
import SelectMenu from './components/SelectMenu';

function Menus() {
  const [menus, setMenus] = useState<any[]>([]);
  const [rootMenus, setRootMenus] = useState<any[]>([]);
  const [selectedMenuID, setSelectedMenuID] = useState('')
  const [formMode, setFormMode] = useState('update')
  const [formItem, setFormItem] = useState(null)

  useEffect(() => {
    const fetchMenus = async () => {
      const data: any[] = await getMenus();
      setMenus(data);
      let rootMenuTemp = data.filter(menu => menu.depth === 0)
      setRootMenus(rootMenuTemp)
      if (rootMenuTemp.length > 0) {
        setSelectedMenuID(data[0].id)
        setFormItem(data[0])
      }
    };
    fetchMenus();
  }, []);

  return (
    <div>
      <SelectMenu
        menus={rootMenus}
        selectedMenuID={selectedMenuID}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMenuID(e.target.value)}
      />
      <ExpandCollapse />
      <Hierarchy menus={menus.filter(menu => menu.depth !== 0 || menu.id === selectedMenuID)} selectItem={(mode, item) => {
        setFormMode(mode)
        setFormItem(menus.find(menu => menu.id === item.id))
      }} />
      {
        formMode == 'update' ?
          <SaveForm item={formItem} onSubmit={(a: any) => { console.log(a) }} />
          :
          <CreateForm item={formItem} onSubmit={(a: any) => { console.log(a) }} />
      }
    </div>
  )
}

export default Menus