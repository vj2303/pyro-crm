// Types for call logs
export interface CallLog {
  id: string;
  phoneNumber: string;
  employeId: string;
  callTime: string;
  duration: number;
  status: 'ENGAGED' | 'NOT_ANSWERED' | 'BUSY' | 'FAILED';
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

export interface CallLogsResponse {
  callLogs: CallLog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface CallStatsResponse {
  totalCalls: number;
  totalDuration: number;
  statusBreakdown: Record<string, number>;
}

// API service for call logs
export class CallLogsService {
  private static readonly BASE_URL = 'https://backend.phyo.ai/api';

  static async getCallLogs(page: number = 1, limit: number = 10): Promise<CallLogsResponse> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`${this.BASE_URL}/call-logs?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CallLogsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching call logs:', error);
      throw error;
    }
  }

  static async getCallStats(): Promise<CallStatsResponse> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await fetch(`${this.BASE_URL}/call-logs/stats/summary`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CallStatsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching call stats:', error);
      throw error;
    }
  }

  // Helper method to format call duration
  static formatDuration(seconds: number): string {
    if (seconds === 0) return '0s';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  }

  // Helper method to format phone number
  static formatPhoneNumber(phoneNumber: string): string {
    // Remove country code if present and format
    const cleaned = phoneNumber.replace(/^\+?91/, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phoneNumber;
  }

  // Helper method to get status color
  static getStatusColor(status: CallLog['status']): string {
    switch (status) {
      case 'ENGAGED':
        return 'text-green-400';
      case 'NOT_ANSWERED':
        return 'text-yellow-400';
      case 'BUSY':
        return 'text-orange-400';
      case 'FAILED':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  }
}
