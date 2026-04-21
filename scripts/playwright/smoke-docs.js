async (page) => {
  const env = typeof process !== 'undefined' && process?.env ? process.env : {}
  const baseURL = env.VULPINE_DOCS_SMOKE_URL || 'http://127.0.0.1:3000'
  const screenshotPath =
    env.VULPINE_DOCS_SMOKE_SCREENSHOT || '/tmp/vulpineos-docs-smoke.png'

  await page.setViewportSize({ width: 1440, height: 960 })
  await page.goto(baseURL, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle')

  await page.getByRole('heading', { name: /The runtime built/i }).waitFor()
  await page.getByRole('link', { name: /^API Docs$/i }).first().waitFor()
  await page.getByRole('link', { name: /Get Started/i }).first().waitFor()
  await page.getByRole('link', { name: /Read the docs/i }).first().waitFor()

  const title = await page.title()
  if (!title.includes('VulpineOS')) {
    throw new Error(`unexpected docs title: ${title}`)
  }

  await page.locator('main').screenshot({ path: screenshotPath })

  return {
    ok: true,
    page: 'docs',
    title,
    url: page.url(),
    screenshotPath,
  }
}
