export function validateVehicleForm(formData) {
  const errors = {};

  if (!formData.modelo.trim()) {
    errors.modelo = 'Informe o modelo do veiculo.';
  }

  if (!formData.placa.trim()) {
    errors.placa = 'Informe a placa.';
  } else if (formData.placa.replace(/[^a-zA-Z0-9]/g, '').length < 7) {
    errors.placa = 'Informe uma placa valida.';
  }

  if (!formData.clienteId) {
    errors.clienteId = 'Selecione um cliente.';
  }

  return errors;
}
