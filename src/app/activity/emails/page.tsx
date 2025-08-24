'use client';

export default function EmailsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Emails</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Email Management</h2>
        <p className="text-gray-300 mb-4">Track and manage all your email communications</p>
        
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-white font-medium">Sent Emails</h3>
            <p className="text-gray-400 text-sm">No emails sent yet</p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-white font-medium">Email Templates</h3>
            <p className="text-gray-400 text-sm">No templates created yet</p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-white font-medium">Email Analytics</h3>
            <p className="text-gray-400 text-sm">No analytics data available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
