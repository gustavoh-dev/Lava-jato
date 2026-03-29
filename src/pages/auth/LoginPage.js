import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const initialFormData = {
  email: '',
  password: '',
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const success = await login(formData);

    if (!success) {
      setError('Credenciais invalidas. Verifique seu email e senha.');
      setIsSubmitting(false);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-header">
          <span className="section-tag">Acesso</span>
          <h1>Lava Jato Pro</h1>
          <p>Entre para acessar dashboard, cadastros, agenda e pagamentos.</p>
        </div>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label fw-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="seuemail@empresa.com"
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {error ? <div className="col-12"><div className="alert alert-danger mb-0">{error}</div></div> : null}

          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-success btn-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
