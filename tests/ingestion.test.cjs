const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = {
  Date, Number, String, Array, Error,
  Utilities: { formatDate: date => date.toISOString().slice(0, 10) }
};
vm.createContext(context);
for (const path of [
  'src/core/Rules.gs',
  'src/api/CompteRenduContract.gs',
  'src/integrations/GoogleFormsAdapter.gs',
  'src/modules/comptes-rendus/CompteRenduService.gs',
  'src/integrations/FormsTrigger.gs'
]) vm.runInContext(fs.readFileSync(path,'utf8'), context, {filename:path});
test('rejette un événement sans réponse ni source',()=>{
  assert.throws(()=>context.onCompteRenduFormSubmit({}), /Événement/);
});
test('convertit les dates de Google Forms en ISO',()=>{
  const date = new Date('2026-10-25T12:00:00Z');
  const values=[[11,'Séance'],[12,'CARSAT'],[13,date],[14,'Synthèse']];
  const response={getId:()=> 'R123',getItemResponses:()=>values.map(([id,value])=>({
    getItem:()=>({getId:()=>id}),getResponse:()=>value
  }))};
  const dto=context.adapterReponseGoogleForms(response,{formId:'form',fields:{
    titre:11,instance:12,dateReunion:13,synthese:14
  }});
  assert.equal(dto.dateReunion,'2026-10-25');
});
