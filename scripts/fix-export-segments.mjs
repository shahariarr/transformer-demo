/* Workaround for a Next.js static-export bug on Windows.
   The client router prefetches flat files such as `__next.services.$d$slug.__PAGE__.txt`,
   but on Windows the exporter writes them as nested folders
   (`__next.services\$d$slug\__PAGE__.txt`) because it only replaces "/" with ".".
   This flattens any such folders in out/ into the expected file names.
   On other platforms there is nothing to fix and the script does nothing. */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('out');

async function filesUnder(dir, rel = []) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await filesUnder(p, [...rel, e.name]));
    else out.push({ abs: p, rel: [...rel, e.name] });
  }
  return out;
}

async function walk(dir) {
  let fixed = 0;
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name);
    if (e.name.startsWith('__next.')) {
      for (const f of await filesUnder(p)) {
        await fs.rename(f.abs, path.join(dir, [e.name, ...f.rel].join('.')));
        fixed++;
      }
      await fs.rm(p, { recursive: true, force: true });
    } else {
      fixed += await walk(p);
    }
  }
  return fixed;
}

const fixed = await walk(OUT);
if (fixed) console.log(`fix-export-segments: flattened ${fixed} prefetch file(s) in out/`);
