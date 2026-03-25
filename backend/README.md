# LavaJato Backend

Backend Java do sistema de lava jato.

## Estrutura

```text
LavaJato/
|-- src/
|   `-- main/
|       `-- java/
|           |-- main/
|           |-- model/
|           `-- service/
|-- .gitignore
`-- README.md
```

## Compilar

```bash
javac -d out src/main/java/model/*.java src/main/java/service/*.java src/main/java/main/*.java
```

## Executar

```bash
java -cp out Main
```

## Proximos passos recomendados

- adicionar `package` nas classes
- migrar para Maven ou Gradle
- criar camada `controller` ou API para integrar com o frontend React
