# Sistema Lava Jato

Repositorio unificado com frontend React e backend Java.

## Estrutura

```text
.
|-- backend/
|   |-- src/main/java/
|   `-- README.md
|-- public/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- routes/
|   `-- services/
|-- package.json
`-- README.md
```

## Frontend

```bash
npm install
npm start
npm test
npm run build
```

## Backend

```bash
javac -d backend/out backend/src/main/java/model/*.java backend/src/main/java/service/*.java backend/src/main/java/main/*.java
java -cp backend/out Main
```

## Observacao

O frontend continua sendo a aplicacao principal na raiz. O backend Java foi incorporado na pasta `backend/` para manter tudo no mesmo GitHub.
