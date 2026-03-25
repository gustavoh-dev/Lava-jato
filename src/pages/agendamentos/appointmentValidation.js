export function validateAppointmentForm(formData) {
  const errors = {};

  if (!formData.clienteId) {
    errors.clienteId = 'Selecione um cliente.';
  }

  if (!formData.veiculoId) {
    errors.veiculoId = 'Selecione um veiculo.';
  }

  if (!formData.tipoServico) {
    errors.tipoServico = 'Selecione o tipo de servico.';
  }

  if (!formData.data) {
    errors.data = 'Informe a data do agendamento.';
  }

  return errors;
}
