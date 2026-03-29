import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DashboardStatCard from '../../components/dashboard/DashboardStatCard';
import { fetchDashboardSummary } from '../../services/dashboardService';

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const response = await fetchDashboardSummary();

        if (!isMounted) {
          return;
        }

        setSummary(response);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError('Nao foi possivel carregar os indicadores do dashboard.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="stack-lg">
      <PageHeader
        title="Dashboard"
        description="Acompanhe os principais indicadores da operacao do lavajato em um unico lugar."
        actionLabel="Novo agendamento"
      />

      <section className="dashboard-hero card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-4 p-lg-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="section-tag">Painel operacional</span>
              <h3 className="mt-3 mb-2">Visao rapida do movimento do dia</h3>
              <p className="mb-0 dashboard-hero-text">
                Consulte cadastros, frota atendida e servicos registrados hoje para acompanhar o funcionamento do sistema.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="dashboard-highlight-box">
                <span className="dashboard-highlight-label">Servicos realizados hoje</span>
                <strong>{summary?.totals.servicesToday ?? '--'}</strong>
                <p className="mb-0">Indicador atualizado a partir dos registros de pagamento do dia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="card border-0 shadow-sm">
          <div className="card-body p-4 d-flex align-items-center gap-3">
            <div className="spinner-border text-success" role="status" aria-hidden="true" />
            <span>Carregando indicadores do dashboard...</span>
          </div>
        </section>
      ) : null}

      {error ? (
        <section className="alert alert-danger mb-0" role="alert">
          {error}
        </section>
      ) : null}

      {!isLoading && !error && summary ? (
        <>
          <section className="row g-4">
            {summary.highlights.map((item) => (
              <div key={item.title} className="col-12 col-md-6 col-xl-4">
                <DashboardStatCard {...item} />
              </div>
            ))}
          </section>

          <section className="row g-4">
            <div className="col-12 col-xl-6">
              <div className="panel dashboard-panel h-100">
                <div className="panel-heading">
                  <h4>Resumo operacional</h4>
                  <span>Leitura objetiva do momento atual da operacao.</span>
                </div>

                <div className="dashboard-summary-list">
                  <div className="dashboard-summary-item">
                    <span className="dashboard-summary-bullet dashboard-accent-primary-bg" />
                    <div>
                      <strong>{summary.totals.clients} clientes cadastrados</strong>
                      <p className="mb-0">Base disponivel para relacionamento, agendamentos e historico de servicos.</p>
                    </div>
                  </div>

                  <div className="dashboard-summary-item">
                    <span className="dashboard-summary-bullet dashboard-accent-secondary-bg" />
                    <div>
                      <strong>{summary.totals.vehicles} veiculos registrados</strong>
                      <p className="mb-0">Frota vinculada aos clientes para acelerar o atendimento no balcao.</p>
                    </div>
                  </div>

                  <div className="dashboard-summary-item">
                    <span className="dashboard-summary-bullet dashboard-accent-warning-bg" />
                    <div>
                      <strong>{summary.totals.servicesToday} servicos com data de hoje</strong>
                      <p className="mb-0">Movimento do dia refletido pelos registros operacionais e pagamentos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-6">
              <div className="panel dashboard-panel h-100">
                <div className="panel-heading">
                  <h4>Atencao do dia</h4>
                  <span>Boas praticas para manter o atendimento fluindo sem atrasos.</span>
                </div>

                <div className="dashboard-checklist">
                  <div className="dashboard-check-item">
                    <strong>Confirme os agendamentos</strong>
                    <p className="mb-0">Revise o calendario e valide o veiculo correto antes do servico.</p>
                  </div>
                  <div className="dashboard-check-item">
                    <strong>Atualize os pagamentos</strong>
                    <p className="mb-0">Marque como pago cada atendimento concluido para manter o caixa correto.</p>
                  </div>
                  <div className="dashboard-check-item">
                    <strong>Mantenha os cadastros limpos</strong>
                    <p className="mb-0">Evite duplicidade de clientes e veiculos para preservar o historico.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default DashboardPage;
