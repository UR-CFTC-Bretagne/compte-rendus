/**
 * Déclencheur installable associé au Google Form.
 * Ne fonctionne que lorsque la collecte d'adresses e-mail vérifiées est activée.
 * Le paramétrage reste privé dans Script Properties (jamais dans GitHub).
 */
function onCompteRenduFormSubmit(e) {
  if (!e || !e.response || !e.source) throw new Error('Événement de formulaire requis');
  var response = e.response;
  var formId = e.source.getId();
  var config = chargerConfigurationIngestion_();
  if (formId !== config.formId) throw new Error('Formulaire non autorisé');
  var email = String(response.getRespondentEmail() || '').trim().toLowerCase();
  if (!email) throw new Error('Identité Google du répondant absente');
  var dto = adapterReponseGoogleForms(response, config);
  // Adresse issue de la réponse collectée par Google Forms ; contrôlée côté serveur.
  dto.respondentEmail = email;
  return traiterSoumissionCompteRendu(dto, creerPortsSheetsPrives_(config));
}

function chargerConfigurationIngestion_() {
  var props = PropertiesService.getScriptProperties();
  var formId = props.getProperty('MANDATCR_FORM_ID');
  var dataSheetId = props.getProperty('MANDATCR_DATA_SHEET_ID');
  var registrySheetId = props.getProperty('MANDATCR_REGISTRY_SHEET_ID');
  var rawMapping = props.getProperty('MANDATCR_FORM_FIELDS_JSON');
  if (!formId || !dataSheetId || !registrySheetId || !rawMapping) {
    throw new Error('Configuration privée incomplète');
  }
  var fields = JSON.parse(rawMapping);
  ['titre', 'instance', 'dateReunion', 'synthese'].forEach(function (key) {
    if (!Number.isInteger(Number(fields[key]))) throw new Error('Identifiant de question manquant : ' + key);
  });
  return { formId: formId, dataSheetId: dataSheetId, registrySheetId: registrySheetId, fields: fields };
}

/**
 * Installation MANUELLE par un administrateur après vérification du formulaire,
 * du registre d'habilitation et de la destination privée.
 */
function installerDeclencheurCompteRendu() {
  var config = chargerConfigurationIngestion_();
  var form = FormApp.openById(config.formId);
  if (!form.collectsEmail()) throw new Error('Activer la collecte des adresses Google vérifiées');
  var existing = ScriptApp.getProjectTriggers().some(function (trigger) {
    return trigger.getHandlerFunction() === 'onCompteRenduFormSubmit';
  });
  if (existing) throw new Error('Déclencheur déjà présent : vérifier la configuration');
  ScriptApp.newTrigger('onCompteRenduFormSubmit').forForm(form).onFormSubmit().create();
}
