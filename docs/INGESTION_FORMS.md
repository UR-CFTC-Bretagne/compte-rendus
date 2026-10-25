# Raccordement Google Forms — avant mise en service

## État
Ce module fournit un **déclencheur Apps Script et un adaptateur Sheets** ; il n'est pas déployé. Aucune réponse de mandaté réelle n'a été traitée. Les droits, configurations et accès doivent être vérifiés avant toute exécution.

## Prérequis
- Formulaire appartenant à une entité Google Workspace autorisée, avec **collecte d'adresses e-mail Google vérifiées** (ne pas utiliser un champ libre « email »).
- Les réponses ne doivent être ouvertes qu'aux personnes autorisées, suivant les capacités du domaine Google.
- Feuille Google privée de stockage avec onglet `ComptesRendus` et colonnes exactes :
  `sourceKey,formId,responseId,email,titre,instance,dateReunion,synthese,statut,dateReception`.
- Feuille Google privée d'autorisations avec onglet `Autorisations` et colonnes :
  `email,instance,statut`. Une ligne par habilitation, statut `ACTIF`.
- Créer les deux tableurs dans un espace Drive privé, limiter les accès et documenter les responsables.

## Configuration privée Apps Script
Renseigner les propriétés du script : `MANDATCR_FORM_ID`, `MANDATCR_DATA_SHEET_ID`, `MANDATCR_REGISTRY_SHEET_ID`, `MANDATCR_FORM_FIELDS_JSON`. Exemple **fictif** de correspondance des identifiants d'items : `{"titre":101,"instance":102,"dateReunion":103,"synthese":104}`.

Ne jamais publier les identifiants réels de ressources, jetons et données dans GitHub. Les dates doivent être normalisées au format `YYYY-MM-DD`.

## Démarrage
1. Examiner les questions réelles du formulaire `FORM_03_COMPTE_RENDU_INSTANCE` et définir le mapping d'items.
2. Adapter le modèle de registre pour les mandats : l'habilitation actuelle par instance est **provisoire et insuffisante pour les cas multi-mandats**.
3. Réviser les autorisations du script et les habilitations d'accès, puis réaliser les tests d'intégration sur un formulaire fictif.
4. Exécuter **manuellement** `installerDeclencheurCompteRendu` depuis le projet Apps Script de préproduction.
5. Vérifier une soumission valide, une soumission non autorisée, un doublon et un échec temporaire.

## Limites et travaux bloquants avant production
- Vérification par **mandat ID et structure** plutôt que le seul couple (email, instance), et revue des cas de suppléance.
- Actuellement aucune validation par un coordinateur ni intégration MandatScop.
- Journal d'audit persistant, notifications, rapprochement des pièces jointes et politique RGPD encore absents.
- Surveillance des erreurs, mécanismes de reprise et traitement des changements de schéma.
- Le service n'écrit pas dans le tableur des réponses brutes de Google Forms : il utilise un stockage métier privé dédié.

**Ne pas activer le déclencheur sur le formulaire réel avant ces validations.**
