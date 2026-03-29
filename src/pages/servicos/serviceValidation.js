export function validateServiceForm(formData) {
  const errors = {};

  if (!formData.nome.trim()) {
    errors.nome = 'Informe o nome do servico.';
  }

  if (!formData.descricao.trim()) {
    errors.descricao = 'Informe a descricao do servico.';
  }

  if (!formData.valor) {
    errors.valor = 'Informe o valor.';
  } else if (Number(formData.valor) <= 0) {
    errors.valor = 'Informe um valor maior que zero.';
  }

  return errors;
}
