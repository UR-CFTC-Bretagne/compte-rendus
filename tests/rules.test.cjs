const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('src/core/Rules.gs', 'utf8');
const scope = { Date, Number, String, Array, Error };
vm.createContext(scope);
vm.runInContext(source, scope);
test('valide un compte rendu', () => {
  const report = scope.validateCompteRendu({ titre:' Réunion ',instance:' CESER ',dateReunion:'2026-10-25',synthese:' Décisions ' });
  assert.equal(report.titre, 'Réunion');
  assert.equal(report.instance, 'CESER');
});
test('refuse une date impossible et une synthèse vide', () => {
  assert.throws(() => scope.validateCompteRendu({titre:'X',instance:'Y',dateReunion:'2026-02-30',synthese:'ok'}), /Date/);
  assert.throws(() => scope.validateCompteRendu({titre:'X',instance:'Y',dateReunion:'2026-10-25',synthese:''}), /Synthèse/);
});
test('ne compte que les comptes rendus validés', () => {
  const result = scope.compterActivite([
    {instance:'CESER',statut:'VALIDE'}, {instance:'CESER',statut:'BROUILLON'}, {instance:'CARSAT',statut:'VALIDE'}
  ]);
  assert.equal(result.comptesRendusValides, 2);
  assert.equal(result.parInstance.CESER, 1);
  assert.equal(result.parInstance.CARSAT, 1);
});
