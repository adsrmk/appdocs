import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const output = path.join(root, "docs", ".vitepress", "dist")

rmSync(output, { recursive: true, force: true })
mkdirSync(output, { recursive: true })

for (const entry of ["index.html", "en", "assets"]) {
  const source = path.join(root, entry)
  if (!existsSync(source)) {
    throw new Error(`Required site entry is missing: ${entry}`)
  }
  cpSync(source, path.join(output, entry), { recursive: true })
}

console.log(`Built static support site in ${path.relative(root, output)}`)
