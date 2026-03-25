jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  }),
}));

import { fetchDashboardSummary } from './services/dashboardService';
import { validateClientForm } from './pages/clientes/clientValidation';
import { validateVehicleForm } from './pages/veiculos/vehicleValidation';

test('provides dashboard summary data', async () => {
  const summary = await fetchDashboardSummary();

  expect(summary.highlights).toHaveLength(3);
  expect(summary.totals.clients).toBeGreaterThan(0);
});

test('validates client form fields', () => {
  const errors = validateClientForm({
    nome: '',
    telefone: '123',
    email: 'invalido',
  });

  expect(errors.nome).toBeTruthy();
  expect(errors.telefone).toBeTruthy();
  expect(errors.email).toBeTruthy();
});

test('validates vehicle form fields', () => {
  const errors = validateVehicleForm({
    modelo: '',
    placa: '123',
    clienteId: '',
  });

  expect(errors.modelo).toBeTruthy();
  expect(errors.placa).toBeTruthy();
  expect(errors.clienteId).toBeTruthy();
});
