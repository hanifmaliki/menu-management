import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MenuForm from '../../../components/MenuForm';
import { getMenuById } from '../../../services/api';

const MenuDetail: React.FC = () => {
  const [menu, setMenu] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchMenu = async () => {
        const data = await getMenuById(id as string);
        setMenu(data);
      };
      fetchMenu();
    }
  }, [id]);

  if (!menu) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Menu</h1>
      <MenuForm menu={menu} />
    </div>
  );
};

export default MenuDetail;