import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import PaymentsFilter from '../../components/pagamentos/PaymentsFilter';
import PaymentsTable from '../../components/pagamentos/PaymentsTable';
import { getPagamentos, marcarComoPago } from '../../services/paymentsService';

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadPayments(filterDate);
  }, [filterDate]);

  async function loadPayments(date) {
    try {
      setError('');
      setIsLoading(true);
      const data = await getPagamentos(date);
      setPayments(data);
    } catch (loadError) {
      setError('Nao foi possivel carregar os pagamentos.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMarkAsPaid(paymentId) {
    try {
      setFeedback('');
      setError('');
      await marcarComoPago(paymentId);
      setPayments((current) =>
        current.map((payment) =>
          payment.id === paymentId ? { ...payment, pago: true } : payment
        )
      );
      setFeedback('Pagamento atualizado com sucesso.');
    } catch (updateError) {
      setError('Nao foi possivel atualizar o pagamento.');
    }
  }

  function handleClearFilter() {
    setFilterDate('');
  }

  return (
    <div className="stack-lg">
      <PageHeader
        title="Pagamentos"
        description="Controle financeiro dos servicos realizados com filtro por data e acao de baixa."
      />

      {feedback ? <div className="alert alert-success mb-0">{feedback}</div> : null}
      {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

      <PaymentsFilter
        filterDate={filterDate}
        onChange={setFilterDate}
        onClear={handleClearFilter}
      />

      <PaymentsTable
        payments={payments}
        isLoading={isLoading}
        onMarkAsPaid={handleMarkAsPaid}
      />
    </div>
  );
}

export default PaymentsPage;
