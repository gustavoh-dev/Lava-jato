const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export async function getJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.status}`);
  }

  return response.json();
}

export { API_BASE_URL };
