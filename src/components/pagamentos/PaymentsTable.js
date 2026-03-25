function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function PaymentsTable({ payments, isLoading, onMarkAsPaid }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Servicos realizados</h4>
        <span>Tabela pronta para integrar com API de pagamentos e conciliacao financeira.</span>
      </div>

      {isLoading ? (
        <div className="d-flex align-items-center gap-3">
          <div className="spinner-border text-success" role="status" aria-hidden="true" />
          <span>Carregando pagamentos...</span>
        </div>
      ) : null}

      {!isLoading && payments.length === 0 ? (
        <div className="client-empty-state">
          <strong>Nenhum servico encontrado.</strong>
          <p className="mb-0">Ajuste o filtro ou aguarde novos servicos realizados.</p>
        </div>
      ) : null}

      {!isLoading && payments.length > 0 ? (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Veiculo</th>
                <th>Servico</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Status</th>
                <th className="text-end">Acao</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="fw-semibold">{payment.clienteNome}</td>
                  <td>{payment.veiculoNome}</td>
                  <td>{payment.servico}</td>
                  <td>{payment.data}</td>
                  <td>{formatCurrency(payment.valor)}</td>
                  <td>
                    <span className={payment.pago ? 'badge text-bg-success' : 'badge text-bg-warning'}>
                      {payment.pago ? 'Pago' : 'Pendente'}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      disabled={payment.pago}
                      onClick={() => onMarkAsPaid(payment.id)}
                    >
                      {payment.pago ? 'Pago' : 'Marcar como pago'}
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

export default PaymentsTable;
