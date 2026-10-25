/**
 * Règles pures : le formulaire déclare un mandat, mais le registre privé
 * et l'adresse Google vérifiée fondent seuls l'autorisation.
 * Dates de validité : chaînes ISO YYYY-MM-DD ; bornes incluses.
 */
function autoriserCompteRenduMandat(dto, mandats, affectations) {
  if (!dto || !Array.isArray(mandats) || !Array.isArray(affectations)) return false;
  var email = String(dto.respondentEmail || '').trim().toLowerCase();
  var date = String(dto.dateReunion || '');
  var mandatId = String(dto.mandatId || '').trim();
  var structureId = String(dto.structureId || '').trim();
  var instance = String(dto.instance || '').trim();
  if (!email || !/^\\d{4}-\\d{2}-\\d{2}$/.test(date) || !mandatId || !structureId || !instance) return false;
  function dateIso(value) {
    if (value instanceof Date) return Utilities.formatDate(value, 'Europe/Paris', 'yyyy-MM-dd');
    return String(value || '').trim();
  }
  function actif(statut) { return String(statut || '').trim().toUpperCase() === 'ACTIF'; }
  function couvre(rowStart, rowEnd) {
    var from = dateIso(rowStart), until = dateIso(rowEnd);
    return (!from || from <= date) && (!until || date <= until);
  }
  var mandatOk = mandats.some(function(row) {
    return String(row[0]) === mandatId && String(row[1]) === structureId &&
      String(row[2]).trim() === instance && actif(row[5]) && couvre(row[3],row[4]);
  });
  if (!mandatOk) return false;
  return affectations.some(function(row) {
    return String(row[0] || '').trim().toLowerCase() === email &&
      String(row[1]) === mandatId && String(row[2]) === structureId &&
      actif(row[5]) && couvre(row[3],row[4]);
  });
}
