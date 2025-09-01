'use client'
import { useState } from 'react';
import { API_BASE_URL, getAuthHeaders } from '@/services/api';

export default function AddLeadsForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    tags: '',
    companyWebsite: '',
    enquiryFor: '',
    email: '',
    alternativeNumber: '',
    country: '',
    alternativeEmail: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous error/success messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Basic validation
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        setError('Please fill in all required fields (First Name, Last Name, Email, Phone)');
        setIsLoading(false);
        return;
      }

      // Build auth headers (throws if no token)
      const headers = getAuthHeaders(true);

      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Lead created successfully:', result);
      
      setSuccess('Lead created successfully!');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        tags: '',
        companyWebsite: '',
        enquiryFor: '',
        email: '',
        alternativeNumber: '',
        country: '',
        alternativeEmail: ''
      });

    } catch (error) {
      console.error('Error creating lead:', error);
      setError(error instanceof Error ? error.message : 'Failed to create lead. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-semibold">Add Leads</h1>
          <button className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
            Previously uploaded leads
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-900/50 border border-green-600 text-green-300 px-4 py-3 rounded-md">
            {success}
          </div>
        )}
        
        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          <div className="bg-[#1B1B1B] rounded-lg p-8">
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Jatin"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Prajapaty"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Phone <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+919876543210"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="#bank"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Third row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Company Website</label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                  placeholder="www.jatinprajapaty.com"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Enquiry for</label>
                <select
                  name="enquiryFor"
                  value={formData.enquiryFor}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
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

            {/* Fourth row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jatin@example.com"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Alternative Number</label>
                <input
                  type="tel"
                  name="alternativeNumber"
                  value={formData.alternativeNumber}
                  onChange={handleInputChange}
                  placeholder="+919876543211"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Fifth row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="India"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Alternative Email</label>
                <input
                  type="email"
                  name="alternativeEmail"
                  value={formData.alternativeEmail}
                  onChange={handleInputChange}
                  placeholder="alt@example.com"
                  className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Lead...
                </>
              ) : (
                'Create Lead'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}