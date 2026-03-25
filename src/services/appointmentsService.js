import { apiClient, unwrapResponse } from './api';

const serviceTypes = [
  'Lavagem simples',
  'Lavagem completa',
  'Higienizacao interna',
  'Polimento tecnico',
  'Enceramento',
];

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
  const response = await apiClient.get('/agendamentos');
  return unwrapResponse(response).map(normalizeAppointment);
}

export async function createAgendamento(payload) {
  const response = await apiClient.post('/agendamentos', payload);
  return normalizeAppointment(unwrapResponse(response));
}
