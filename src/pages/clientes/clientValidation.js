export function validateClientForm(formData) {
  const errors = {};

  if (!formData.nome.trim()) {
    errors.nome = 'Informe o nome do cliente.';
  }

  if (!formData.telefone.trim()) {
    errors.telefone = 'Informe o telefone.';
  } else if (formData.telefone.replace(/\D/g, '').length < 10) {
    errors.telefone = 'Informe um telefone valido.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Informe o email.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Informe um email valido.';
  }

  return errors;
}
