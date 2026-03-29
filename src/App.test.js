jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  }),
}));

import { validateAppointmentForm } from './pages/agendamentos/appointmentValidation';
import { validateClientForm } from './pages/clientes/clientValidation';
import { validateVehicleForm } from './pages/veiculos/vehicleValidation';
import App from './App';
import { render, screen } from '@testing-library/react';

test('redirects to login screen when user is not authenticated', () => {
  window.localStorage.clear();
  render(<App />);
  expect(screen.getByText(/lava jato pro/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
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

test('validates appointment form fields', () => {
  const errors = validateAppointmentForm({
    clienteId: '',
    veiculoId: '',
    tipoServico: '',
    data: '',
  });

  expect(errors.clienteId).toBeTruthy();
  expect(errors.veiculoId).toBeTruthy();
  expect(errors.tipoServico).toBeTruthy();
  expect(errors.data).toBeTruthy();
});
