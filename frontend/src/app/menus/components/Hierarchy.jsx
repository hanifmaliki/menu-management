import { useEffect, useState } from 'react';

function SubMenus ({ subMenus, menus, selectItem = (mode, item) => { }, expandedItems, deleteMenu }) {
  return (
    <div className="ml-8">
      {subMenus &&
        subMenus.map((subMenu) => {
          const isExpanded = expandedItems[subMenu.id];
          return (
            <div key={subMenu.id}>
              <div className="flex items-center group mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-gray-400 cursor-pointer ${isExpanded ? '' : 'transform rotate-90'
                    }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={() => expandedItems.toggle(subMenu.id)}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  onClick={() => selectItem('update', subMenu)}
                  className="ml-2 font-medium text-gray-900 cursor-pointer hover:text-blue-500"
                >
                  {subMenu.name}
                </span>
                <button
                  onClick={() => selectItem('create', subMenu)}
                  className="ml-3 w-6 h-6 bg-vivid-blue text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  +
                </button>
                <button
                  onClick={() => deleteMenu(subMenu.id)}
                  className="ml-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  −
                </button>
              </div>
              {isExpanded && (
                <SubMenus
                  subMenus={menus.find((menu) => menu.id === subMenu.id).children}
                  menus={menus}
                  selectItem={selectItem}
                  expandedItems={expandedItems}
                  deleteMenu={deleteMenu}
                />
              )}
            </div>
          );
        })}
    </div>
  );
}

function Hierarchy ({ menus, selectedMenuID, selectItem = (mode, item) => { }, deleteMenu = (id) => { } }) {
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    // Initialize expandedItems with all items expanded
    const newExpandedItems = {};
    const expandRecursively = (items) => {
      items.forEach((item) => {
        newExpandedItems[item.id] = true;
        if (item.children) expandRecursively(item.children);
      });
    };
    expandRecursively(menus);
    setExpandedItems(newExpandedItems);
  }, [menus]);

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const newExpandedItems = {};
    const expandRecursively = (items) => {
      items.forEach((item) => {
        newExpandedItems[item.id] = true;
        if (item.children) expandRecursively(item.children);
      });
    };
    expandRecursively(menus);
    setExpandedItems(newExpandedItems);
  };

  const collapseAll = () => {
    setExpandedItems({});
  };

  const expandedState = {
    ...expandedItems,
    toggle: toggleItem,
  };

  return (
    <div>
      <div className="mt-3 mb-4 flex gap-1">
        <button
          onClick={expandAll}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-3xl text-sm px-7 py-2 me-2 mb-2"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-bold rounded-3xl text-sm px-7 py-2 me-2 mb-2"
        >
          Collapse All
        </button>
      </div>
      {menus.map(
        (menu) =>
          menu.depth === 0 &&
          menu.id === selectedMenuID && (
            <div key={menu.id}>
              <div className="flex items-center group mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-gray-400 cursor-pointer ${expandedItems[menu.id] ? '' : 'transform rotate-90'
                    }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={() => toggleItem(menu.id)}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  onClick={() => selectItem('update', menu)}
                  className="ml-2 font-medium text-gray-900 cursor-pointer hover:text-blue-500"
                >
                  {menu.name}
                </span>
                <button
                  onClick={() => selectItem('create', menu)}
                  className="ml-3 w-6 h-6 bg-vivid-blue text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  +
                </button>
                <button
                  onClick={() => deleteMenu(menu.id)}
                  className="ml-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  −
                </button>
              </div>
              {expandedItems[menu.id] && (
                <SubMenus
                  subMenus={menu.children}
                  menus={menus}
                  selectItem={selectItem}
                  expandedItems={expandedState}
                  deleteMenu={deleteMenu}
                />
              )}
            </div>
          )
      )}
    </div>
  );
}

export default Hierarchy;