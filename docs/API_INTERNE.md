# API métier interne — version 1.0

## Décision
Les formulaires Google Forms sont des adaptateurs d’entrée. Les services métier n’accèdent jamais directement aux libellés des questions ni aux lignes des feuilles de réponses.

## Contrat d’ingestion `CompteRenduSubmission@1.0`

Champs : `schemaVersion`, `source`, `formId`, `sourceResponseId`, `sourceKey`, `titre`, `instance`, `dateReunion`, `synthese`, `statut`.

- `sourceKey` = `formId:responseId` permet de reconnaître une soumission déjà vue.
- `schemaVersion` assure la compatibilité de l’interface ; changer le mapping n’impose pas de modifier les services.
- L’adaptateur lit les **identifiants d’items** Google Forms ; le tableau de mapping doit rester dans une configuration d’installation privée.
- Toute donnée fournie par le formulaire est considérée comme **non fiable** ; l’identité et les droits sur le mandat sont vérifiés par un service distinct.

## Services déjà codés dans le socle technique

- `normaliserSoumissionCompteRendu` : valide et normalise une entrée.
- `adapterReponseGoogleForms` : traduit une réponse FormApp.
- `traiterSoumissionCompteRendu` : applique une politique d’autorisation injectée et demande un enregistrement idempotent.
- `indicateursActiviteV1` : calcule les comptes rendus validés par instance et par période pour une structure donnée.

**Ces fonctions sont des primitives de développement** : le déclencheur, l'identification fiable du répondant, les droits d’accès, l’adaptateur de stockage atomique, l’audit persistant, les exports et les mécanismes de reprise ne sont pas encore implémentés. Aucune donnée réelle ne doit leur être confiée.

## API HTTP ultérieure
Une API REST pourra exposer les services métier après définition d’une authentification forte, des autorisations, de la limitation des appels et de la journalisation. Elle n’est pas nécessaire pour le MVP Google Forms + Apps Script.
