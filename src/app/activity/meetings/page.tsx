'use client';

export default function MeetingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Meetings</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-white mb-4">Meeting Management</h2>
        <p className="text-gray-300 mb-4">Schedule and manage all your meetings</p>
        
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-white font-medium">Upcoming Meetings</h3>
            <p className="text-gray-400 text-sm">No meetings scheduled</p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-white font-medium">Past Meetings</h3>
            <p className="text-gray-400 text-sm">No meeting history available</p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-white font-medium">Meeting Notes</h3>
            <p className="text-gray-400 text-sm">No meeting notes recorded</p>
          </div>
        </div>
      </div>
    </div>
  );
}
