import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const vulpineosRoot = join(root, '..', 'VulpineOS')

function fail(message) {
  failures.push(message)
}

function read(path) {
  return readFileSync(join(root, path), 'utf8')
}

function walk(dir, suffix, out = []) {
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const rel = join(dir, entry.name)
    if (entry.isDirectory()) walk(rel, suffix, out)
    else if (entry.name.endsWith(suffix)) out.push(rel)
  }
  return out
}

function command(cmd, args, cwd = root) {
  return execFileSync(cmd, args, { cwd, encoding: 'utf8' }).trim()
}

const failures = []
const mdxPages = walk('content', '.mdx')
const packageCount = command('go', ['list', './cmd/...', './internal/...'], vulpineosRoot).split('\n').filter(Boolean).length
const mcpSource = [
  readFileSync(join(vulpineosRoot, 'internal/mcp/tools.go'), 'utf8'),
  readFileSync(join(vulpineosRoot, 'internal/mcp/extension_tools.go'), 'utf8'),
].join('\n')
const mcpTools = new Set([...mcpSource.matchAll(/Name:\s+"(vulpine_[^"]+)"/g)].map(match => match[1]))
const panelAPI = readFileSync(join(vulpineosRoot, 'internal/remote/api.go'), 'utf8')
const handleMessageBody = panelAPI.slice(
  panelAPI.indexOf('func (api *PanelAPI) HandleMessage'),
  panelAPI.indexOf('// ---------------------------------------------------------------------------\n// Agent management'),
)
const panelMessages = new Set([...handleMessageBody.matchAll(/case "([^"]+)":/g)].map(match => match[1]))

const required = [
  'content/api-features.mdx',
  'content/api-reference.mdx',
  'content/source-availability.mdx',
  'content/launch-checklist.mdx',
  'content/mcp-tools.mdx',
  'content/web-panel.mdx',
  'public/llms.txt',
  'public/llms-full.txt',
]

for (const file of required) {
  if (!existsSync(join(root, file))) fail(`missing required file: ${file}`)
}

const allDocs = [
  ...mdxPages.map(read),
  read('README.md'),
  read('public/llms.txt'),
  read('public/llms-full.txt'),
].join('\n')

const stalePatterns = [
  /24 packages/,
  /36 packages/,
  /34 browser tools/,
  /275\+ Go tests/,
  /10-page dashboard/,
]

for (const pattern of stalePatterns) {
  if (pattern.test(allDocs)) fail(`stale docs pattern remains: ${pattern}`)
}

if (!allDocs.includes(`${packageCount} packages`)) {
  fail(`docs do not mention current Go package count: ${packageCount}`)
}

if (!allDocs.includes(`${mcpTools.size} tools`)) {
  fail(`docs do not mention current MCP tool count: ${mcpTools.size}`)
}

if (!read('content/web-panel.mdx').includes(`${panelMessages.size} control message types`)) {
  fail(`web panel docs do not mention current control message count: ${panelMessages.size}`)
}

const sitemap = read('app/sitemap.ts')
for (const route of ['/api-reference', '/source-availability', '/launch-checklist']) {
  if (!sitemap.includes(route)) fail(`sitemap missing ${route}`)
}

const meta = read('content/_meta.js')
for (const key of ['api-reference', 'source-availability', 'launch-checklist']) {
  if (!meta.includes(key)) fail(`navigation metadata missing ${key}`)
}

console.log(JSON.stringify({
  ok: failures.length === 0,
  mdxPages: mdxPages.length,
  goPackages: packageCount,
  mcpTools: mcpTools.size,
  panelMessages: panelMessages.size,
  failures,
}, null, 2))

if (failures.length) process.exit(1)
