'use client'
import { useState, useEffect } from 'react';
import { API_BASE_URL, getAuthHeaders } from '@/services/api';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyWebsite: string;
  country: string;
  tags: string;
  enquiryFor: string;
  alternativeNumber: string;
  alternativeEmail: string;
  employeId: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  leads: Lead[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function SearchLeads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Form data for editing
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    companyWebsite: '',
    country: '',
    tags: '',
    enquiryFor: '',
    alternativeNumber: '',
    alternativeEmail: ''
  });

  const filters = ['All', 'Name', 'Phone', 'Email', 'Country', 'Tags'];

  // Token is read from localStorage via getAuthHeaders()

  // Fetch leads from API
  const fetchLeads = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'GET',
        headers: getAuthHeaders(true),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setLeads(data.leads);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setError('Failed to fetch leads. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update lead
  const updateLead = async (leadId: string) => {
    setIsUpdating(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(true),
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setSuccess('Lead updated successfully!');
      setIsEditModalOpen(false);
      setEditingLead(null);
      await fetchLeads(); // Refresh the leads list

    } catch (error) {
      console.error('Error updating lead:', error);
      setError(error instanceof Error ? error.message : 'Failed to update lead. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete lead
  const deleteLead = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(leadId);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(false),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setSuccess('Lead deleted successfully!');
      await fetchLeads(); // Refresh the leads list

    } catch (error) {
      console.error('Error deleting lead:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete lead. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  // Open edit modal
  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setEditFormData({
      firstName: lead.firstName,
      lastName: lead.lastName,
      phone: lead.phone,
      email: lead.email,
      companyWebsite: lead.companyWebsite,
      country: lead.country,
      tags: lead.tags,
      enquiryFor: lead.enquiryFor,
      alternativeNumber: lead.alternativeNumber,
      alternativeEmail: lead.alternativeEmail
    });
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingLead(null);
    setError('');
    setSuccess('');
  };

  // Handle form input changes
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleEditSubmit = () => {
    if (!editingLead) return;
    updateLead(editingLead.id);
  };

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // Filter leads based on search query and active filter
  const filteredLeads = leads.filter(lead => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    
    switch (activeFilter) {
      case 'Name':
        return `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(query);
      case 'Phone':
        return lead.phone.includes(query) || lead.alternativeNumber?.includes(query);
      case 'Email':
        return lead.email.toLowerCase().includes(query) || lead.alternativeEmail?.toLowerCase().includes(query);
      case 'Country':
        return lead.country.toLowerCase().includes(query);
      case 'Tags':
        return lead.tags.toLowerCase().includes(query);
      default:
        return (
          `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(query) ||
          lead.phone.includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.country.toLowerCase().includes(query) ||
          lead.tags.toLowerCase().includes(query) ||
          lead.enquiryFor.toLowerCase().includes(query)
        );
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen p-4">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl font-semibold">Search Leads</h1>
          <button 
            onClick={fetchLeads}
            className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"
          >
            Refresh
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="rounded-lg p-6 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for a lead's name, phone, email or other details"
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

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-900/50 border border-green-600 text-green-300 px-4 py-3 rounded-md">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-8 h-8 mx-auto animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-white text-lg font-medium">Loading leads...</h3>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm">
                Showing {filteredLeads.length} of {pagination.total} leads
                {searchQuery && (
                  <span> for "{searchQuery}"</span>
                )}
              </p>
            </div>

            {/* Leads Table */}
            {filteredLeads.length > 0 ? (
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Enquiry</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tags</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-750 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-white font-medium">
                              {lead.firstName} {lead.lastName}
                            </div>
                            <div className="text-gray-400 text-sm">{lead.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-white">{lead.phone}</div>
                            {lead.alternativeNumber && lead.alternativeNumber !== lead.phone && (
                              <div className="text-gray-400 text-sm">{lead.alternativeNumber}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-white">{lead.companyWebsite || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                              {lead.enquiryFor}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-white">
                            {lead.country}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                              {lead.tags}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                            {formatDate(lead.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openEditModal(lead)}
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                title="Edit lead"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => deleteLead(lead.id)}
                                disabled={isDeleting === lead.id}
                                className="text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                                title="Delete lead"
                              >
                                {isDeleting === lead.id ? (
                                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  {searchQuery ? 'No leads found' : 'No leads available'}
                </h3>
                <p className="text-gray-400">
                  {searchQuery ? 'Try adjusting your search terms or filters' : 'Start by adding some leads'}
                </p>
              </div>
            )}
          </>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && editingLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-xl font-semibold">Edit Lead</h2>
                  <button 
                    onClick={closeEditModal}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* First row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={editFormData.firstName}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={editFormData.lastName}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Second row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Third row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Company Website</label>
                      <input
                        type="url"
                        name="companyWebsite"
                        value={editFormData.companyWebsite}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={editFormData.country}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Fourth row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Tags</label>
                      <input
                        type="text"
                        name="tags"
                        value={editFormData.tags}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Enquiry For</label>
                      <select
                        name="enquiryFor"
                        value={editFormData.enquiryFor}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="consultation">Consultation</option>
                        <option value="services">Services</option>
                        <option value="partnership">Partnership</option>
                        <option value="support">Support</option>
                        <option value="loan services">Loan Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Fifth row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Alternative Number</label>
                      <input
                        type="tel"
                        name="alternativeNumber"
                        value={editFormData.alternativeNumber}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Alternative Email</label>
                      <input
                        type="email"
                        name="alternativeEmail"
                        value={editFormData.alternativeEmail}
                        onChange={handleEditInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4 pt-4 border-t border-gray-700">
                    <button
                      onClick={closeEditModal}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      disabled={isUpdating}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {isUpdating ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        'Update Lead'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}