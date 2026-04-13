import type { MetadataRoute } from 'next'

const BASE_URL = 'https://docs.vulpineos.com'

const pages = [
  '', // index
  '/getting-started',
  '/architecture',
  '/building',
  '/injection-filter',
  '/action-lock',
  '/optimized-dom',
  '/trust-warming',
  '/mcp-tools',
  '/api-features',
  '/api-reference',
  '/source-availability',
  '/launch-checklist',
  '/tui',
  '/web-panel',
  '/remote',
  '/docker',
  '/security-features',
  '/token-optimization',
  '/agent-scripting',
  '/agent-communication',
  '/cost-tracking',
  '/foxbridge',
  '/foxbridge/quick-start',
  '/foxbridge/cdp-coverage',
  '/foxbridge/event-translation',
  '/foxbridge/bidi-backend',
  '/foxbridge/cli-reference',
  '/contributing',
  '/ai-browser-agent-security',
  '/prevent-prompt-injection',
  '/openclaw-camoufox-setup',
  '/camoufox-vs-chrome',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(page => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'weekly' : 'monthly',
    priority: page === '' ? 1.0 : page === '/getting-started' ? 0.9 : 0.7,
  }))
}
