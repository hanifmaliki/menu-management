import { useEffect, useState } from "react"

function CreateForm ({ item, onSubmit = (item) => { } }) {
  const [submittedItem, setSubmittedItem] = useState({})

  useEffect(() => {
    setSubmittedItem({
      depth: item?.depth + 1 || 0,
      parentId: item?.id,
      name: '',
    })
  }, [item])

  return (
    <form className="max-w-sm mx-auto" onSubmit={e => { e.preventDefault(); onSubmit(submittedItem) }}>
      <div className="mb-5">
        <label htmlFor="depth" className="block mb-2 text-sm font-medium text-gray-900">Depth</label>
        <input value={item?.depth + 1 || 0} disabled type="number" id="depth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className="mb-5">
        <label htmlFor="parent" className="block mb-2 text-sm font-medium text-gray-900">Parent Data</label>
        <input value={item?.name || ''} disabled type="text" id="parent" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
      </div>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
        <input onChange={e => setSubmittedItem(prev => ({ ...prev, name: e.target.value }))} value={submittedItem.name} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create</button>
    </form>
  )
}

export default CreateForm