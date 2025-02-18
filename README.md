<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://avatars.githubusercontent.com/u/109223214?s=200&v=4" width="120" alt="Nest Logo" /></a>
</p>
</p>

<h4 align="center"> 
	Pantore Pay - Teste Backend
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-requisitos">Requisitos</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-o-projeto">Como executar</a>
</p>

## 💻 Sobre o projeto
Este repositório contém um teste desenvolvido para a empresa Pantore Pay, com o objetivo de avaliar as habilidades e conhecimentos necessários para a posição de Desenvolvedor Backend.

---

## ⚙️ Requisitos

- Criar um usuário na base de dados
- Atualizar o perfil do usuário na base
- Buscar e retornar usuários da base de dados
- Filtrar usuários por um campo de busca (pelo javascript ou pela query de consulta na base)
- Quaisquer funcionalidades extras serão consideradas um diferencial

---

## ⚙️ Funcionalidades

- Criar um usuário na base de dados
- Atualizar o perfil do usuário na base
- Buscar e retornar usuários da base de dados
- Filtrar usuários por um campo de busca
- Documentação da api com swagger disponivel em: http://localhost:3000/api
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
git clone https://github.com/iassam/pantore-pay-backend-test.git
```

Crie o arquivo .env com base nas configurações de exemplo:
```
cp .env.example .env
```

Instale as dependencias do projeto:
```
npm i
```

Inicie os containers da aplicação:
```
docker compose up -d
```

Execute as migrations para criar a estrutura de tabelas da aplicação:
```
docker exec -it local-pantore-pay-api npx typeorm-ts-node-commonjs migration:run -d ./database/config/typeorm.config.ts
```

Agora se tudo ocorreu conforme o esperado acesse a documentação da api atraves do swagger: http://localhost:3000/api


### Rodando testes

No diretorio do projeto local execute os seguites comandos para obter os respectivos resultados:

#### Executar testes unitarios

```
npm run test
```

#### Executar testes E2E
Observação: antes de rodar os testes E2E verifique se sua aplição está rodando corretamente.
```
npm run test:e2e
```