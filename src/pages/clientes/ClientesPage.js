import PageHeader from '../../components/common/PageHeader';

const clients = [
  { name: 'Mariana Costa', phone: '(11) 99999-1234', plan: 'Premium' },
  { name: 'Carlos Lima', phone: '(11) 98888-4321', plan: 'Recorrente' },
  { name: 'Fernanda Alves', phone: '(11) 97777-0101', plan: 'Avulso' },
];

function ClientesPage() {
  return (
    <div className="stack-lg">
      <PageHeader
        title="Clientes"
        description="Cadastro e acompanhamento do relacionamento com a base ativa."
        actionLabel="Novo cliente"
      />

      <section className="panel">
        <div className="panel-heading">
          <h4>Carteira de clientes</h4>
          <span>Estrutura preparada para integrar com API e filtros.</span>
        </div>

        <div className="list-grid">
          {clients.map((client) => (
            <article key={client.phone} className="list-card">
              <strong>{client.name}</strong>
              <span>{client.phone}</span>
              <p>{client.plan}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ClientesPage;
