// Centralized API helpers
export const API_BASE_URL = 'https://backend.phyo.ai/api';

export function getToken(): string | null {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  } catch {
    return null;
  }
}

export function getAuthHeaders(includeJson: boolean = true): HeadersInit {
  const token = getToken();
  if (!token) throw new Error('Authentication required. No token found');
  const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
  if (includeJson) headers['Content-Type'] = 'application/json';
  return headers;
}
