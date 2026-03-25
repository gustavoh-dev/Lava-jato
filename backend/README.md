# LavaJato Backend

API Spring Boot para o sistema de lava jato.

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

Os dados atuais ficam em memoria para integrar com o frontend imediatamente. O proximo passo natural e trocar a camada em memoria por banco de dados.
