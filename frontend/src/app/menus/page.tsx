"use client"

import { createMenu, getMenus, updateMenu } from '@/services/api';
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

  const fetchMenus = async () => {
    const menus: any[] = await getMenus();
    setMenus(menus);

    const rootMenus = menus.filter(menu => menu.depth === 0)
    setRootMenus(rootMenus)

    return { menus, rootMenus }
  };

  useEffect(() => {
    const execute = async () => {
      try {
        const { rootMenus } = await fetchMenus();
        if (rootMenus.length > 0) {
          setSelectedMenuID(rootMenus[0].id)
          setFormItem(rootMenus[0])
        }
      } catch (err) {
        console.log(err)
        alert('Fetch data failed!')
      }
    }
    execute()
  }, []);

  const createMenuHandler = async (item: any) => {
    try {
      await createMenu(item)
      alert('Data created!')
      fetchMenus();
    } catch (err) {
      console.log(err)
      alert('Create data failed!')
    }
  }

  const updateMenuHandler = async (item: any) => {
    try {
      await updateMenu(item.id, item)
      alert('Data updated!')
      fetchMenus();
    } catch (err) {
      console.log(err)
      alert('Update data failed!')
    }
  }

  return (
    <div className="p-4">
      <SelectMenu
        menus={rootMenus}
        selectedMenuID={selectedMenuID}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMenuID(e.target.value)}
      />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Hierarchy and ExpandCollapse Section */}
        <div className="md:w-1/2">
          <ExpandCollapse />
          <Hierarchy
            menus={menus}
            selectedMenuID={selectedMenuID}
            selectItem={(mode, item) => {
              setFormMode(mode);
              setFormItem(menus.find(menu => menu.id === item.id));
            }}
          />
        </div>

        {/* Form Section - Visible on Larger Screens */}
        <div className="hidden md:block md:w-1/2">
          {formMode === 'update' && (
            <SaveForm item={formItem} onSubmit={updateMenuHandler} />
          )}
          {formMode === 'create' && (
            <CreateForm item={formItem} onSubmit={createMenuHandler} />
          )}
        </div>
      </div>

      {/* Form Section - Visible on Mobile */}
      <div className="block md:hidden mt-8">
        {formMode === 'update' && (
          <SaveForm item={formItem} onSubmit={updateMenuHandler} />
        )}
        {formMode === 'create' && (
          <CreateForm item={formItem} onSubmit={createMenuHandler} />
        )}
      </div>
    </div>
  )
}

export default Menus