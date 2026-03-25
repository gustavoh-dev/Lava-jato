import { apiClient, unwrapResponse } from './api';

const CLIENTES_ENDPOINT = '/clientes';

const clientesService = {
  async getClientes() {
    const response = await apiClient.get(CLIENTES_ENDPOINT);
    return unwrapResponse(response);
  },

  async createCliente(cliente) {
    const response = await apiClient.post(CLIENTES_ENDPOINT, cliente);
    return unwrapResponse(response);
  },

  async deleteCliente(clienteId) {
    await apiClient.delete(`${CLIENTES_ENDPOINT}/${clienteId}`);
  },
};

export const { getClientes, createCliente, deleteCliente } = clientesService;

export default clientesService;
