import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import ServiceForm from '../../components/servicos/ServiceForm';
import ServiceList from '../../components/servicos/ServiceList';
import { createServico, getServicos } from '../../services/serviceCatalogService';
import { validateServiceForm } from './serviceValidation';

const initialFormData = {
  nome: '',
  descricao: '',
  valor: '',
};

function ServicosPage() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      setError('');
      setIsLoading(true);
      const data = await getServicos();
      setServices(data);
    } catch (loadError) {
      setError('Nao foi possivel carregar os servicos.');
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

    const validationErrors = validateServiceForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        ...formData,
        valor: Number(formData.valor),
      };
      const createdService = await createServico(payload);
      setServices((current) => [createdService, ...current]);
      setFormData(initialFormData);
      setErrors({});
      setFeedback('Servico salvo com sucesso.');
    } catch (submitError) {
      setError('Nao foi possivel salvar o servico.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="stack-lg">
      <PageHeader
        title="Servicos"
        description="Cadastre os servicos oferecidos e mantenha os valores organizados."
        actionLabel="Novo servico"
        onAction={focusForm}
      />

      {feedback ? <div className="alert alert-success mb-0">{feedback}</div> : null}
      {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

      <div ref={formRef}>
        <ServiceForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      <ServiceList services={services} isLoading={isLoading} />
    </div>
  );
}

export default ServicosPage;
