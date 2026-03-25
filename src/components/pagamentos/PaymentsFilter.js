function PaymentsFilter({ filterDate, onChange, onClear }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Filtro por data</h4>
        <span>Refine a listagem de servicos realizados para conciliacao de pagamentos.</span>
      </div>

      <div className="row g-3 align-items-end">
        <div className="col-12 col-md-4">
          <label className="form-label fw-semibold" htmlFor="paymentDate">
            Data
          </label>
          <input
            id="paymentDate"
            name="paymentDate"
            type="date"
            value={filterDate}
            onChange={(event) => onChange(event.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-12 col-md-auto">
          <button type="button" className="btn btn-outline-secondary" onClick={onClear}>
            Limpar filtro
          </button>
        </div>
      </div>
    </section>
  );
}

export default PaymentsFilter;
