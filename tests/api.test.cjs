const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = { Date, Number, String, Array, Error };
vm.createContext(context);
for (const name of [
  'src/core/Rules.gs',
  'src/api/CompteRenduContract.gs',
  'src/integrations/GoogleFormsAdapter.gs',
  'src/modules/comptes-rendus/CompteRenduService.gs',
  'src/modules/rapports-activite/RapportService.gs'
]) vm.runInContext(fs.readFileSync(name, 'utf8'), context, {filename:name});
const fields = {titre:'Séance',instance:'CARSAT',dateReunion:'2026-10-25',synthese:'Compte rendu'};
test('contrat d ingestion versionné et idempotent', () => {
  const dto = context.normaliserSoumissionCompteRendu({source:'google_forms',formId:'f1',responseId:'r1',fields});
  assert.equal(dto.sourceKey,'f1:r1');
  let stored = false;
  const ports = {authorize:()=>true,exists:()=>stored,saveIfAbsent:()=>{stored=true;return true;}};
  assert.equal(context.traiterSoumissionCompteRendu(dto,ports).status,'CREATED');
  assert.equal(context.traiterSoumissionCompteRendu(dto,ports).status,'DUPLICATE');
});
test('le service refuse une soumission non autorisée', () => {
  const dto = context.normaliserSoumissionCompteRendu({source:'google_forms',formId:'f1',responseId:'r1',fields});
  assert.throws(()=>context.traiterSoumissionCompteRendu(dto,{authorize:()=>false,exists:()=>false,saveIfAbsent:()=>true}),/non autorisée/);
});
test('adapter FormApp : mapping basé sur identifiants de questions', () => {
  const answers = [[11,'Séance'],[12,'CARSAT'],[13,'2026-10-25'],[14,'Compte rendu']];
  const response = {getId:()=> 'r2',getItemResponses:()=>answers.map(([id,value])=>({getItem:()=>({getId:()=>id}),getResponse:()=>value}))};
  const dto=context.adapterReponseGoogleForms(response,{formId:'f2',fields:{titre:11,instance:12,dateReunion:13,synthese:14}});
  assert.equal(dto.sourceKey,'f2:r2');
  assert.equal(dto.instance,'CARSAT');
});
test('rapports filtrés par statut période et structure',()=>{
  const result=context.indicateursActiviteV1([
    {statut:'VALIDE',structureId:'BRETAGNE',dateReunion:'2026-10-10',instance:'CESER'},
    {statut:'SOUMIS',structureId:'BRETAGNE',dateReunion:'2026-10-10',instance:'CESER'},
    {statut:'VALIDE',structureId:'AUTRE',dateReunion:'2026-10-10',instance:'CESER'}
  ],{structureId:'BRETAGNE',debut:'2026-10-01',fin:'2026-10-31'});
  assert.equal(result.comptesRendusValides,1);
  assert.equal(result.parInstance.CESER,1);
});
