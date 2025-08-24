import React from 'react';
import { UserCheck, ChevronDown, Filter, MoreHorizontal, Plus } from 'lucide-react';

const Assigned = () => {
  const data = [
    { 
      name: 'Sam', 
      email: 'jatinpra...', 
      phone: '9282...', 
      company: 'Phyo', 
      designation: 'Manager' 
    }
  ];

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <UserCheck size={20} className="text-white" />
          </div>
          <h2 className="text-white text-lg font-semibold">Assigned</h2>
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
      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 text-sm font-medium py-3">Name</th>
              <th className="text-left text-gray-400 text-sm font-medium py-3">Email</th>
              <th className="text-left text-gray-400 text-sm font-medium py-3">Phone</th>
              <th className="text-left text-gray-400 text-sm font-medium py-3">Company</th>
              <th className="text-left text-gray-400 text-sm font-medium py-3">Designation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="text-gray-300 py-3">{item.name}</td>
                <td className="text-gray-300 py-3">{item.email}</td>
                <td className="text-gray-300 py-3">{item.phone}</td>
                <td className="text-gray-300 py-3">{item.company}</td>
                <td className="text-gray-300 py-3">{item.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Follow ups Button */}
      <div className="flex justify-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={16} />
          <span>Create Follow ups</span>
        </button>
      </div>
    </div>
  );
};

export default Assigned;