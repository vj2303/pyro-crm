'use client';

export default function ActivityPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Activity Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Calls</h2>
          <p className="text-gray-300">Manage your call activities</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Emails</h2>
          <p className="text-gray-300">Track email communications</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Meetings</h2>
          <p className="text-gray-300">Schedule and manage meetings</p>
        </div>
      </div>
    </div>
  );
}
