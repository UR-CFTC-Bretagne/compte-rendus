/** Statistiques minimales calculées exclusivement sur les comptes rendus validés. */
function indicateursActiviteV1(records, selection) {
  if (!Array.isArray(records)) throw new Error('Enregistrements invalides');
  if (!selection || !selection.structureId || !selection.debut || !selection.fin) throw new Error('Périmètre incomplet');
  if (selection.debut > selection.fin) throw new Error('Période incorrecte');
  var admissibles = records.filter(function (r) {
    return r && r.statut === 'VALIDE' && r.structureId === selection.structureId &&
      typeof r.dateReunion === 'string' && r.dateReunion >= selection.debut &&
      r.dateReunion <= selection.fin;
  });
  return {
    schemaVersion: '1.0',
    structureId: selection.structureId,
    periode: { debut: selection.debut, fin: selection.fin },
    comptesRendusValides: admissibles.length,
    parInstance: compterActivite(admissibles).parInstance
  };
}
