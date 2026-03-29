import { apiClient, unwrapResponse } from './api';

const SERVICES_ENDPOINT = '/servicos';

function normalizeService(service) {
  return {
    id: service.id,
    nome: service.nome,
    descricao: service.descricao,
    valor: Number(service.valor),
  };
}

export async function getServicos() {
  const response = await apiClient.get(SERVICES_ENDPOINT);
  return unwrapResponse(response).map(normalizeService);
}

export async function createServico(payload) {
  const response = await apiClient.post(SERVICES_ENDPOINT, payload);
  return normalizeService(unwrapResponse(response));
}
