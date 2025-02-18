<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://avatars.githubusercontent.com/u/109223214?s=200&v=4" width="120" alt="Nest Logo" /></a>
</p>
</p>

<h4 align="center"> 
	Pantore Pay - Teste Backend
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a>
</p>

## 💻 Sobre o projeto
Este repositório contém um teste desenvolvido para a empresa Pantore Pay, com o objetivo de avaliar as habilidades e conhecimentos necessários para a posição de Desenvolvedor Backend.

---

## Requisitos

## ⚙️ Funcionalidades

- Criar um usuário na base de dados
- Atualizar o perfil do usuário na base
- Buscar e retornar usuários da base de dados
- Filtrar usuários por um campo de busca
- Documentação da api com swagger disponivel em: 
- Versionamento da api Ex: /api/v1
- Cobertura de testes (unitarios e e2e)
- Containers para o ambiente local com Docker e docker-compose
- Database migrations
- Documentacao utilizando JSDoc

---

## 🚀 Como executar o projeto

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- Docker
- Docker compose
- Node.js 22.x

### Rodando o Backend (servidor)

Clone o repositório:
```
git clone https://github.com/xxx/teste-empresa-xxx.git
```

Inicie os containers da aplicação:
```
docker compose up -d
```

Execute as migrations para criar a estrutura de tabelas da aplicação:
```
npx typeorm-ts-node-commonjs migration:run -d ./database/config/typeorm.config.ts
```

Agora se tudo ocorreu conforme o esperado acesse a documentação da api atraves do swagger: 


### Rodando testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Criar migrations
```
npx typeorm migration:create ./database/migrations/createUsersTable
```

## Executar migrations
```
npx typeorm-ts-node-commonjs migration:run -d ./database/config/typeorm.config.ts

```