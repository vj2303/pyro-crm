import React from 'react';
import { Phone, ChevronDown, Filter, MoreHorizontal } from 'lucide-react';

const CallingCampaigns = () => {
  const data = [
    { 
      name: 'Jatin@gmail.com', 
      totalLeads: 0, 
      assignee: 'Sam', 
      progress: 0 
    },
    { 
      name: 'Jatin@gmail.com', 
      totalLeads: 0, 
      assignee: 'Sam', 
      progress: 0 
    },
    { 
      name: 'Jatin@gmail.com', 
      totalLeads: 0, 
      assignee: 'Sam', 
      progress: 0 
    },
    { 
      name: 'Jatin@gmail.com', 
      totalLeads: 0, 
      assignee: 'Sam', 
      progress: 0 
    }
  ];

  const ProgressCircle = ({ progress }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
          {/* Background circle */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-blue-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-gray-300 font-medium">{progress}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Phone size={20} className="text-white" />
          </div>
          <h2 className="text-white text-lg font-semibold">Calling Campaigns</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-gray-800 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1 hover:bg-gray-700 transition-colors">
            <span className="text-sm">Week</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
          <Filter size={16} className="text-gray-400" />
          <MoreHorizontal size={16} className="text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 text-sm font-medium py-3">Name</th>
              <th className="text-center text-gray-400 text-sm font-medium py-3">Total Leads</th>
              <th className="text-center text-gray-400 text-sm font-medium py-3">Assignees</th>
              <th className="text-right text-gray-400 text-sm font-medium py-3">Progress</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="text-gray-300 py-3">{item.name}</td>
                <td className="text-center text-gray-300 py-3">{item.totalLeads}</td>
                <td className="text-center text-gray-300 py-3">{item.assignee}</td>
                <td className="text-right py-3">
                  <div className="flex justify-end">
                    <ProgressCircle progress={item.progress} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallingCampaigns;