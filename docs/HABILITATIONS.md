# Contrôle des habilitations par mandat — prototype V1

Chaque déclaration Google Forms fournit `mandatId` et `structureId`, mais ces valeurs sont **déclaratives**. Elles ne suffisent jamais à autoriser la transmission.

La chaîne vérifie une adresse de répondant collectée par Google, puis contrôle dans les référentiels privés : l’existence d’un mandat actif, son appartenance à la structure, son instance, la validité à la date de réunion et l’affectation active du répondant sur la même période.

## Référentiels privés

Feuille `Mandats` : `mandatId,structureId,instance,dateDebut,dateFin,statut`.

Feuille `Affectations` : `email,mandatId,structureId,dateDebut,dateFin,statut`.

Ces feuilles sont provisoires : la source MandatScop doit être rapprochée avec ce schéma après vérification de son format et de la fiabilité de ses identifiants. Ne jamais verser de données personnelles de MandatScop dans le dépôt public.

## Risques non résolus

- Vérifier le mode exact de collecte des adresses e-mail du formulaire réel et ses limitations organisationnelles.
- Choisir un référentiel de mandats signé/validé par l’UR et une procédure de révocation.
- Éviter la seule saisie libre de l’identifiant de mandat : proposer un contrôle ou une correspondance administrée.
- Journal d’audit durable, gestion des doublons inter-exécutions, stratégie de récupération des erreurs et protection des exports.
- Contrôle du droit de **lecture** et de **validation**, distinct du seul droit de soumettre.
- Ne pas activer sur données réelles sans recette de sécurité et de confidentialité.

## Évolution du tableur cible

Colonnes `ComptesRendus` : `sourceKey,formId,responseId,email,mandatId,structureId,titre,instance,dateReunion,synthese,statut,dateReception`.

Migration nécessaire avant utilisation : les premiers prototypes étaient basés sur un accès `email + instance` uniquement.
