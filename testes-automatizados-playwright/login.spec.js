import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
});

test('TC001 - Login com credenciais válidas', async ({ page }) => {
  
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);
});

test('TC002 - Login com senha invalida', async ({ page }) => {
  
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('senha_errada_123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('TC004 - Login com username inválido (não cadastrado)', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('teste01');
  await page.getByPlaceholder('Password').fill('teste01');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('TC005 - Login com username vazio', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('teste01');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('TC006 - Login com password vazio', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
});

test('TC007 - Login com username e password vazios', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('TC008 - Login com usuário bloqueado', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});
