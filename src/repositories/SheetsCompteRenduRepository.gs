/**
 * Port Sheets protégé par verrou script, pour l'installation régionale.
 * Les tableaux sont privés. Ce stockage est un MVP, pas une API publique.
 *
 * Feuille habilitations : Autorisations(email, instance, statut).
 * Feuille comptes rendus : ComptesRendus(sourceKey, formId, responseId, email,
 * titre, instance, dateReunion, synthese, statut, dateReception).
 */
function creerPortsSheetsPrives_(config) {
  var dataBook = SpreadsheetApp.openById(config.dataSheetId);
  var registryBook = SpreadsheetApp.openById(config.registrySheetId);
  var table = dataBook.getSheetByName('ComptesRendus');
  var registry = registryBook.getSheetByName('Autorisations');
  if (!table || !registry) throw new Error('Feuilles privées manquantes');
  var headers = ['sourceKey','formId','responseId','email','titre','instance','dateReunion','synthese','statut','dateReception'];
  var authHeaders = ['email','instance','statut'];
  function checkHeader(sheet, expected) {
    var values = sheet.getRange(1,1,1,expected.length).getValues()[0];
    if (expected.some(function (h,i) { return values[i] !== h; })) throw new Error('En-têtes incompatibles');
  }
  checkHeader(table, headers);
  checkHeader(registry, authHeaders);
  function countRows(sheet) { return sheet.getLastRow(); }
  function sourceExists(key) {
    var last = countRows(table);
    if (last < 2) return false;
    return table.getRange(2,1,last-1,1).getValues().some(function (row) {return row[0] === key;});
  }
  function safeCell(value) {
    var text = String(value == null ? '' : value);
    return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
  }
  return {
    authorize: function (dto) {
      if (!dto || !dto.respondentEmail || !dto.instance) return false;
      var last = countRows(registry);
      if (last < 2) return false;
      var email = dto.respondentEmail.toLowerCase();
      return registry.getRange(2,1,last-1,3).getValues().some(function (row) {
        return String(row[0] || '').trim().toLowerCase() === email &&
          String(row[1] || '').trim() === dto.instance &&
          String(row[2] || '').trim().toUpperCase() === 'ACTIF';
      });
    },
    exists: function (key) { return sourceExists(key); },
    saveIfAbsent: function (dto) {
      var lock = LockService.getScriptLock();
      lock.waitLock(20000);
      try {
        if (sourceExists(dto.sourceKey)) return false;
        table.appendRow([
          safeCell(dto.sourceKey),safeCell(dto.formId),safeCell(dto.sourceResponseId),
          safeCell(dto.respondentEmail),safeCell(dto.titre),safeCell(dto.instance),
          safeCell(dto.dateReunion),safeCell(dto.synthese),'SOUMIS',new Date()
        ]);
        SpreadsheetApp.flush();
        return true;
      } finally {
        lock.releaseLock();
      }
    },
    audit: function (evt) {
      // Événement technique sans contenu de compte rendu.
      console.info('Ingestion: ' + evt.type + ' ; sourceKey=' + evt.sourceKey);
    }
  };
}
