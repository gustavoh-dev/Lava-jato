import FormField from '../common/FormField';

function ClientForm({
  formData,
  errors,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Novo cliente</h4>
        <span>Preencha os dados principais para cadastrar um cliente.</span>
      </div>

      <form className="row g-3" onSubmit={onSubmit} noValidate>
        <FormField
          id="nome"
          label="Nome"
          value={formData.nome}
          onChange={onChange}
          placeholder="Digite o nome completo"
          error={errors.nome}
          required
        />

        <div className="col-12 col-md-6">
          <FormField
            id="telefone"
            label="Telefone"
            value={formData.telefone}
            onChange={onChange}
            placeholder="(11) 99999-9999"
            error={errors.telefone}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <FormField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="cliente@email.com"
            error={errors.email}
            required
          />
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar cliente'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ClientForm;
