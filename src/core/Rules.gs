/** Règles métier pures, testables sans Google Workspace. */
function validateCompteRendu(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Compte rendu invalide');
  }
  const titre = String(payload.titre || '').trim();
  const instance = String(payload.instance || '').trim();
  const dateReunion = String(payload.dateReunion || '').trim();
  const synthese = String(payload.synthese || '').trim();
  if (!titre || titre.length > 150) throw new Error('Titre obligatoire (150 caractères max)');
  if (!instance || instance.length > 150) throw new Error('Instance obligatoire (150 caractères max)');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateReunion) ||
      Number.isNaN(Date.parse(dateReunion + 'T12:00:00Z')) ||
      new Date(dateReunion + 'T12:00:00Z').toISOString().slice(0,10) !== dateReunion) {
    throw new Error('Date de réunion invalide');
  }
  if (!synthese || synthese.length > 10000) throw new Error('Synthèse obligatoire (10000 caractères max)');
  return { titre: titre, instance: instance, dateReunion: dateReunion, synthese: synthese };
}

function compterActivite(comptesRendus) {
  if (!Array.isArray(comptesRendus)) throw new Error('Liste de comptes rendus invalide');
  const valides = comptesRendus.filter(function (r) { return r && r.statut === 'VALIDE'; });
  const instances = {};
  valides.forEach(function (r) {
    if (typeof r.instance === 'string' && r.instance.trim()) {
      const cle = r.instance.trim();
      instances[cle] = (instances[cle] || 0) + 1;
    }
  });
  return { comptesRendusValides: valides.length, parInstance: instances };
}
