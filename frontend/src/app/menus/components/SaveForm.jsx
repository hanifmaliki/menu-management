import { useEffect, useState } from "react"

function SaveForm ({ item, onSubmit = (item) => { } }) {
  const [submittedItem, setSubmittedItem] = useState({})

  useEffect(() => {
    setSubmittedItem({
      id: item?.id || '',
      depth: item?.depth || 0,
      parentId: item?.parentId,
      name: item?.name || '',
    })
  }, [item])

  return (
    <form className="max-w-sm" onSubmit={e => { e.preventDefault(); onSubmit(submittedItem); }}>
      <div className="mb-5">
        <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-700">Menu ID</label>
        <input
          value={item?.id || ''}
          disabled
          type="text"
          id="id"
          className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 opacity-50 cursor-not-allowed"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="depth" className="block mb-2 text-sm font-medium text-gray-700">Depth</label>
        <input
          value={item?.depth || 0}
          disabled
          type="number"
          id="depth"
          className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 opacity-50 cursor-not-allowed"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="parent" className="block mb-2 text-sm font-medium text-gray-700">Parent Data</label>
        <input
          value={item?.parent?.name || ''}
          disabled
          type="text"
          id="parent"
          className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 opacity-50 cursor-not-allowed"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
        <input
          onChange={e => setSubmittedItem(prev => ({ ...prev, name: e.target.value }))}
          value={submittedItem.name || ''}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-2/4 px-5 py-2.5 text-center"
      >
        Save
      </button>
    </form>
  )
}

export default SaveForm