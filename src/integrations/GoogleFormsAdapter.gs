/**
 * Transforme une soumission Apps Script FormApp en DTO indépendant du fournisseur.
 * Le mapping s'effectue sur les ID d'items Google Forms, jamais sur leurs libellés.
 * email et mandat déclarés sont des données NON fiables, pas une preuve d'identité.
 */
function adapterReponseGoogleForms(formResponse, config) {
  if (!formResponse || typeof formResponse.getId !== 'function') throw new Error('Réponse FormApp attendue');
  if (!config || !config.formId || !config.fields) throw new Error('Configuration du formulaire incomplète');
  var values = {};
  formResponse.getItemResponses().forEach(function (answer) {
    values[String(answer.getItem().getId())] = answer.getResponse();
  });
  var f = config.fields;
  function value(name) {
    var id = f[name];
    if (id === undefined || id === null) throw new Error('Mapping manquant : ' + name);
    var result = values[String(id)];
    if (result instanceof Date) return Utilities.formatDate(result, 'Europe/Paris', 'yyyy-MM-dd');
    if (Array.isArray(result)) return result.join(', ');
    return result == null ? '' : String(result);
  }
  return normaliserSoumissionCompteRendu({
    source: 'google_forms',
    formId: String(config.formId),
    responseId: String(formResponse.getId()),
    fields: { titre: value('titre'), instance: value('instance'), dateReunion: value('dateReunion'), synthese: value('synthese') }
  });
}
