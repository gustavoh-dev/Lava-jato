import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import UserForm from '../../components/usuarios/UserForm';
import UserList from '../../components/usuarios/UserList';
import { createUsuario, getUsuarios } from '../../services/usersService';
import { validateUserForm } from './userValidation';

const initialFormData = {
  nome: '',
  email: '',
  senha: '',
  perfil: '',
};

function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setError('');
      setIsLoading(true);
      const data = await getUsuarios();
      setUsers(data);
    } catch (loadError) {
      setError('Nao foi possivel carregar os usuarios.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
  }

  function focusForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback('');
    setError('');

    const validationErrors = validateUserForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const createdUser = await createUsuario(formData);
      setUsers((current) => [createdUser, ...current]);
      setFormData(initialFormData);
      setErrors({});
      setFeedback('Usuario salvo com sucesso.');
    } catch (submitError) {
      setError('Nao foi possivel salvar o usuario.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="stack-lg">
      <PageHeader
        title="Usuarios"
        description="Gerencie os acessos internos e os perfis de operacao do sistema."
        actionLabel="Novo usuario"
        onAction={focusForm}
      />

      {feedback ? <div className="alert alert-success mb-0">{feedback}</div> : null}
      {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

      <div ref={formRef}>
        <UserForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      <UserList users={users} isLoading={isLoading} />
    </div>
  );
}

export default UsuariosPage;
