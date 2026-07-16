import fs from 'node:fs'
import vm from 'node:vm'

for (const locale of ['nl', 'en']) {
  const sandbox = { window: {} }
  vm.createContext(sandbox)
  vm.runInContext(fs.readFileSync(new URL(`../assets/js/content.${locale}.js`, import.meta.url), 'utf8'), sandbox)
  const data = sandbox.window.HeursSupportData
  if (data.categories.length !== 6) throw new Error(`${locale}: expected 6 categories`)
  if (data.articles.length !== 15) throw new Error(`${locale}: expected 15 articles`)
  if (!data.articles.every((article) => article.title && article.description && article.body)) throw new Error(`${locale}: incomplete article`)
}

for (const file of ['index.html', 'en/index.html']) {
  const html = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
  if (!html.includes('class="docs-sidebar"')) throw new Error(`${file}: sidebar missing`)
  if (!html.includes('id="sidebar-navigation"')) throw new Error(`${file}: sidebar navigation missing`)
}

console.log('Validated Dutch and English support sites with 6 categories and 15 articles each.')
