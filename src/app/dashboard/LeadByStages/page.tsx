import React from 'react';
import { Target, ChevronDown, Filter, MoreHorizontal, Plus } from 'lucide-react';

const LeadByStages = () => {
  // Empty data as shown in the screenshot
  const data = [];

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Target size={20} className="text-white" />
          </div>
          <h2 className="text-white text-lg font-semibold">Lead by Stages</h2>
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

      {/* Table Headers */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 text-sm font-medium py-3">Name</th>
              <th className="text-center text-gray-400 text-sm font-medium py-3">Fresh</th>
              <th className="text-center text-gray-400 text-sm font-medium py-3">Active</th>
              <th className="text-right text-gray-400 text-sm font-medium py-3">won</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty state - no data rows */}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                      <Target size={24} className="text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-sm">No leads data available</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create lead Button */}
      <div className="flex justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={16} />
          <span>Create lead</span>
        </button>
      </div>
    </div>
  );
};

export default LeadByStages;