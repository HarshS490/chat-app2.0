import React from 'react'
import { LoaderCircle } from "lucide-react"

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center '>
      <LoaderCircle className='animate-spin'></LoaderCircle>
    </div>
  )
}

export default Loading;