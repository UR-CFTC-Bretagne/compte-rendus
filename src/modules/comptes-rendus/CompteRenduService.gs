/**
 * Traitement métier à injection de dépendances, testable hors Workspace.
 * Le port doit exposer: exists(key), saveIfAbsent(dto) et audit(evt).
 * En production l'adaptateur doit implémenter une atomicité effective et des ACL.
 */
function traiterSoumissionCompteRendu(dto, ports) {
  if (!ports || typeof ports.exists !== 'function' ||
      typeof ports.saveIfAbsent !== 'function' || typeof ports.authorize !== 'function') {
    throw new Error('Ports de traitement incomplets');
  }
  if (!dto || dto.schemaVersion !== MANDATCR_SCHEMA_VERSION || !dto.sourceKey) throw new Error('Contrat incompatible');
  if (!ports.authorize(dto)) throw new Error('Soumission non autorisée');
  if (ports.exists(dto.sourceKey)) return { status: 'DUPLICATE', sourceKey: dto.sourceKey };
  var saved = ports.saveIfAbsent(dto);
  if (saved === false) return { status: 'DUPLICATE', sourceKey: dto.sourceKey };
  if (typeof ports.audit === 'function') ports.audit({ type: 'COMPTE_RENDU_RECU', sourceKey: dto.sourceKey });
  return { status: 'CREATED', sourceKey: dto.sourceKey };
}
