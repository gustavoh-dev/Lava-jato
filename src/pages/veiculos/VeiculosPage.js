import PageHeader from '../../components/common/PageHeader';

const vehicles = [
  { plate: 'BRA2E19', model: 'Onix LT', owner: 'Mariana Costa' },
  { plate: 'QWE4H67', model: 'HB20 Comfort', owner: 'Carlos Lima' },
  { plate: 'XYZ8K21', model: 'Toro Volcano', owner: 'Fernanda Alves' },
];

function VeiculosPage() {
  return (
    <div className="stack-lg">
      <PageHeader
        title="Veiculos"
        description="Base veicular vinculada aos clientes e pronta para historico de servicos."
        actionLabel="Novo veiculo"
      />

      <section className="panel">
        <div className="panel-heading">
          <h4>Frota cadastrada</h4>
          <span>Modelo inicial com dados exibidos em cards.</span>
        </div>

        <div className="list-grid">
          {vehicles.map((vehicle) => (
            <article key={vehicle.plate} className="list-card">
              <strong>{vehicle.model}</strong>
              <span>Placa {vehicle.plate}</span>
              <p>{vehicle.owner}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default VeiculosPage;
