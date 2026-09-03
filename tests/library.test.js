import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..', '..')
const readJson = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const catalog = readJson('library/assets/catalog.json')
const aliases = readJson('library/assets/icon-aliases.json')
const userIcons = readJson('library/assets/user-icons.json')
const docs = fs.readFileSync(path.join(root, 'web-docs/src/routes/+layout.svelte'), 'utf8') + fs.readFileSync(path.join(root, 'web-docs/src/routes/+page.svelte'), 'utf8')
const index = fs.readFileSync(path.join(root, 'web-docs/src/app.html'), 'utf8')
const pkg = readJson('library/package.json')

const hashTree = dir => {
  const files = []
  const walk = d => {
    for (const name of fs.readdirSync(d)) {
      const full = path.join(d, name)
      const stat = fs.statSync(full)
      if (stat.isDirectory()) walk(full)
      else if (name.endsWith('.svg')) files.push(full)
    }
  }
  walk(dir)
  files.sort()
  return files.map(file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')).join(':')
}

test('catalog contains unique logical icons', () => {
  const keys = catalog.map(i => `${i.category}/${i.name}`)
  assert.equal(new Set(keys).size, keys.length)
  assert.ok(catalog.length >= 50)
})

test('catalog has no duplicate asset trees', () => {
  const seen = new Map()
  for (const item of catalog) {
    const dir = path.join(root, 'library/assets/icons', item.category, item.name)
    const fingerprint = hashTree(dir)
    assert.ok(!seen.has(fingerprint), `${item.category}/${item.name} duplicates ${seen.get(fingerprint)}`)
    seen.set(fingerprint, `${item.category}/${item.name}`)
  }
})

test('every catalog source variant points to a real SVG', () => {
  for (const item of catalog) {
    for (const source of item.sources) {
      for (const variant of source.variants ?? []) {
        const file = source.id === 'community'
          ? `library/assets/icons/${item.category}/${item.name}/${variant}.svg`
          : `library/assets/icons/${item.category}/${item.name}/sources/${source.id}/${variant}.svg`
        assert.ok(fs.existsSync(path.join(root, file)), `${file} is missing`)
      }
    }
  }
})

test('aliases are unique and point at canonical icons', () => {
  const seen = new Set()
  for (const alias of aliases) {
    const key = `${alias.category}/${alias.name}`
    assert.equal(seen.has(key), false, `duplicate alias ${key}`)
    seen.add(key)
    assert.ok(catalog.some(i => i.category === alias.category && i.name === alias.canonical), `missing canonical ${alias.category}/${alias.canonical}`)
    assert.notEqual(alias.name, alias.canonical)
  }
})

test('user icon metadata no longer contains duplicate logical entries', () => {
  const keys = userIcons.map(i => `${i.category}/${i.name}`)
  assert.equal(new Set(keys).size, keys.length)
})

test('Tailwind v4 and GSAP are configured', () => {
  assert.match(index, /gsap@3\.13\.0\/dist\/gsap\.min\.js/)
  assert.match(index, /%sveltekit\.head%/)
  assert.equal(fs.existsSync(path.join(root, 'web-docs/src/docs.css')), false)
})

test('requested navigation and responsive behavior are present', () => {
  assert.match(docs, /fixed inset-x-0 top-0/)
  assert.match(docs, /max-w-3xl|max-w-2xl|max-w-4xl/)
  assert.match(docs, /lg:pt-32/)
  assert.match(docs, /CTRL \+ K/)
  assert.match(docs, /Github/)
  assert.match(docs, /border-b-2 border-transparent/)
  assert.match(docs, /text-islamic-green/)
  assert.match(docs, /donations/)
  assert.match(docs, /mobileOpen/)
  assert.match(docs, /searchOpen/)
  assert.match(docs, /drawerName/)
  assert.doesNotMatch(docs, /⌘ K/)
  assert.doesNotMatch(docs, /Erbasaran glyph entries/)
  assert.doesNotMatch(docs, /API endpoint/)
  assert.match(docs, /border-y border-islamic-line/)
  assert.match(docs, /Framework-agnostic Islamic SVG\/WebP icons, organized for real projects\.<\/p>/)
  assert.doesNotMatch(docs, /mt-3 max-w-xs text-\[11px\] leading-6 text-islamic-dim/)
})



test('generated package entrypoints contain only resolvable local assets', () => {
  for (const file of fs.readdirSync(path.join(root, 'library/packages/core')).filter(f => f.endsWith('.js'))) {
    const text = fs.readFileSync(path.join(root, 'library/packages/core', file), 'utf8')
    for (const match of text.matchAll(/new URL\(([^,]+), import.meta.url\)/g)) {
      const asset = JSON.parse(match[1])
      assert.ok(fs.existsSync(path.join(root, 'library/packages/core', asset.slice(2))), `${file}: missing ${asset}`)
    }
  }
})

test('Google Material import path is explicit and license-aware', () => {
  const google = readJson('library/assets/external-sources.json').find(s => s.name === 'Google Material Icons')
  assert.ok(google)
  assert.equal(google.license, 'Apache-2.0')
  assert.match(fs.readFileSync(path.join(root, 'library/scripts/import-google.ts'), 'utf8'), /google\/material-design-icons/)
  assert.equal(pkg.scripts['icons:import:google'], 'bun scripts/import-google.ts')
})

test('package scripts preserve the Bun build pipeline and add TDD checks', () => {
  assert.equal(pkg.scripts.test, 'node --test')
  assert.equal(pkg.scripts['icons:catalog'], 'bun scripts/build-catalog.ts')
  assert.equal(pkg.scripts['icons:package'], 'bun scripts/build-package.ts')
  assert.equal(pkg.scripts['icons:validate'], 'bun scripts/validate-icons.ts')
  assert.match(pkg.scripts.prepublishOnly, /bun run icons:catalog/)
  assert.match(pkg.scripts.prepublishOnly, /bun run icons:package/)
  assert.match(pkg.scripts.prepublishOnly, /bun run icons:validate/)
  assert.match(pkg.scripts.prepublishOnly, /bun run build/)
})


test('search modal regression is centered with 40% opacity and 4px blur', () => {
  assert.match(docs, /bg-black\/40 px-4 backdrop-blur-\[4px\]/)
  assert.doesNotMatch(docs, /place-items-start bg-black\/70/)
})

test('hero title restores original sizing and copy', () => {
  assert.match(docs, /text-\[clamp\(54px,6\.6vw,96px\)\]/)
  assert.match(docs, /Islamic icons for the modern web\./)
})

test('donation page, README policy, and transparency document exist', () => {
  const donationsPage = fs.readFileSync(path.join(root, 'web-docs/src/routes/donations/+page.svelte'), 'utf8')
  assert.match(donationsPage, /buymeacoffee\.com\/rheinsullivan/)
  assert.match(donationsPage, /100% financial transparency/)
  assert.match(donationsPage, /70%/)
  assert.match(donationsPage, /At least seventy percent/)
  assert.match(donationsPage, /30%/)
  assert.match(donationsPage, /Only what keeps the library running|Only infrastructure required/)
  assert.match(donationsPage, /Low-income families/)
  assert.match(donationsPage, /Orphanage care/)
  assert.match(donationsPage, /Elderly care/)
  assert.match(donationsPage, /Palestine 🇵🇸 relief/)
  assert.match(donationsPage, /Disaster relief/)
  assert.match(fs.readFileSync(path.join(root, 'library/docs/en/donations.md'), 'utf8'), /Donations & Humanitarian/)
  assert.ok(fs.existsSync(path.join(root, 'library/docs/en/donations.md')))
})


test('Web Docs and library are physically separated', () => {
  assert.equal(fs.existsSync(path.join(root, 'index.html')), false)
  assert.ok(fs.existsSync(path.join(root, 'web-docs/src/app.html')))
  assert.ok(fs.existsSync(path.join(root, 'web-docs/src/routes/+layout.svelte')))
  assert.ok(fs.existsSync(path.join(root, 'library/assets/catalog.json')))
  assert.ok(fs.existsSync(path.join(root, 'library/packages/core/package.json')))
  assert.ok(fs.existsSync(path.join(root, 'web-docs/src/lib/assets/logo-islamic-icons.svg')))
})

test('logo metadata and required usage syntax are present', () => {
  assert.match(fs.readFileSync(path.join(root, 'web-docs/src/app.html'), 'utf8'), /og:image/)
  const layoutContent = fs.readFileSync(path.join(root, 'web-docs/src/routes/+layout.svelte'), 'utf8')
  const pageContent = fs.readFileSync(path.join(root, 'web-docs/src/routes/+page.svelte'), 'utf8')
  assert.match(layoutContent + pageContent, /logo-islamic-icons\.svg/)
  const docsText = layoutContent + pageContent
  assert.ok(docsText.includes('Islamic Icons'))
  assert.ok(fs.existsSync(path.join(root, 'library/assets/metadata.json')))
})

test('installation docs cover Bun npm pnpm and Yarn', () => {
  const text = fs.readFileSync(path.join(root, 'library/docs/en/installation.md'), 'utf8')
  for (const cmd of ['bun add @rhein.sullivan/islamic-icons', 'npm install @rhein.sullivan/islamic-icons', 'pnpm add @rhein.sullivan/islamic-icons', 'yarn add @rhein.sullivan/islamic-icons']) assert.match(text, new RegExp(cmd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
})

test('no em dash remains in UI and project documentation', () => {
  for (const file of ['web-docs/src/app.html', 'web-docs/src/routes/+layout.svelte', 'web-docs/src/routes/+page.svelte', 'library/docs/README.md', 'library/assets/external-sources.json']) {
    assert.doesNotMatch(fs.readFileSync(path.join(root, file), 'utf8'), /-/)
  }
})


test('uploaded numeric icons are semantically renamed, categorized, and deduplicated', () => {
  const imported = readJson('library/assets/community-upload.json')
  const numeric = fs.readdirSync(path.join(root, 'library/assets/icons')).flatMap(cat => fs.readdirSync(path.join(root, 'library/assets/icons', cat)).map(name => `${cat}/${name}`))
  for (const item of Object.values(imported)) {
    assert.match(item.name, /^[a-z][a-z0-9-]*$/)
    assert.ok(fs.existsSync(path.join(root, 'library/assets/icons', item.category, item.name, 'sources/community-upload/original.svg')))
  }
  assert.equal(new Set(catalog.map(i => `${i.category}/${i.name}`)).size, catalog.length)
  assert.equal(numeric.some(k => /\/\d+($|\/)/.test(k)), false)
})

test('donation allocation is editorial rather than card-based', () => {
  const donationsContent = fs.readFileSync(path.join(root, 'web-docs/src/routes/donations/+page.svelte'), 'utf8')
  assert.match(donationsContent, /border-y border-islamic-line/)
  assert.doesNotMatch(donationsContent, /rounded-3xl border border-islamic-line bg-islamic-panel/)
})


test('requested repository separation and documentation sidebar', () => {
  assert.equal(fs.existsSync(path.join(root, 'docs')), false)
  assert.ok(fs.existsSync(path.join(root, 'web-docs/src/app.html')))
  assert.ok(fs.existsSync(path.join(root, 'library/package.json')))
  assert.ok(fs.existsSync(path.join(root, 'library/docs/en/donations.md')))
  assert.match(docs, /border-b-2 border-transparent/)
  assert.match(docs, /size-10 shrink-0/)
  const donationsPage = fs.readFileSync(path.join(root, 'web-docs/src/routes/donations/+page.svelte'), 'utf8')
  assert.match(donationsPage, /70%/)
  assert.match(donationsPage, /30%/)
})
