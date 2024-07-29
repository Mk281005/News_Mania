import React from 'react'
function Sidebar() {
  return (
    <div className='bg-slate-900-400 h-10 flex  items-center gap-8 p-4 justify-between shadow-md shadow-slate-600'>
      <div className='font-bold text-xl font-sans '><span className='text-violet-500'>N</span>earMe</div>
      <div className='flex justify-evenly gap-10 mr-6'>
      <img className='w-6 cursor-pointer' src="home.png" alt="" />
      <img className='w-6 cursor-pointer' src="heart.png" alt="" />
      <img src="search.svg"  className='w-6 h-6 cursor-pointer'alt="" /></div>
    </div>
  )
}

export default Sidebar