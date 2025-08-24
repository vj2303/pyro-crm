'use client';

import { useState, useEffect } from 'react';
import { CallLogsService, CallLog, CallLogsResponse, CallStatsResponse } from '@/services/callLogsService';
import { Phone, Clock, MessageSquare, BarChart3 } from 'lucide-react';

export default function CallsPage() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<CallStatsResponse | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchCallLogs = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response: CallLogsResponse = await CallLogsService.getCallLogs(page);
      setCallLogs(response.callLogs);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch call logs');
      console.error('Error fetching call logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCallStats = async () => {
    try {
      setStatsLoading(true);
      const statsResponse = await CallLogsService.getCallStats();
      setStats(statsResponse);
    } catch (err) {
      console.error('Error fetching call stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchCallLogs();
    fetchCallStats();
  }, []);

  const handlePageChange = (page: number) => {
    fetchCallLogs(page);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Calls</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Calls</h1>
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400">Error: {error}</p>
          <button 
            onClick={() => fetchCallLogs()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Calls</h1>
        <div className="text-gray-400 text-sm">
          Total: {pagination.totalItems} calls
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center">
            <Phone className="h-8 w-8 text-blue-400 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Total Calls</p>
              <p className="text-2xl font-bold text-white">
                {statsLoading ? '...' : stats?.totalCalls || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-400 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Total Duration</p>
              <p className="text-2xl font-bold text-white">
                {statsLoading ? '...' : CallLogsService.formatDuration(stats?.totalDuration || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-purple-400 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Status Breakdown</p>
              <div className="mt-2">
                {statsLoading ? (
                  <p className="text-white">Loading...</p>
                ) : (
                  <div className="space-y-1">
                    {stats?.statusBreakdown && Object.entries(stats.statusBreakdown).map(([status, count]) => (
                      <div key={status} className="flex justify-between text-sm">
                        <span className={`${CallLogsService.getStatusColor(status as CallLog['status'])}`}>
                          {status}
                        </span>
                        <span className="text-white">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {callLogs.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <Phone className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-white font-medium mb-2">No Call Logs</h3>
          <p className="text-gray-400">No calls have been recorded yet.</p>
        </div>
      ) : (
        <>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Call Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {callLogs.map((call) => (
                    <tr key={call.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-white font-medium">
                            {CallLogsService.formatPhoneNumber(call.phoneNumber)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-300">
                            {formatDate(call.callTime)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {CallLogsService.formatDuration(call.duration)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 ${CallLogsService.getStatusColor(call.status)}`}>
                          {call.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <MessageSquare className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            {call.remarks || 'No remarks'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-gray-400 text-sm">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}