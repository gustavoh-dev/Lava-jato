import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import ClientForm from '../../components/clientes/ClientForm';
import ClientList from '../../components/clientes/ClientList';
import { createCliente, deleteCliente, getClientes } from '../../services/clientsService';
import { validateClientForm } from './clientValidation';

const initialFormData = {
  nome: '',
  telefone: '',
  email: '',
};

function ClientesPage() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      setIsLoading(true);
      setError('');
      const data = await getClientes();
      setClients(data);
    } catch (loadError) {
      setError('Nao foi possivel carregar os clientes.');
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

    const validationErrors = validateClientForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const createdClient = await createCliente(formData);
      setClients((current) => [createdClient, ...current]);
      setFormData(initialFormData);
      setErrors({});
      setFeedback('Cliente salvo com sucesso.');
    } catch (submitError) {
      setError('Nao foi possivel salvar o cliente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(clientId) {
    try {
      setError('');
      await deleteCliente(clientId);
      setClients((current) => current.filter((client) => client.id !== clientId));
    } catch (deleteError) {
      setError('Nao foi possivel deletar o cliente.');
    }
  }

  return (
    <div className="stack-lg">
      <PageHeader
        title="Clientes"
        description="Cadastro, consulta e exclusao de clientes com integracao preparada para API."
        actionLabel="Novo cliente"
        onAction={focusForm}
      />

      {feedback ? <div className="alert alert-success mb-0">{feedback}</div> : null}
      {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

      <div ref={formRef}>
        <ClientForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      <ClientList clients={clients} isLoading={isLoading} onDelete={handleDelete} />
    </div>
  );
}

export default ClientesPage;
