import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const generatedDir = new URL('../generated/prisma', import.meta.url).pathname;

function walk(dir: string) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (extname(full) === '.ts') {
      let content = readFileSync(full, 'utf-8');
      const original = content;
      content = content.replace(
        /from\s+['"](\.\.?\/[^'"]+)\.js['"]/g,
        (match, path) => `from '${path}.ts'`,
      );
      if (content !== original) {
        writeFileSync(full, content, 'utf-8');
        console.log(`  Patched: ${full}`);
      }
    }
  }
}

console.log('Fixing Prisma imports…');
walk(generatedDir);
console.log('Done.');
