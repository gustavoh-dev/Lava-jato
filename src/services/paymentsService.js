import { apiClient, unwrapResponse } from './api';

function normalizePayment(payment) {
  return {
    id: payment.id,
    clienteNome: payment.clienteNome ?? payment.cliente?.nome ?? 'Cliente nao informado',
    veiculoNome: payment.veiculoNome ?? payment.veiculo?.modelo ?? 'Veiculo nao informado',
    servico: payment.servico ?? payment.tipoServico ?? 'Servico nao informado',
    valor: Number(payment.valor ?? 0),
    data: payment.data,
    pago: Boolean(payment.pago),
  };
}

export async function getPagamentos(date = '') {
  const response = await apiClient.get('/pagamentos', {
    params: date ? { data: date } : {},
  });

  return unwrapResponse(response).map(normalizePayment);
}

export async function marcarComoPago(paymentId) {
  await apiClient.patch(`/pagamentos/${paymentId}/pago`);
}
