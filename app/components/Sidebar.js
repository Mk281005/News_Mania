import React from 'react'
function Sidebar() {
  return (
    <div className='bg-green-400 h-9 flex  items-center gap-8 p-4 justify-between'>
      <div className='font-bold text-xl font-sans '>NearMe</div>
      <div className='flex justify-evenly gap-16 mr-16'>
      <img className='w-6 ' src="home.png" alt="" />
      <img className='w-6 ' src="heart.png" alt="" /></div>
    </div>
  )
}

export default Sidebar