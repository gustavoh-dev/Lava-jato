import StatCard from '../../components/dashboard/StatCard';
import PageHeader from '../../components/common/PageHeader';
import { getDashboardMetrics, getTodaySchedule } from '../../services/dashboardService';

function DashboardPage() {
  const metrics = getDashboardMetrics();
  const schedule = getTodaySchedule();

  return (
    <div className="stack-lg">
      <PageHeader
        title="Dashboard"
        description="Visao consolidada da operacao para acompanhamento rapido."
        actionLabel="Novo agendamento"
      />

      <section className="stats-grid">
        {metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h4>Agenda do dia</h4>
          <span>Servicos programados para a equipe atual.</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Horario</th>
                <th>Cliente</th>
                <th>Veiculo</th>
                <th>Servico</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={`${item.time}-${item.customer}`}>
                  <td>{item.time}</td>
                  <td>{item.customer}</td>
                  <td>{item.vehicle}</td>
                  <td>{item.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
