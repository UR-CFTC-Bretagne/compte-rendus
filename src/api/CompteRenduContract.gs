/** Contrat métier interne v1.0 ; aucune donnée externe non vérifiée ne fait autorité. */
var MANDATCR_SCHEMA_VERSION = '1.0';
function normaliserSoumissionCompteRendu(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Soumission invalide');
  var source = String(input.source || '');
  if (source !== 'google_forms') throw new Error('Source non prise en charge');
  var formId = String(input.formId || '').trim();
  var responseId = String(input.responseId || '').trim();
  if (!formId || !responseId || formId.length > 300 || responseId.length > 300) throw new Error('Source sans identifiant stable');
  var fields = validateCompteRendu(input.fields);
  return {
    schemaVersion: MANDATCR_SCHEMA_VERSION,
    source: source,
    sourceKey: formId + ':' + responseId,
    formId: formId,
    sourceResponseId: responseId,
    titre: fields.titre,
    instance: fields.instance,
    dateReunion: fields.dateReunion,
    synthese: fields.synthese,
    statut: 'SOUMIS'
  };
}
