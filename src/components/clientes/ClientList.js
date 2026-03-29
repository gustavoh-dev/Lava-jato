function ClientList({ clients, isLoading, onDelete }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Listagem de clientes</h4>
        <span>Consulte os clientes cadastrados e gerencie os registros da operacao.</span>
      </div>

      {isLoading ? (
        <div className="d-flex align-items-center gap-3">
          <div className="spinner-border text-success" role="status" aria-hidden="true" />
          <span>Carregando clientes...</span>
        </div>
      ) : null}

      {!isLoading && clients.length === 0 ? (
        <div className="client-empty-state">
          <strong>Nenhum cliente cadastrado.</strong>
          <p className="mb-0">Cadastre o primeiro cliente usando o formulario acima.</p>
        </div>
      ) : null}

      {!isLoading && clients.length > 0 ? (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th className="text-end">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="fw-semibold">{client.nome}</td>
                  <td>{client.telefone}</td>
                  <td>{client.email}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onDelete(client.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default ClientList;
