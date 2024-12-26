import React from 'react'
import SaveForm from '@/components/SaveForm'
import Hierarchy from '@/components/Hierarchy'
import SelectMenu from './_components/SelectMenu'
import ExpandCollapse from './_components/ExpandCollapse'

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