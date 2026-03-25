function AppointmentList({ appointments, isLoading }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Agenda de servicos</h4>
        <span>Listagem dos agendamentos cadastrados com cliente, veiculo e servico.</span>
      </div>

      {isLoading ? (
        <div className="d-flex align-items-center gap-3">
          <div className="spinner-border text-success" role="status" aria-hidden="true" />
          <span>Carregando agendamentos...</span>
        </div>
      ) : null}

      {!isLoading && appointments.length === 0 ? (
        <div className="client-empty-state">
          <strong>Nenhum agendamento cadastrado.</strong>
          <p className="mb-0">Use o formulario acima para criar o primeiro agendamento.</p>
        </div>
      ) : null}

      {!isLoading && appointments.length > 0 ? (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Veiculo</th>
                <th>Servico</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="fw-semibold">{appointment.clienteNome}</td>
                  <td>
                    {appointment.veiculoNome}
                    <div className="small text-muted">{appointment.placa}</div>
                  </td>
                  <td>{appointment.tipoServico}</td>
                  <td>{appointment.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default AppointmentList;
