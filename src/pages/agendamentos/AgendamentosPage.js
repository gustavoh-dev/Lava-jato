import { useEffect, useMemo, useRef, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import AppointmentForm from '../../components/agendamentos/AppointmentForm';
import AppointmentList from '../../components/agendamentos/AppointmentList';
import { getClientes } from '../../services/clientsService';
import { getServicos } from '../../services/serviceCatalogService';
import { getVeiculos } from '../../services/vehiclesService';
import {
  createAgendamento,
  getAgendamentos,
} from '../../services/appointmentsService';
import { validateAppointmentForm } from './appointmentValidation';

const initialFormData = {
  clienteId: '',
  veiculoId: '',
  tipoServico: '',
  data: '',
};

function AgendamentosPage() {
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const filteredVehicles = useMemo(() => {
    if (!formData.clienteId) {
      return [];
    }

    return vehicles.filter((vehicle) => String(vehicle.clienteId) === String(formData.clienteId));
  }, [vehicles, formData.clienteId]);

  async function loadInitialData() {
    try {
      setError('');
      setIsLoadingClients(true);
      setIsLoadingVehicles(true);
      setIsLoadingServices(true);
      setIsLoadingAppointments(true);

      const [clientsData, vehiclesData, servicesData, appointmentsData] = await Promise.all([
        getClientes(),
        getVeiculos(),
        getServicos(),
        getAgendamentos(),
      ]);

      setClients(clientsData);
      setVehicles(vehiclesData);
      setServices(servicesData);
      setAppointments(appointmentsData);
    } catch (loadError) {
      setError('Nao foi possivel carregar os dados de agendamentos.');
    } finally {
      setIsLoadingClients(false);
      setIsLoadingVehicles(false);
      setIsLoadingServices(false);
      setIsLoadingAppointments(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => {
      if (name === 'clienteId') {
        return {
          ...current,
          clienteId: value,
          veiculoId: '',
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });

    setErrors((current) => ({
      ...current,
      [name]: '',
      ...(name === 'clienteId' ? { veiculoId: '' } : {}),
    }));
  }

  function focusForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback('');
    setError('');

    const validationErrors = validateAppointmentForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const createdAppointment = await createAgendamento(formData);
      setAppointments((current) => [createdAppointment, ...current]);
      setFormData(initialFormData);
      setErrors({});
      setFeedback('Agendamento salvo com sucesso.');
    } catch (submitError) {
      setError('Nao foi possivel salvar o agendamento.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="stack-lg">
      <PageHeader
        title="Agendamentos"
        description="Organize a agenda de servicos com cliente, veiculo, data e tipo de atendimento."
        actionLabel="Agendar servico"
        onAction={focusForm}
      />

      {feedback ? <div className="alert alert-success mb-0">{feedback}</div> : null}
      {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

      <div ref={formRef}>
        <AppointmentForm
          clients={clients}
          vehicles={filteredVehicles}
          services={services}
          formData={formData}
          errors={errors}
          isLoadingClients={isLoadingClients}
          isLoadingVehicles={isLoadingVehicles}
          isLoadingServices={isLoadingServices}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      <AppointmentList appointments={appointments} isLoading={isLoadingAppointments} />
    </div>
  );
}

export default AgendamentosPage;
