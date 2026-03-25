import { apiClient } from './api';

let mockClients = [
  { id: 1, nome: 'Mariana Costa', telefone: '(11) 99999-1234', email: 'mariana@lavajato.com' },
  { id: 2, nome: 'Carlos Lima', telefone: '(11) 98888-4321', email: 'carlos@lavajato.com' },
];

function shouldUseMockApi() {
  return process.env.REACT_APP_USE_MOCK_API !== 'false';
}

function normalizeClient(client) {
  return {
    id: client.id,
    nome: client.nome,
    telefone: client.telefone,
    email: client.email,
  };
}

export async function getClientes() {
  if (shouldUseMockApi()) {
    return Promise.resolve(mockClients.map(normalizeClient));
  }

  const response = await apiClient.get('/clientes');
  return response.data.map(normalizeClient);
}

export async function createCliente(payload) {
  if (shouldUseMockApi()) {
    const newClient = {
      id: Date.now(),
      ...payload,
    };

    mockClients = [newClient, ...mockClients];
    return Promise.resolve(normalizeClient(newClient));
  }

  const response = await apiClient.post('/clientes', payload);
  return normalizeClient(response.data);
}

export async function deleteCliente(clienteId) {
  if (shouldUseMockApi()) {
    mockClients = mockClients.filter((client) => client.id !== clienteId);
    return Promise.resolve();
  }

  await apiClient.delete(`/clientes/${clienteId}`);
}
