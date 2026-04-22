# VulpineOS Documentation

Documentation site for [VulpineOS](https://github.com/VulpineOS/VulpineOS) — the operating system for AI browser agents.

**Live docs:** [docs.vulpineos.com](https://docs.vulpineos.com)

**Main site:** [vulpineos.com](https://vulpineos.com)

## Development

Use Node 22 LTS for local development. The repo pins `.nvmrc` to `22` and
`package.json` engines to `<25`. The docs build is clean under Node 22. Under
Node 25, even a clean-environment `npm run build` currently emits repeated
`--localstorage-file` warnings from the Next/Turbopack toolchain rather than
from tracked repo config.

```bash
npm install
npm run dev
```

## Playwright MCP smoke

The repo ships a repo-local smoke script for the local Playwright MCP:

- `scripts/playwright/smoke-docs.js`
- `scripts/playwright/capture-landing-fixtures.js`

Point these at a running docs server with `VULPINE_DOCS_SMOKE_URL`. `smoke-docs.js` writes a viewport screenshot to `/tmp/vulpineos-docs-smoke.png` by default. `capture-landing-fixtures.js` writes deterministic landing-page fixtures to `/tmp/vulpineos-landing-desktop.png` and `/tmp/vulpineos-landing-mobile.png` by default.

## Stack

- [Next.js](https://nextjs.org) 16
- [Nextra](https://nextra.site) 4
- Deployed on [Vercel](https://vercel.com)

## Content

33 MDX pages covering:
- 4 browser engine security phases
- 36 MCP browser, reliability, realism, and extension tools
- Web panel, TUI, remote access, Docker
- Token optimization, agent scripting, cost tracking
- Foxbridge CDP proxy integration
- Vulpine API reference and launch checklist
- SEO: sitemaps, OG images, JSON-LD, llms.txt
