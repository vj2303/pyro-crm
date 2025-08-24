'use client'
import { useState } from 'react';
import Image from 'next/image';

export default function SearchLeads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Auto');
  const [showResults, setShowResults] = useState(false);

  // Sample lead data
  const sampleLeads = [
    {
      id: 1,
      name: 'Gaurav Tamra Ayurvedic',
      phone: '+91 2393378438',
      status: 'Customer',
      timestamp: '1:53 PM Mon, 4 Nov 2025',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Gaurav Tamra Ayurvedic',
      phone: '+91 2393378438',
      status: 'Customer',
      timestamp: '1:53 PM Mon, 4 Nov 2025',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Gaurav Tamra Ayurvedic',
      phone: '+91 2393378438',
      status: 'Customer',
      timestamp: '1:53 PM Mon, 4 Nov 2025',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const filters = ['Auto', 'Phone', 'Text', 'Phone', 'Email'];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 0);
  };

  const filteredLeads = sampleLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery) ||
    lead.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen  p-4">
      <div className="">
        {/* Search Bar */}
        <div className=" rounded-lg p-6 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for a lead's name, phone or other details"
              className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3 mt-4">
            {filters.map((filter, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeFilter === filter
                    ? 'bg-white text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {showResults && (
          <div className="space-y-4">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <div key={lead.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-white text-lg font-medium">{lead.name}</h3>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </button>
                      </div>

                      <div className="mb-3">
                        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {lead.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span>Status: <span className="text-white">{lead.status}</span></span>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{lead.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <Image
                        src={lead.avatar}
                        alt={lead.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">No leads found</h3>
                <p className="text-gray-400">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        )}

        {/* Empty state when no search */}
        {!showResults && (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-medium mb-2">Search for leads</h3>
            <p className="text-gray-400">Enter a name, phone number, or other details to find leads</p>
          </div>
        )}
      </div>
    </div>
  );
}