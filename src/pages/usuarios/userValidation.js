export function validateUserForm(formData) {
  const errors = {};

  if (!formData.nome.trim()) {
    errors.nome = 'Informe o nome do usuario.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Informe o email.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Informe um email valido.';
  }

  if (!formData.senha.trim()) {
    errors.senha = 'Informe a senha.';
  } else if (formData.senha.trim().length < 6) {
    errors.senha = 'Informe uma senha com pelo menos 6 caracteres.';
  }

  if (!formData.perfil) {
    errors.perfil = 'Selecione o perfil.';
  }

  return errors;
}
