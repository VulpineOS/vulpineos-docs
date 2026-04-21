# VulpineOS Documentation

Documentation site for [VulpineOS](https://github.com/VulpineOS/VulpineOS) — the operating system for AI browser agents.

**Live docs:** [docs.vulpineos.com](https://docs.vulpineos.com)

**Main site:** [vulpineos.com](https://vulpineos.com)

## Development

Use Node 22 LTS for local development. The docs build is clean under Node 22 and currently emits repeated `--localstorage-file` warnings under Node 25.

```bash
npm install
npm run dev
```

## Playwright MCP smoke

The repo ships a repo-local smoke script for the local Playwright MCP:

- `scripts/playwright/smoke-docs.js`

Point it at a running docs server with `VULPINE_DOCS_SMOKE_URL` and, if needed, override the screenshot destination with `VULPINE_DOCS_SMOKE_SCREENSHOT`. By default it writes a viewport screenshot to `/tmp/vulpineos-docs-smoke.png`.

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
