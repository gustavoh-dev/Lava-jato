import FormField from '../common/FormField';

const profileOptions = ['Administrador', 'Atendente', 'Operador'];

function UserForm({
  formData,
  errors,
  isSubmitting,
  onChange,
  onSubmit,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h4>Novo usuario</h4>
        <span>Cadastre os acessos internos que vao operar o sistema no dia a dia.</span>
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
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="usuario@empresa.com"
            error={errors.email}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <FormField
            id="senha"
            label="Senha"
            type="password"
            value={formData.senha}
            onChange={onChange}
            placeholder="Defina uma senha"
            error={errors.senha}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label fw-semibold" htmlFor="perfil">
            Perfil
          </label>
          <select
            id="perfil"
            name="perfil"
            value={formData.perfil}
            onChange={onChange}
            className={errors.perfil ? 'form-select is-invalid' : 'form-select'}
          >
            <option value="">Selecione o perfil</option>
            {profileOptions.map((perfil) => (
              <option key={perfil} value={perfil}>
                {perfil}
              </option>
            ))}
          </select>
          {errors.perfil ? <div className="invalid-feedback d-block">{errors.perfil}</div> : null}
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-success px-4" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar usuario'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default UserForm;
