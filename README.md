# Portfólio de QA — Gabriel de Faria

Este repositório reúne exercícios práticos de teste de software desenvolvidos durante meus estudos.

## O que este repositório demonstra

- **Testes manuais**: escrita de casos de teste estruturados (pré-condição, passos, dados de entrada, resultado esperado/obtido, status)
- **Testes exploratórios**: sessões documentadas com charter, notas, bugs encontrados e cobertura (Session-Based Test Management)
- **Testes de integração via API**: validação de fluxos entre módulos (autenticação, carrinho, cupom de desconto, checkout) usando Postman
- **Testes de integração front-end ↔ API**: uso do DevTools para confirmar que os valores exibidos na interface batem com o que a API retorna
- **Testes de regressão**: priorização e seleção de casos de teste com base em uma mudança/correção de bug
- **Validação de dados via SQL**: queries para confirmar, diretamente no banco, que os dados manipulados pela API estão corretos
- **Automação de testes com Playwright**: suíte de login automatizada (saucedemo.com) e automação de um bug real de validação, incluindo geração dinâmica de massa de dados e funções reutilizáveis

## Ferramentas utilizadas

- **Postman** — testes de API (requisições, autenticação JWT, assertions)
- **DBeaver** — consultas SQL em banco PostgreSQL
- **Swagger/OpenAPI** — leitura de documentação de API
- **Playwright** — automação de testes end-to-end (JavaScript)
- **DevTools** — investigação de requisições de rede e consistência front-end/API

## Projetos testados

- **E-commerce de treino**: aplicação com back-end em API REST (autenticação, produtos, carrinho e pedidos) e banco de dados PostgreSQL, rodando em containers Docker
- **[BugBank](https://bugbank.netlify.app/)**: aplicação bancária fictícia, usada para prática de testes exploratórios e automação sobre bugs de validação reais

## Estrutura do repositório

```
casos-de-teste/         → casos de teste de login e de integração (cupom/checkout)
sessoes-exploratorias/  → sessões de teste exploratório documentadas
regressao/              → suíte de regressão com priorização de casos
sql/                    → queries SQL usadas para validação de dados
bugbank/                → achados exploratórios e bug report do BugBank
automacao/              → testes automatizados com Playwright
```

## Destaques

- **TC-107**: identificação de uma falha real de validação (cupom aplicado em carrinho vazio) que uma correção reportada como concluída não havia resolvido — encontrado ao testar via API, um cenário que a interface não permitia simular diretamente.
- **BUG-001 (BugBank)**: falha crítica de validação (transferência aceita sem o dígito da conta), documentada manualmente e depois automatizada com Playwright, incluindo criação dinâmica de contas e extração de dados da tela.

## Sobre mim

Reforçando meus estudos na área de QA com foco em testes manuais, exploratórios, de integração e regressão, automação com Playwright, além de fundamentos de SQL e testes de API.
