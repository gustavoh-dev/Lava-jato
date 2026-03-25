import PageHeader from '../../components/common/PageHeader';

const appointments = [
  { date: '25/03', hour: '08:00', service: 'Lavagem completa', status: 'Confirmado' },
  { date: '25/03', hour: '09:30', service: 'Polimento tecnico', status: 'Em andamento' },
  { date: '25/03', hour: '11:00', service: 'Higienizacao interna', status: 'Confirmado' },
];

function AgendamentosPage() {
  return (
    <div className="stack-lg">
      <PageHeader
        title="Agendamentos"
        description="Controle operacional da agenda com base pronta para status e filtros."
        actionLabel="Agendar servico"
      />

      <section className="panel">
        <div className="panel-heading">
          <h4>Agenda operacional</h4>
          <span>Organizacao inicial em cards para facilitar evolucao.</span>
        </div>

        <div className="list-grid">
          {appointments.map((appointment) => (
            <article key={`${appointment.date}-${appointment.hour}`} className="list-card">
              <strong>{appointment.service}</strong>
              <span>
                {appointment.date} as {appointment.hour}
              </span>
              <p>{appointment.status}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AgendamentosPage;
