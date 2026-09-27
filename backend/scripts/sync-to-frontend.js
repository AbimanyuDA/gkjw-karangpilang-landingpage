// Copies the current content into the frontend as its offline fallback,
// so the site still shows real info if the API is unreachable.
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { findAll } from '../src/services/content-repository.js'

const target = fileURLToPath(new URL('../../frontend/src/data/fallback-content.json', import.meta.url))

await writeFile(target, `${JSON.stringify(findAll(), null, 2)}\n`)
console.log(`Konten disalin ke ${target}`)
