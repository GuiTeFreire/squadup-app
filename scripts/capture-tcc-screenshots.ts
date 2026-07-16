/**
 * Captura screenshots das telas do app para o TCC (Trilha D, plano-de-entrega.md §5.1).
 * Roda contra `npm run web` (react-native-web) via Playwright, login real contra a API
 * (EXPO_PUBLIC_API_URL do .env local). Salva em tcc/assets/app/*.png, viewport 393x852.
 *
 * Uso: npx playwright test scripts/capture-tcc-screenshots.ts --config=scripts/playwright.config.ts
 * Pré-requisito: `npm run web` já rodando em http://localhost:8081 e um backend acessível
 * com o usuário de teste abaixo já cadastrado (ver `.status/queue.md`, sessão 28).
 */
import { expect, test } from "@playwright/test";

const BASE_URL = "http://localhost:8081";
const OUT_DIR = "tcc/assets/app";

const TEST_EMAIL = process.env.TCC_SCREENSHOT_EMAIL ?? "screenshots.tcc@squadup.dev";
const TEST_PASSWORD = process.env.TCC_SCREENSHOT_PASSWORD;

if (!TEST_PASSWORD) {
  throw new Error(
    "Defina TCC_SCREENSHOT_PASSWORD com a senha do usuário de teste antes de rodar este script."
  );
}

async function shot(page: import("@playwright/test").Page, name: string) {
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT_DIR}/${name}.png` });
}

test.describe.configure({ mode: "serial" });

test("captura telas principais do app", async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page.getByText("Conecte-se. Jogue. Repita.")).toBeVisible({ timeout: 20000 });
  await shot(page, "welcome");

  await page.getByRole("button", { name: "Já tenho conta" }).click();
  await expect(page.getByText("Bem-vindo de volta")).toBeVisible({ timeout: 10000 });
  await shot(page, "login");

  await page.getByLabel("E-mail").fill(TEST_EMAIL);
  await page.getByLabel("Senha").fill(TEST_PASSWORD);
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page.getByText("Partidas próximas")).toBeVisible({ timeout: 20000 });
  await shot(page, "feed-principal");

  await page.getByRole("button", { name: "Abrir filtros" }).click();
  await expect(page.getByText("Filtros", { exact: true })).toBeVisible();
  await shot(page, "filtros");
  await page.getByRole("button", { name: "Fechar filtros" }).click();

  const firstMatchCard = page.locator('[role="button"]').filter({ hasText: "vagas" }).first();
  await firstMatchCard.click();
  await expect(page.getByText("Detalhes da partida")).toBeVisible({ timeout: 10000 });
  await shot(page, "detalhes-partida");

  const chatButton = page.getByRole("button", { name: "Chat da partida" });
  if (await chatButton.isVisible().catch(() => false)) {
    await chatButton.click();
    await expect(page.getByPlaceholder(/mensagem/i)).toBeVisible({ timeout: 10000 });
    await shot(page, "chat-partida");
  }

  await page.goto(BASE_URL);
  await expect(page.getByText("Partidas próximas")).toBeVisible({ timeout: 20000 });

  await page.getByText("Criar", { exact: true }).click();
  await expect(page.getByText("Criar Partida", { exact: true })).toBeVisible({ timeout: 10000 });
  await shot(page, "criar-partida");

  await page.getByText("Perfil", { exact: true }).click();
  await page.waitForTimeout(800);
  await shot(page, "perfil");
});
