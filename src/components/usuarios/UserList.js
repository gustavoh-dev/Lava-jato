function UserList({ users, isLoading }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Usuarios cadastrados</h4>
        <span>Acompanhe os acessos liberados para operacao do sistema.</span>
      </div>

      {isLoading ? (
        <div className="d-flex align-items-center gap-3">
          <div className="spinner-border text-success" role="status" aria-hidden="true" />
          <span>Carregando usuarios...</span>
        </div>
      ) : null}

      {!isLoading && users.length === 0 ? (
        <div className="client-empty-state">
          <strong>Nenhum usuario cadastrado.</strong>
          <p className="mb-0">Cadastre o primeiro usuario usando o formulario acima.</p>
        </div>
      ) : null}

      {!isLoading && users.length > 0 ? (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Perfil</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="fw-semibold">{user.nome}</td>
                  <td>{user.email}</td>
                  <td>{user.perfil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default UserList;
