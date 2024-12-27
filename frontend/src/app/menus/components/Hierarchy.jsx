import React from 'react'

function SubMenus ({ subMenus, menus }) {
  return (
    <div className="ml-8">
      {subMenus && subMenus.map((subMenu) => {
        let foundMenu = menus.find((menu) => menu.id === subMenu.id)
        return (
          <div key={subMenu.id}>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 font-medium text-gray-900">{subMenu.name}</span>
              <button class="ml-2 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center">
                +
              </button>
            </div>
            <SubMenus subMenus={foundMenu.children} menus={menus} />
          </div>
        )
      })}
    </div>
  )
}

function Hierarchy ({ menus }) {
  return menus.map((menu) => menu.depth === 0 && (
    <div key={menu.id}>
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <span className="ml-2 font-medium text-gray-900">{menu.name}</span>
        <button class="ml-2 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center">
          +
        </button>
      </div>
      <SubMenus subMenus={menu.children} menus={menus} />
    </div>
  ))
}

export default Hierarchy