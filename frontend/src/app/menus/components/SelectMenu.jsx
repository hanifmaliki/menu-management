
function SelectMenu ({ menus, selectedMenuID, onChange }) {
  return (
    <form className="max-w-sm">
      <label htmlFor="menus" className="block mb-2 text-sm font-medium text-gray-900">Menu</label>
      <select onChange={onChange} value={selectedMenuID} id="menus" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        {menus.map(menu => <option key={menu.id} value={menu.id}>{menu.name}</option>)}
      </select>
    </form>
  )
}

export default SelectMenu