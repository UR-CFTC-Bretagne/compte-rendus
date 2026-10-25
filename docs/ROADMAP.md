# Feuille de route prévisionnelle

## V0 — Fondations
- [x] Dépôt public créé sous l’organisation UR-CFTC-Bretagne
- [ ] Fusion de la documentation et de l’arborescence initiale
- [ ] Outillage Node.js, tests, lint et build Apps Script
- [ ] CI GitHub Actions vérifiée sur Pull Requests
- [ ] Déploiements de développement et de préproduction sécurisés

## V1 — Collecte et rapports
- [ ] Authentification et autorisations par mandat/structure
- [ ] Référentiel des mandats et des instances
- [ ] Comptes rendus structurés : brouillon, envoi, validation, historique
- [ ] Pièces jointes, classement Drive et notifications
- [ ] Rapports d’activité : individuel, instance et régional
- [ ] Exports Google Docs et PDF avec validation préalable

## V2 — Coordination
- [ ] Suivi des actions et échéances
- [ ] Rapprochement avec Google Agenda
- [ ] Tableau de bord, statistiques et alertes

## V3 — Mutualisation CFTC
- [ ] Déploiements indépendants pour d’autres structures CFTC
- [ ] Consolidations interstructures autorisées
- [ ] Documentation et analyses transversales

Chaque fonctionnalité doit être accompagnée de tests, d’une revue des permissions et de documentation.

## Décision fonctionnelle : Google Forms
- [ ] Auditer et réutiliser en priorité le formulaire existant `FORM_03_COMPTE_RENDU_INSTANCE`
- [ ] Cartographier les champs (mandat, instance, réunion, positions CFTC, décisions, actions, confidentialité)
- [ ] Mettre en place un déclencheur de réception fiable et un traitement idempotent
- [ ] Associer l’identité réelle du répondant à ses mandats autorisés ; ne pas faire confiance aux champs déclaratifs
- [ ] Sécuriser les feuilles de réponses et fichiers joints dans Google Workspace
- [ ] Utiliser Apps Script pour validation, notifications et rapports d’activité ; aucun formulaire HTML parallèle dans le MVP
