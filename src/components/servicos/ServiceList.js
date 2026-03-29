function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function ServiceList({ services, isLoading }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Catalogo de servicos</h4>
        <span>Visualize os servicos disponiveis com descricao e valor praticado.</span>
      </div>

      {isLoading ? (
        <div className="d-flex align-items-center gap-3">
          <div className="spinner-border text-success" role="status" aria-hidden="true" />
          <span>Carregando servicos...</span>
        </div>
      ) : null}

      {!isLoading && services.length === 0 ? (
        <div className="client-empty-state">
          <strong>Nenhum servico cadastrado.</strong>
          <p className="mb-0">Cadastre o primeiro servico usando o formulario acima.</p>
        </div>
      ) : null}

      {!isLoading && services.length > 0 ? (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Servico</th>
                <th>Descricao</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="fw-semibold">{service.nome}</td>
                  <td>{service.descricao}</td>
                  <td>{formatCurrency(service.valor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default ServiceList;
