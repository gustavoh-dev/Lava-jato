import FormField from '../common/FormField';

function ServiceForm({
  formData,
  errors,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Novo servico</h4>
        <span>Cadastre os servicos oferecidos e mantenha a tabela comercial organizada.</span>
      </div>

      <form className="row g-3" onSubmit={onSubmit} noValidate>
        <div className="col-12 col-md-6">
          <FormField
            id="nome"
            label="Nome do servico"
            value={formData.nome}
            onChange={onChange}
            placeholder="Ex.: Lavagem premium"
            error={errors.nome}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <FormField
            id="valor"
            label="Valor"
            type="number"
            value={formData.valor}
            onChange={onChange}
            placeholder="0.00"
            error={errors.valor}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-semibold" htmlFor="descricao">
            Descricao
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={onChange}
            placeholder="Descreva rapidamente o que esta incluso no servico"
            className={errors.descricao ? 'form-control is-invalid' : 'form-control'}
            rows="3"
          />
          {errors.descricao ? <div className="invalid-feedback d-block">{errors.descricao}</div> : null}
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar servico'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ServiceForm;
