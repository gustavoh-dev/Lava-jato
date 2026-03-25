import FormField from '../common/FormField';

function VehicleForm({
  clients,
  formData,
  errors,
  isLoadingClients,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Novo veiculo</h4>
        <span>Associe o veiculo a um cliente ja cadastrado.</span>
      </div>

      <form className="row g-3" onSubmit={onSubmit} noValidate>
        <div className="col-12 col-md-6">
          <FormField
            id="modelo"
            label="Modelo"
            value={formData.modelo}
            onChange={onChange}
            placeholder="Ex.: Onix LT"
            error={errors.modelo}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <FormField
            id="placa"
            label="Placa"
            value={formData.placa}
            onChange={onChange}
            placeholder="ABC1D23"
            error={errors.placa}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold" htmlFor="clienteId">
            Cliente
          </label>
          <select
            id="clienteId"
            name="clienteId"
            value={formData.clienteId}
            onChange={onChange}
            className={errors.clienteId ? 'form-select is-invalid' : 'form-select'}
            disabled={isLoadingClients || clients.length === 0}
            required
          >
            <option value="">
              {isLoadingClients ? 'Carregando clientes...' : 'Selecione um cliente'}
            </option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nome}
              </option>
            ))}
          </select>
          {errors.clienteId ? <div className="invalid-feedback d-block">{errors.clienteId}</div> : null}
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-success px-4"
            disabled={isSubmitting || isLoadingClients || clients.length === 0}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar veiculo'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default VehicleForm;
