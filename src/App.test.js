import { fetchDashboardSummary } from './services/dashboardService';

test('provides dashboard summary data', async () => {
  const summary = await fetchDashboardSummary();

  expect(summary.highlights).toHaveLength(3);
  expect(summary.totals.clients).toBeGreaterThan(0);
});
