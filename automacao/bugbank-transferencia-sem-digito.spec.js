import { test, expect } from '@playwright/test';

test.use({ launchOptions: { slowMo: 1000 } });

/**
 * Cria uma conta no BugBank.
 * @param {import('@playwright/test').Page} page
 * @param {string} email
 * @param {string} nome
 * @param {boolean} comSaldo - se true, ativa o toggle "Criar conta com saldo?"
 *   Obs: o toggle mantém o estado da conta anterior (não reseta sozinho),
 *   então só deve receber "true" quando for necessário MUDAR o estado atual.
 */
async function cadastrarConta(page, email, nome, comSaldo) {
  await page.getByRole('button', { name: 'Registrar' }).click();
  const registerForm = page.locator('form').filter({ hasText: 'Cadastrar' });
  await registerForm.getByPlaceholder('Informe seu e-mail').fill(email);
  await registerForm.getByPlaceholder('Informe seu Nome').fill(nome);
  await registerForm.getByPlaceholder('Informe sua senha').fill('feto123');
  await registerForm.getByPlaceholder('Informe a confirmação da senha').fill('feto123');

  if (comSaldo) {
    await page.locator('#toggleAddBalance').click();
  }

  await page.getByRole('button', { name: 'Cadastrar' }).click();
}

test('BUG-001 - Sistema permite realizar transferência sem informar o dígito da conta', async ({ page }) => {
  await page.goto('https://bugbank.netlify.app/');

  // Cria a conta de origem, com saldo
  await cadastrarConta(page, 'feterson01@gmail.com', 'Feterson', true);
  await page.locator('#btnCloseModal').click();

  // Cria a conta de destino (toggle já está ativo, não precisa clicar de novo)
  await cadastrarConta(page, 'feterson22@gmail.com', 'Feterson22', false);

  // Extrai o número da conta de destino a partir da mensagem do modal
  // (ex: "A conta 271-0 foi criada com sucesso")
  const mensagem = await page.locator('#modalText').textContent();
  const palavras = mensagem.split(' ');
  const contaCompleta = palavras[2];
  const partesConta = contaCompleta.split('-');
  const numeroConta = partesConta[0];
  await page.locator('#btnCloseModal').click();

  // Login com a conta de origem
  const loginForm = page.locator('form').filter({ hasText: 'Acessar' });
  await loginForm.getByPlaceholder('Informe seu e-mail').fill('feterson01@gmail.com');
  await loginForm.getByPlaceholder('Informe sua senha').fill('feto123');
  await page.getByRole('button', { name: 'Acessar' }).click();

  // Tenta transferir para a conta de destino, sem informar o dígito
  await page.locator('#btn-TRANSFERÊNCIA').click();
  await page.getByPlaceholder('Informe o número da conta').fill(numeroConta);
  await page.getByPlaceholder('Informe o dígito da conta').fill(''); // dígito propositalmente vazio
  await page.getByPlaceholder('Informe o valor da transferência').fill('100');
  await page.getByPlaceholder('Informe uma descrição').fill('');
  await page.getByRole('button', { name: 'Transferir agora' }).click();

  // Bug: o sistema aceita a transferência mesmo sem o dígito da conta
  await expect(page.getByText('Transferencia realizada com sucesso')).toBeVisible();
});
