import React from 'react'
import ActivityPerformance from './ActivityPerformance/page'
import FollowUps from './FollowUps/page'
import CallingCampaigns from './CallingCampaigns/page'
import LeadByStages from './LeadByStages/page'
import Filters from './Filters/page'
import Assigned from './Assigned/page'

const page = () => {
  return (
    <div className='w-full '>
        <h1 className='text-3xl font-bold text-gray-800 mb-6 text-[#fff]'>Dashboard</h1>
        
        {/* First Row - 3 components */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
          <ActivityPerformance />
          <FollowUps />
      
        </div>
        
        {/* Second Row - 2 components */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
          <CallingCampaigns />
          <LeadByStages />
        </div>
        
        {/* Third Row - 2 components */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <Filters />
          <Assigned />
        </div>

    </div>
  )
}

export default page
