import { getDashboardMetrics, getTodaySchedule } from './services/dashboardService';

test('provides dashboard seed data', () => {
  expect(getDashboardMetrics()).toHaveLength(3);
  expect(getTodaySchedule()).toHaveLength(3);
});
