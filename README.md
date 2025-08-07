
# Teste Outsera Front-end - Dashboard Angular - Golden Raspberry Awards
Interface para possibilitar a leitura da lista de indicados e vencedores da
categoria Pior Filme do Golden Raspberry Awards

## Descritivo dos requisitos
- A aplicação deverá ser composta por 2 páginas:
    - Dashboard com 4 tabelas de dados: 
        - Lista de anos com múltiplos vencedores
        - Top 3 estudios vencedores
        - Produtores com o maior e menor interválo entre vitórias
        - Lista de filmes vencedores por ano
    - Lista de todos os filmes com filtro por Ano e Vencedor (Sim/Não)
- A página deve possuir um menu com links para as duas páginas
- Os dados serão obtidos através de uma API disponibilizada previamente

## Stack
- Frameworks: Angular / Angular Material

## Pré-requisitos para execução
- NodeJS v18 ou maior
- Angular v19.x.x

## Estrutura de pastas
- `/public`  Pasta com os arquivos públicos do projeto, como imagens, icones, etc
- `/src`  Código fonte do projeto
    - `/app/features`  Pasta com os módulos do projeto, separado por domínio
    - `/app/shared`  Módulos compartilhados entre a aplicação, como serviços, componentes e modelos
        - `/components`  Componentes reutilizaveis em toda a aplicação
        - `/models`  Arquivos com definição de interfaces (models) para os objetos utilizados na programação
        - `/services`  Arquivos que possuem tratamento de dados da API

## Execução do projeto
1. Instalar as dependências do projeto usando o NPM:
```bash
npm install
```

2. Iniciar o projeto:
```bash
ng serve
```

3. Após rodar o projeto, abra o navegador e acesse o link `http://localhost:4200/`.


## Testes unitários
Os testes garantem que a aplicação recebéra os dados corretamente da API, no formato esperado, e que a página carregará as tabelas e componentes necessários.

Para rodar os testes, execute o comando abaixo:
```bash
npm test
```