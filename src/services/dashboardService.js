import { apiClient, unwrapResponse } from './api';

export async function fetchDashboardSummary() {
  const response = await apiClient.get('/dashboard/summary');
  return unwrapResponse(response);
}
