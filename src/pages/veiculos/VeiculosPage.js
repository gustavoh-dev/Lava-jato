import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import VehicleForm from '../../components/veiculos/VehicleForm';
import VehicleList from '../../components/veiculos/VehicleList';
import { getClientes } from '../../services/clientsService';
import { createVeiculo, getVeiculos } from '../../services/vehiclesService';
import { validateVehicleForm } from './vehicleValidation';

const initialFormData = {
  modelo: '',
  placa: '',
  clienteId: '',
};

function VeiculosPage() {
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      setError('');
      setIsLoadingClients(true);
      setIsLoadingVehicles(true);

      const [clientsData, vehiclesData] = await Promise.all([getClientes(), getVeiculos()]);
      setClients(clientsData);
      setVehicles(vehiclesData);
    } catch (loadError) {
      setError('Nao foi possivel carregar clientes e veiculos.');
    } finally {
      setIsLoadingClients(false);
      setIsLoadingVehicles(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValue = name === 'placa' ? value.toUpperCase() : value;

    setFormData((current) => ({
      ...current,
      [name]: nextValue,
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

    const validationErrors = validateVehicleForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const createdVehicle = await createVeiculo(formData, clients);
      setVehicles((current) => [createdVehicle, ...current]);
      setFormData(initialFormData);
      setErrors({});
      setFeedback('Veiculo salvo com sucesso.');
    } catch (submitError) {
      setError('Nao foi possivel salvar o veiculo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="stack-lg">
      <PageHeader
        title="Veiculos"
        description="Cadastro de veiculos com vinculo ao cliente vindo da API."
        actionLabel="Novo veiculo"
        onAction={focusForm}
      />

      {feedback ? <div className="alert alert-success mb-0">{feedback}</div> : null}
      {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

      <div ref={formRef}>
        <VehicleForm
          clients={clients}
          formData={formData}
          errors={errors}
          isLoadingClients={isLoadingClients}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      <VehicleList vehicles={vehicles} isLoading={isLoadingVehicles} />
    </div>
  );
}

export default VeiculosPage;
