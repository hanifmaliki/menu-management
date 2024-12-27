"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

function Sidebar ({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEcommerceMenuOpen, setIsEcommerceMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) {
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

  const toggleEcommerceMenu = () => {
    setIsEcommerceMenuOpen(!isEcommerceMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:absolute"
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
        <div className="h-full px-3 py-4 overflow-y-auto" style={{ backgroundColor: '#0f1827' }}>
          <a href="/" className="flex items-center ps-2.5 mb-5">
            <Image src="/logo.png" alt="Logo" width={100} height={50} />
          </a>
          <button
            onClick={toggleSidebar}
            className="absolute top-0 right-0 p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <ul className="space-y-2 font-medium text-white">
            <li>
              <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
                <svg className="w-5 h-5 text-gray-300 transition duration-75 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={toggleEcommerceMenu}
                className="flex items-center w-full p-2 text-white transition duration-75 rounded-lg hover:bg-gray-700"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
                <span className="flex-1 ms-3 text-left">E-commerce</span>
                <svg className="w-3 h-3" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {isEcommerceMenuOpen && (
                <ul className="py-2 space-y-2 bg-gray-700">
                  <li>
                    <a href="#" className="flex items-center p-2 pl-11 text-white rounded-lg hover:bg-gray-600">
                      Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center p-2 pl-11 text-white rounded-lg hover:bg-gray-600">
                      Billing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center p-2 pl-11 text-white rounded-lg hover:bg-gray-600">
                      Invoice
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>

      <div className={`p-10 ${isSidebarOpen ? 'sm:ml-64' : 'sm:ml-16'}`}>
        {children}
      </div>
    </>
  );
}

export default Sidebar;