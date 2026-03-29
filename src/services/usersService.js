import { apiClient, unwrapResponse } from './api';

const USERS_ENDPOINT = '/usuarios';

function normalizeUser(user) {
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    perfil: user.perfil,
  };
}

export async function getUsuarios() {
  const response = await apiClient.get(USERS_ENDPOINT);
  return unwrapResponse(response).map(normalizeUser);
}

export async function createUsuario(payload) {
  const response = await apiClient.post(USERS_ENDPOINT, payload);
  return normalizeUser(unwrapResponse(response));
}
