import React from 'react'
import SaveForm from '@/components/SaveForm'
import Hierarchy from '@/components/Hierarchy'
import SelectMenu from './components/SelectMenu'
import ExpandCollapse from './components/ExpandCollapse'

function Menus() {
  return (
    <div>
      <SelectMenu />
      <ExpandCollapse />
      <Hierarchy />
      <SaveForm />
    </div>
  )
}

export default Menus