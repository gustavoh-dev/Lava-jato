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
        description="Visao executiva da operacao do lavajato com indicadores prontos para integrar com API."
        actionLabel="Novo agendamento"
      />

      <section className="dashboard-hero card border-0 shadow-sm overflow-hidden">
        <div className="card-body p-4 p-lg-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="section-tag">Resumo do dia</span>
              <h3 className="mt-3 mb-2">Controle rapido da operacao do lavajato</h3>
              <p className="mb-0 dashboard-hero-text">
                A estrutura usa hooks e service assíncrono, permitindo trocar o mock atual por uma API real sem refazer a tela.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="dashboard-highlight-box">
                <span className="dashboard-highlight-label">Ordens de hoje</span>
                <strong>{summary?.totals.servicesToday ?? '--'}</strong>
                <p className="mb-0">Monitoramento operacional centralizado.</p>
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
        <section className="row g-4">
          {summary.highlights.map((item) => (
            <div key={item.title} className="col-12 col-md-6 col-xl-4">
              <DashboardStatCard {...item} />
            </div>
          ))}
        </section>
      ) : null}

      <section className="panel">
        <div className="panel-heading">
          <h4>Integracao pronta para API</h4>
          <span>Os dados atuais estao centralizados na camada de servico.</span>
        </div>

        <div className="row g-3">
          <div className="col-md-4">
            <div className="dashboard-info-tile">
              <small>Service</small>
              <strong>fetchDashboardSummary()</strong>
              <p className="mb-0">Responsavel por carregar os dados do dashboard.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="dashboard-info-tile">
              <small>Mock atual</small>
              <strong>REACT_APP_USE_MOCK_API</strong>
              <p className="mb-0">Controle simples para alternar entre mock e API real.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="dashboard-info-tile">
              <small>Endpoint futuro</small>
              <strong>/dashboard/summary</strong>
              <p className="mb-0">Contrato sugerido para backend entregar os indicadores.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
