# Sistema Lava Jato

Projeto full stack para gestao de um lavajato, com frontend React na raiz do repositorio e backend Spring Boot em `backend/`.

## Estrutura

```text
.
|-- backend/
|   |-- src/main/java/com/lavajato/backend/
|   |-- src/main/resources/
|   `-- README.md
|-- public/
|-- src/
|   |-- components/
|   |-- contexts/
|   |-- pages/
|   |-- routes/
|   `-- services/
|-- package.json
`-- README.md
```

## Modulos do frontend

- `dashboard`
- `clientes`
- `veiculos`
- `agendamentos`
- `pagamentos`
- `login` com protecao de rotas

## Tecnologias

- React com componentes funcionais e hooks
- React Router
- Bootstrap
- Axios
- Spring Boot
- Spring Data JPA
- PostgreSQL

## Pre-requisitos

- Node.js
- Java 24
- PostgreSQL com um banco `lavajato`

Crie o banco:

```sql
CREATE DATABASE lavajato;
```

## Configuracao do backend

As configuracoes padrao sao:

```text
DATABASE_URL=jdbc:postgresql://localhost:5432/lavajato
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
```

Se sua senha for diferente, defina as variaveis antes de subir a API.

## Rodando localmente

Instale as dependencias do frontend:

```bash
npm install
```

Suba o backend:

```powershell
$env:DATABASE_USERNAME="postgres"
$env:DATABASE_PASSWORD="SUA_SENHA"
npm run start:backend
```

Em outro terminal, suba o frontend:

```bash
npm start
```

Aplicacoes:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

## Scripts

```bash
npm start
npm run build
npm test -- --watchAll=false
npm run start:backend
npm run test:backend
```

## Endpoints principais

- `GET /dashboard/summary`
- `GET /clientes`
- `POST /clientes`
- `DELETE /clientes/{id}`
- `GET /veiculos`
- `POST /veiculos`
- `GET /agendamentos`
- `POST /agendamentos`
- `GET /pagamentos`
- `PATCH /pagamentos/{id}/pago`

## Estado atual

O projeto esta fechado como MVP funcional:

- autenticacao basica no frontend
- protecao de rotas
- persistencia real no PostgreSQL
- integracao React + Spring Boot
- dashboard consumindo dados reais da API

## Deploy no Render

Suba o projeto em 3 partes:

1. `PostgreSQL` no Render
2. `backend` como `Web Service`
3. `frontend` como `Static Site`

### Backend

- Root directory: `backend`
- Runtime: `Docker`
- Dockerfile path: `./Dockerfile`

Variaveis de ambiente:

```text
DATABASE_URL=<Internal Database URL do Render Postgres>
CORS_ALLOWED_ORIGINS=https://seu-frontend.onrender.com
```

### Frontend

- Root directory: raiz do repositorio
- Build command: `npm install && npm run build`
- Publish directory: `build`

Variavel de ambiente:

```text
REACT_APP_API_URL=https://seu-backend.onrender.com
```

Na configuracao do Static Site, adicione uma rewrite para React Router:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```
