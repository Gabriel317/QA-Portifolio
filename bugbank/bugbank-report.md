# Bug Report — BugBank

Achados de uma sessão de teste exploratório na aplicação [BugBank](https://bugbank.netlify.app/), focada na funcionalidade de Transferência.

## Achados da sessão exploratória

| Achado | Categoria | Severidade |
|---|---|---|
| Transferência sem dígito da conta é aceita | Falha de validação | **Crítica** |
| Transferência sem número de conta é aceita | Falha de validação | Alta |
| Valor acima do saldo disponível é bloqueado corretamente | ✅ Funciona bem | — |
| Campo de valor aceita caracteres inválidos (ex: "+100") | Falha de validação de entrada | Média/Alta |
| Transferir R$ 0 é bloqueado corretamente | ✅ Funciona bem | — |
| Transferir sem informar valor expõe erro técnico cru (`NaN`) | Erro de tratamento/exposição técnica | Média |
| Extrato exibe R$ 0,00 após transferência sem conta/dígito, mas o saldo é debitado de verdade | Inconsistência de dados | **Crítica** |

---

## BUG-001 — Sistema permite realizar transferência sem informar o dígito da conta

**Passos para reproduzir:**
1. Realizar login com usuário com saldo
2. Clicar em "Transferência"
3. Preencher o campo Número da conta
4. Deixar o campo Dígito vazio
5. Preencher um valor válido, dentro do saldo disponível, no campo Valor da transferência
6. Preencher ou não o campo Descrição
7. Clicar em "Transferir agora"

**Resultado obtido:** A transferência é aceita e processada mesmo sem informar o dígito da conta.

**Resultado esperado:** O sistema deve exigir o preenchimento do dígito da conta antes de permitir a realização da transferência, impedindo a conclusão da operação enquanto o campo obrigatório não for informado.

**Severidade:** Crítica

---

## Automação (Playwright)

Ver [`bugbank-transferencia-sem-digito.spec.js`](../automacao/bugbank-transferencia-sem-digito.spec.js).

O teste automatiza o cenário completo:
1. Cria duas contas via UI (origem, com saldo, e destino), usando uma função reutilizável (`cadastrarConta`)
2. Extrai dinamicamente o número da conta de destino a partir do texto do modal de confirmação (`.split()`)
3. Realiza login com a conta de origem
4. Tenta transferir para a conta de destino sem informar o dígito
5. Confirma, via assertion, que o sistema aceita indevidamente a transferência (reproduzindo o bug)

**Observações técnicas resolvidas durante a automação:**
- Uso de encadeamento de locators (`page.locator('form').filter({ hasText: '...' })`) para diferenciar formulários de login e cadastro que coexistem na mesma página
- Instabilidade de clique específica do navegador WebKit, contornada limitando a execução ao Chromium (`--project=chromium`)
- O toggle "Criar conta com saldo?" mantém o estado entre cadastros consecutivos (não reseta sozinho) — tratado com um parâmetro booleano na função de cadastro
