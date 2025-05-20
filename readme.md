# Integração com Redis Streams

Este repositório demonstra como integrar o Redis utilizando Streams para leitura e escrita de eventos em Node.js. O exemplo inclui dois arquivos principais:

- `publisher.js`: responsável por publicar eventos no stream do Redis.
- `consumer.js`: responsável por ler e processar eventos do stream.

## Como iniciar

1. Instale as dependências:

   ```
   npm i
   ```

2. Caso não tenha o Redis instalado localmente, utilize o Docker Compose fornecido no repositório para subir o serviço Redis:

   ```
   docker-compose up -d
   ```

3. Para adicionar um evento ao stream, execute o publisher:

   ```
   node publisher.js
   ```

4. Para ler os eventos, execute o consumer:
   ```
   node consumer.js
   ```

> Sempre que quiser adicionar um novo evento para o consumer ler, execute novamente o `publisher.js`.
