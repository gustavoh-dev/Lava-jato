function AppointmentForm({
  clients,
  vehicles,
  serviceTypes,
  formData,
  errors,
  isLoadingClients,
  isLoadingVehicles,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Novo agendamento</h4>
        <span>Escolha cliente, veiculo, servico e data para registrar o atendimento futuro.</span>
      </div>

      <form className="row g-3" onSubmit={onSubmit} noValidate>
        <div className="col-12 col-md-6">
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

        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold" htmlFor="veiculoId">
            Veiculo
          </label>
          <select
            id="veiculoId"
            name="veiculoId"
            value={formData.veiculoId}
            onChange={onChange}
            className={errors.veiculoId ? 'form-select is-invalid' : 'form-select'}
            disabled={isLoadingVehicles || vehicles.length === 0 || !formData.clienteId}
          >
            <option value="">
              {!formData.clienteId
                ? 'Selecione um cliente primeiro'
                : isLoadingVehicles
                  ? 'Carregando veiculos...'
                  : 'Selecione um veiculo'}
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.modelo} - {vehicle.placa}
              </option>
            ))}
          </select>
          {errors.veiculoId ? <div className="invalid-feedback d-block">{errors.veiculoId}</div> : null}
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold" htmlFor="tipoServico">
            Tipo de servico
          </label>
          <select
            id="tipoServico"
            name="tipoServico"
            value={formData.tipoServico}
            onChange={onChange}
            className={errors.tipoServico ? 'form-select is-invalid' : 'form-select'}
          >
            <option value="">Selecione o servico</option>
            {serviceTypes.map((serviceType) => (
              <option key={serviceType} value={serviceType}>
                {serviceType}
              </option>
            ))}
          </select>
          {errors.tipoServico ? <div className="invalid-feedback d-block">{errors.tipoServico}</div> : null}
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold" htmlFor="data">
            Data
          </label>
          <input
            id="data"
            name="data"
            type="date"
            value={formData.data}
            onChange={onChange}
            className={errors.data ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.data ? <div className="invalid-feedback d-block">{errors.data}</div> : null}
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-success px-4"
            disabled={isSubmitting || isLoadingClients || isLoadingVehicles || clients.length === 0}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar agendamento'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AppointmentForm;
