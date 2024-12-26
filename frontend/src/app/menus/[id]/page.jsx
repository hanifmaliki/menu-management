"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, use } from 'react';
import MenuForm from '../../../components/MenuForm';
import { getMenuById } from '../../../services/api';

const MenuPage = ({ params }) => {
  const { id } = React.use(params)
  const router = useRouter();
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuById(id);
        setMenu(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };
    fetchMenu();
  }, [id]);

  const handleBack = () => {
    router.push('/menus'); // Navigate back to menus page
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      {menu && <MenuForm menu={menu} />}
    </div>
  );
};

export default MenuPage;