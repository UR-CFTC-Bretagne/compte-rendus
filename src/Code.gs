/** Point d'entrée Apps Script : vitrine de démonstration, non connectée aux données réelles. */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('MANDAT’CR CFTC — Démonstration');
}

function verifierCompteRenduExemple(donnees) {
  return validateCompteRendu(donnees);
}

function obtenirIndicateursExemple() {
  return compterActivite([
    { instance: 'CESER', statut: 'VALIDE' },
    { instance: 'CESER', statut: 'BROUILLON' },
    { instance: 'CARSAT', statut: 'VALIDE' }
  ]);
}
