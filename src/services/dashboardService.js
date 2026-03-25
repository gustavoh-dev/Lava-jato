import { apiClient } from './api';

const mockDashboardSummary = {
  totals: {
    clients: 246,
    vehicles: 318,
    servicesToday: 18,
  },
  highlights: [
    {
      title: 'Total de clientes',
      value: 246,
      description: 'Base ativa com clientes recorrentes e avulsos.',
      accentClass: 'dashboard-accent-primary',
    },
    {
      title: 'Total de veiculos',
      value: 318,
      description: 'Veiculos vinculados ao historico de atendimento.',
      accentClass: 'dashboard-accent-secondary',
    },
    {
      title: 'Servicos hoje',
      value: 18,
      description: 'Ordens concluidas e em andamento no dia.',
      accentClass: 'dashboard-accent-warning',
    },
  ],
};

export async function fetchDashboardSummary() {
  const useMockData = process.env.REACT_APP_USE_MOCK_API !== 'false';

  if (useMockData) {
    return Promise.resolve(mockDashboardSummary);
  }

  const response = await apiClient.get('/dashboard/summary');
  return response.data;
}
