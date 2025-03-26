import Sidebar from '@/features/general/components/Sidebar'
import React from 'react'

type Props = {
  children:React.ReactNode
}

function layout({children}: Props) {
  return (
    <div>
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  )
}

export default layout