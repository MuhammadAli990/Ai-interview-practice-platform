import React from 'react'
import AddInterview from './_components/AddInterview'
import PreviousInterviews from './_components/PreviousInterviews'

function DashboardPage() {
  return (
    <div className='container flex flex-col py-6'>
      <h2 className='font-extrabold text-3xl text-primary sm:text-left text-center'>Dashboard</h2>
      <p className='text-lg tracking-tight text-gray-600 font-semibold sm:text-left text-center'>Create and start your AI interview</p>
      <AddInterview/>
      <PreviousInterviews/>
    </div>
  )
}

export default DashboardPage
