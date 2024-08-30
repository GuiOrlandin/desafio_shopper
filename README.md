# APP

Foi desenvolvido um projeto como parte de um teste para a vaga de Fullstack no Shopper, intitulado Desafio Shopper. Este projeto foca na criação e gerenciamento de funcionalidades de um sistema, incluindo três endpoints. O POST /upload recebe imagens em base64, consulta a API Gemini para extrair e validar medições, e garante a integridade dos dados; o PATCH /confirm é responsável por confirmar ou corrigir os valores lidos, validando a existência e o status de confirmação da leitura; e o GET /<customer_code>/list lista e filtra medições realizadas por um cliente, com suporte a um parâmetro opcional para o tipo de medição e validação case insensitive. O projeto demonstra a habilidade em implementar, validar e gerenciar dados.

### Instale as dependências

```sh
npm i
```

### Execute o docker compose

```sh
docker compose up
```

### Execute o docker

```sh
docker start
```

### Inicie a aplicação

```sh
npm run start:dev
```

### Rode os testes da aplicação

```sh
npm run test
```
