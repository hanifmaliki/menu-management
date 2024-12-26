"use client"

import React, { useEffect, useState } from 'react';
import { getMenus } from '../services/api';
import Link from 'next/link';

const MenuList: React.FC = () => {
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
      <h1>Menus</h1>
      <Link href="/menus/create">
        <button>Create New Menu</button>
      </Link>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            <Link href={`/menus/${menu.id}`}>{menu.name}</Link> (Depth: {menu.depth})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;