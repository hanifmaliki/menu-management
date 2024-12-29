"use client";

import { Widgets } from '@mui/icons-material';
import Folder from '@mui/icons-material/Folder';
import FolderOutlined from '@mui/icons-material/FolderOutlined';
import MenuOpen from '@mui/icons-material/MenuOpen';
import WidgetsOutlined from '@mui/icons-material/WidgetsOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function Sidebar ({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSystemsMenuOpen, setIsSystemsMenuOpen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 640) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSystemsMenu = () => {
    setIsSystemsMenuOpen(!isSystemsMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-6 sm:ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:absolute"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        <div className="px-3 py-4 overflow-y-auto rounded-3xl" style={{ backgroundColor: '#0f1827', margin: '1px', height: 'calc(100% - 2px)' }}>
          <a href="/" className="flex items-center ps-2.5 mb-5">
            <Image src="/logo.png" alt="Logo" width={96} height={41} />
          </a>

          <button
            onClick={toggleSidebar}
            className="absolute top-3 right-3 p-2 text-white hover:bg-gray-700 rounded-xl"
            aria-label="Close sidebar"
          >
            <MenuOpen />
          </button>

          <ul className="space-y-2 font-medium text-gray-400">
            <li>
              <button
                type="button"
                onClick={toggleSystemsMenu}
                className="flex items-center w-full p-2 transition duration-75 rounded-lg hover:bg-lime-bright hover:text-black"
              >
                <FolderOutlined />
                <span className="flex-1 ms-3 text-left">Systems</span>
                <svg className="w-3 h-3" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {isSystemsMenuOpen && (
                <ul className="py-2 space-y-2 bg-gray-700 rounded-lg">
                  {[
                    { name: "System Code", url: "/system-code" },
                    { name: "Properties", url: "/properties" },
                    { name: "Menus", url: "/menus" },
                    { name: "API List", url: "/api-list" },
                  ].map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.url}
                        className={`flex items-center p-2 rounded-lg ${item.url === pathname ? 'text-white' : ''} hover:bg-lime-bright hover:text-black`}
                      >
                        {item.url === pathname ? <Widgets /> : <WidgetsOutlined />}
                        <span className="ms-3">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {[
              { name: "Users & Group", url: "/users-group" },
              { name: "Competition", url: "/competition" },
            ].map(item => (
              <li key={item.name}>
                <Link
                  href={item.url}
                  className={`flex items-center p-2 rounded-lg ${item.url === pathname ? 'text-white' : ''} hover:bg-lime-bright hover:text-black`}
                >
                  {item.url === pathname ? <Folder /> : <FolderOutlined />}
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className={`p-8 pt-4 sm:pt-8 sm:p-10 ${isSidebarOpen ? 'sm:ml-64' : 'sm:ml-12'}`}>
        {children}
      </div>
    </>
  );
}

export default Sidebar;