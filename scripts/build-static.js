const { cpSync, mkdirSync, readdirSync, rmSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const dist = join(root, 'dist');

rmSync(dist, { force: true, recursive: true });
mkdirSync(dist, { recursive: true });

for (const file of readdirSync(root).filter((name) => name.endsWith('.html'))) {
  cpSync(join(root, file), join(dist, file));
}

cpSync(join(root, 'mobile-menu.js'), join(dist, 'mobile-menu.js'));
cpSync(join(root, 'css'), join(dist, 'css'), { recursive: true });
cpSync(join(root, 'images'), join(dist, 'images'), { recursive: true });
