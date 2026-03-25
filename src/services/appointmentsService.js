import { apiClient } from './api';

const serviceTypes = [
  'Lavagem simples',
  'Lavagem completa',
  'Higienizacao interna',
  'Polimento tecnico',
  'Enceramento',
];

let mockAppointments = [
  {
    id: 1,
    clienteId: 1,
    clienteNome: 'Mariana Costa',
    veiculoId: 1,
    veiculoNome: 'Onix LT',
    placa: 'BRA2E19',
    tipoServico: 'Lavagem completa',
    data: '2026-03-25',
  },
  {
    id: 2,
    clienteId: 2,
    clienteNome: 'Carlos Lima',
    veiculoId: 2,
    veiculoNome: 'HB20 Comfort',
    placa: 'QWE4H67',
    tipoServico: 'Polimento tecnico',
    data: '2026-03-26',
  },
];

function shouldUseMockApi() {
  return process.env.REACT_APP_USE_MOCK_API !== 'false';
}

function normalizeAppointment(appointment) {
  return {
    id: appointment.id,
    clienteId: appointment.clienteId ?? appointment.cliente?.id,
    clienteNome: appointment.clienteNome ?? appointment.cliente?.nome ?? 'Cliente nao informado',
    veiculoId: appointment.veiculoId ?? appointment.veiculo?.id,
    veiculoNome: appointment.veiculoNome ?? appointment.veiculo?.modelo ?? 'Veiculo nao informado',
    placa: appointment.placa ?? appointment.veiculo?.placa ?? '-',
    tipoServico: appointment.tipoServico,
    data: appointment.data,
  };
}

export function getServiceTypes() {
  return serviceTypes;
}

export async function getAgendamentos() {
  if (shouldUseMockApi()) {
    return Promise.resolve(mockAppointments.map(normalizeAppointment));
  }

  const response = await apiClient.get('/agendamentos');
  return response.data.map(normalizeAppointment);
}

export async function createAgendamento(payload, clients = [], vehicles = []) {
  if (shouldUseMockApi()) {
    const selectedClient = clients.find((client) => String(client.id) === String(payload.clienteId));
    const selectedVehicle = vehicles.find((vehicle) => String(vehicle.id) === String(payload.veiculoId));

    const newAppointment = {
      id: Date.now(),
      clienteId: Number(payload.clienteId),
      clienteNome: selectedClient?.nome || 'Cliente nao informado',
      veiculoId: Number(payload.veiculoId),
      veiculoNome: selectedVehicle?.modelo || 'Veiculo nao informado',
      placa: selectedVehicle?.placa || '-',
      tipoServico: payload.tipoServico,
      data: payload.data,
    };

    mockAppointments = [newAppointment, ...mockAppointments];
    return Promise.resolve(normalizeAppointment(newAppointment));
  }

  const response = await apiClient.post('/agendamentos', payload);
  return normalizeAppointment(response.data);
}
