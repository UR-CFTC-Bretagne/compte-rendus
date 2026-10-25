const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const out = path.join(root, 'dist');
const wanted = [
  'Code.gs',
  'core/Rules.gs',
  'Index.html',
  'appsscript.json'
];
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const item of wanted) {
  const origin = path.join(src, item);
  if (!fs.existsSync(origin)) throw new Error('Source manquante: ' + item);
  const name = path.basename(item);
  if (fs.existsSync(path.join(out, name))) throw new Error('Nom dupliqué: ' + name);
  fs.copyFileSync(origin, path.join(out, name));
}
console.log('Compilation Apps Script terminée dans dist/');
