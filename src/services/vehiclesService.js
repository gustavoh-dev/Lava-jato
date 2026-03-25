import { apiClient, unwrapResponse } from './api';

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
  const response = await apiClient.get('/veiculos');
  return unwrapResponse(response).map(normalizeVehicle);
}

export async function createVeiculo(payload) {
  const response = await apiClient.post('/veiculos', payload);
  return normalizeVehicle(unwrapResponse(response));
}
