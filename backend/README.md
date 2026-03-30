# LavaJato Backend

API Spring Boot com persistencia em PostgreSQL.

## Banco de dados

Crie o banco:

```sql
CREATE DATABASE lavajato;
```

Configuracao padrao usada pelo projeto:

```text
host=localhost
port=5432
database=lavajato
username=postgres
password=postgres
```

Voce pode sobrescrever por variaveis de ambiente:

```text
DATABASE_URL=jdbc:postgresql://localhost:5432/lavajato
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Rodar localmente

```bash
gradlew.bat bootRun
```

API em:

```text
http://localhost:8080
```

## Endpoints principais

- `GET /clientes`
- `POST /clientes`
- `DELETE /clientes/{id}`
- `GET /veiculos`
- `POST /veiculos`
- `GET /agendamentos`
- `POST /agendamentos`
- `GET /pagamentos`
- `PATCH /pagamentos/{id}/pago`

## Observacao

O schema e criado/atualizado automaticamente com `spring.jpa.hibernate.ddl-auto=update`.
Quando o banco estiver vazio, a API insere dados iniciais para facilitar os testes do frontend.

## Deploy no Render

O backend esta preparado para rodar no Render com:

- porta dinamica via `PORT`
- CORS configuravel via `CORS_ALLOWED_ORIGINS`
- `Dockerfile` em `backend/Dockerfile`

Configuracao recomendada no Render:

- Service type: `Web Service`
- Runtime: `Docker`
- Root directory: `backend`
- Dockerfile path: `./Dockerfile`

Variaveis de ambiente:

```text
DATABASE_URL=<Internal Database URL do Render Postgres>
CORS_ALLOWED_ORIGINS=https://seu-frontend.onrender.com
```
