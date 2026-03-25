import clientesService from './clientsService';
import { getPagamentos } from './paymentsService';
import { getVeiculos } from './vehiclesService';

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function fetchDashboardSummary() {
  const today = formatLocalDate(new Date());

  const [clientes, veiculos, pagamentosHoje] = await Promise.all([
    clientesService.getClientes(),
    getVeiculos(),
    getPagamentos(today),
  ]);

  return {
    totals: {
      clients: clientes.length,
      vehicles: veiculos.length,
      servicesToday: pagamentosHoje.length,
    },
    highlights: [
      {
        title: 'Total de clientes',
        value: clientes.length,
        description: 'Clientes carregados diretamente do backend Spring Boot.',
        accentClass: 'dashboard-accent-primary',
      },
      {
        title: 'Total de veiculos',
        value: veiculos.length,
        description: 'Veiculos obtidos da API real do sistema.',
        accentClass: 'dashboard-accent-secondary',
      },
      {
        title: 'Servicos hoje',
        value: pagamentosHoje.length,
        description: 'Quantidade baseada nos pagamentos filtrados pela data atual.',
        accentClass: 'dashboard-accent-warning',
      },
    ],
  };
}
