# Cypress + Sauce Demo — Testes E2E

Projeto de estudo de automação de testes com **Cypress**, aplicado ao site de demonstração [saucedemo.com](https://www.saucedemo.com), uma loja online feita para prática de QA.

## O que é testado

| Arquivo | Cenário | O que verifica |
|---|---|---|
| `login.cy.js` | Login com usuário válido | Após entrar, a página "Products" fica visível |
| `login.cy.js` | Login com usuário bloqueado (`locked_out_user`) | A mensagem de erro de usuário bloqueado é exibida |
| `compra.cy.js` | Adicionar mochila ao carrinho | O contador do carrinho mostra `1` |
| `compra.cy.js` | Finalizar compra completa | A mensagem "Thank you for your order!" fica visível |

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar todos os testes no terminal
npm test

# 3. Ou abrir a interface interativa do Cypress
npm run cy:open
```

## Estrutura do projeto

```
cypress/
  e2e/          # arquivos de teste (login.cy.js, compra.cy.js)
  fixtures/     # dados de apoio
  support/      # comandos e configurações globais
cypress.config.js
package.json
```

## Boas práticas aplicadas

- **Seletores estáveis:** uso dos atributos `data-test` em vez de classes ou textos que mudam com facilidade.
- **Testes independentes:** cada `it` funciona sozinho, sem depender do resultado de outro teste.
- **`beforeEach` para preparação:** a visita à página (e o login, nos testes de compra) fica fora dos testes, evitando repetição.
- **Toda verificação usa `.should()`:** nenhum teste termina sem checar um resultado.

## Próximos passos

- Mais cenários de login (senha inválida, campos vazios, usuário com bug visual).
- Comandos customizados em `cypress/support/commands.js` (por exemplo, um `cy.login()`).
- Configurar `baseUrl` no `cypress.config.js`.

## Tecnologias

Cypress · JavaScript · Node.js
