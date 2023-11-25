import React from 'react'

const Loader = ({isLoading}) => {
  return (
    <div className='flex items-center justify-center w-full h-96'>
      <div className=' w-12 h-12 border-[10px] border-emerald-600 rounded-3xl animate-spin border-dotted'></div>
    </div>
  )
}

export default Loader