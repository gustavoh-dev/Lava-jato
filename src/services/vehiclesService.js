import { apiClient } from './api';

let mockVehicles = [
  { id: 1, modelo: 'Onix LT', placa: 'BRA2E19', clienteId: 1, clienteNome: 'Mariana Costa' },
  { id: 2, modelo: 'HB20 Comfort', placa: 'QWE4H67', clienteId: 2, clienteNome: 'Carlos Lima' },
];

function shouldUseMockApi() {
  return process.env.REACT_APP_USE_MOCK_API !== 'false';
}

function normalizeVehicle(vehicle) {
  return {
    id: vehicle.id,
    modelo: vehicle.modelo,
    placa: vehicle.placa,
    clienteId: vehicle.clienteId ?? vehicle.cliente?.id,
    clienteNome: vehicle.clienteNome ?? vehicle.cliente?.nome ?? 'Cliente nao informado',
  };
}

export async function getVeiculos() {
  if (shouldUseMockApi()) {
    return Promise.resolve(mockVehicles.map(normalizeVehicle));
  }

  const response = await apiClient.get('/veiculos');
  return response.data.map(normalizeVehicle);
}

export async function createVeiculo(payload, clients = []) {
  if (shouldUseMockApi()) {
    const selectedClient = clients.find((client) => String(client.id) === String(payload.clienteId));
    const newVehicle = {
      id: Date.now(),
      modelo: payload.modelo,
      placa: payload.placa.toUpperCase(),
      clienteId: Number(payload.clienteId),
      clienteNome: selectedClient?.nome || 'Cliente nao informado',
    };

    mockVehicles = [newVehicle, ...mockVehicles];
    return Promise.resolve(normalizeVehicle(newVehicle));
  }

  const response = await apiClient.post('/veiculos', payload);
  return normalizeVehicle(response.data);
}
