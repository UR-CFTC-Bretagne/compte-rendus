const fs = require('node:fs');
const path = require('node:path');
const src = path.resolve(__dirname, '..', 'src');
const out = path.resolve(__dirname, '..', 'dist');
const wanted = [
  'Code.gs',
  'core/Rules.gs',
  'api/CompteRenduContract.gs',
  'integrations/GoogleFormsAdapter.gs',
  'integrations/FormsTrigger.gs',
  'repositories/SheetsCompteRenduRepository.gs',
  'modules/comptes-rendus/CompteRenduService.gs',
  'modules/rapports-activite/RapportService.gs',
  'Index.html',
  'appsscript.json'
];
fs.mkdirSync(out, { recursive: true });
for (const item of wanted) {
  const origin = path.join(src, item);
  if (!fs.existsSync(origin)) throw new Error('Source manquante : ' + item);
  const target = path.join(out, path.basename(item));
  fs.copyFileSync(origin, target);
}
console.log('Paquet Apps Script préparé dans dist/');
