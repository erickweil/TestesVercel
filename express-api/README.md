# NodeJS Simples

## Exemplo de Aplicação NodeJS Simples (Sem banco de dados)

Não utiliza Banco de dados nem depende de nenhum outro serviço. Exemplifica
como realizar testes básicos com Jest

Entre em http://localhost:3000/docs para acessar a documentação swagger para executar as rotas da api

Rotas:
- GET /teste
    - Para testar enviar mensagem pelo parâmetro get, esta rota retorna tudo que foi enviado
- GET /aleatorio
    - Produz um número aleatório

## Explicação dos arquivos de configuração inicial do projeto:

**Git**
- .gitignore - Para não incluir no repositório git arquivos desnecessários
- README.md - Este README

**Javascript**
- .env.example - Arquivo .env exemplo (Deve renomear para .env após clonar o repositório)
- package.json e package-lock.json - Configuração de dependências do nodejs
- .eslintrc.json, .eslintignore - Para obrigar um certo estilo de escrita do javascript

**Docker**
- Dockerfile - Para ser possível realizar o build da aplicação como uma imagem docker
- .dockerignore - Evitar que node_modules e outros arquivos irrelevantes ao deploy sejam incluídos na imagem docker

**Kubernetes**
- deployment.yaml - Configuração de deploy da aplicação em cluster kubernetes

**Gitlab CI/CD**
- .gitlab-ci.yml - Exemplo de configuração para realizar testes, build e deploy automatizado no Gitlab

# Como Executar

**Localmente**

```bash
npm install
npm start
```

**Utilizando Docker Compose**

```bash
docker compose up
```


**Utilizando Docker (Realizando build manualmente)**

```bash
docker build -t nodejs-simples .
docker run -d -p 3000:3000 nodejs-simples
```


Para qualquer uma das formas acima, Abra no navegador http://localhost:3000/