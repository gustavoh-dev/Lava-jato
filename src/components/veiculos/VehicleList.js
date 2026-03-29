function VehicleList({ vehicles, isLoading }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Listagem de veiculos</h4>
        <span>Visualize os veiculos cadastrados e o cliente responsavel por cada registro.</span>
      </div>

      {isLoading ? (
        <div className="d-flex align-items-center gap-3">
          <div className="spinner-border text-success" role="status" aria-hidden="true" />
          <span>Carregando veiculos...</span>
        </div>
      ) : null}

      {!isLoading && vehicles.length === 0 ? (
        <div className="client-empty-state">
          <strong>Nenhum veiculo cadastrado.</strong>
          <p className="mb-0">Cadastre o primeiro veiculo usando o formulario acima.</p>
        </div>
      ) : null}

      {!isLoading && vehicles.length > 0 ? (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Placa</th>
                <th>Cliente</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="fw-semibold">{vehicle.modelo}</td>
                  <td>{vehicle.placa}</td>
                  <td>{vehicle.clienteNome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default VehicleList;
