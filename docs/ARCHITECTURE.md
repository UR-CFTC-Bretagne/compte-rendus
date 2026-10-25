# Architecture cible — MANDAT’CR CFTC

## Vision

Architecture modulaire, maintenable, testable et évolutive, organisée par **domaines métier**, avec premier déploiement pour l’UR CFTC Bretagne. Chaque installation dispose de ses propres données, droits et paramètres ; un même dépôt de code peut être partagé entre plusieurs structures CFTC sans mélange des données.

## Couches

1. **Interface** (`src/ui`) : composants de saisie, tableau de bord, validation, rapports.
2. **Contrôleurs** : point d’entrée des appels, validation des requêtes et des permissions.
3. **Services métier** (`src/modules`) : règles fonctionnelles sans dépendance directe à une API Google.
4. **Référentiels et adaptateurs** (`src/integrations`) : accès à Google Sheets, Drive, Gmail et Agenda ; synchronisation MandatScop à étudier.
5. **Socle commun** (`src/core`) : authentification, contrôle d’accès, configuration, erreurs, journalisation et identifiants.

## Modules

| Module | Responsabilité |
| --- | --- |
| `mandats` | Identité des mandats, instances, organismes et affectations |
| `comptes-rendus` | Brouillons, saisie structurée, soumission, versions |
| `rapports-activite` | Agrégation de données validées, indicateurs, production de rapports |
| `documents` | Pièces jointes, classement Drive, archivage |
| `workflow` | Transitions d’état, demande de corrections, approbations |
| `notifications` | Accusés de réception, alertes, relances |
| `actions` | Suivi des décisions, échéances et responsables |

## Modèle métier minimal (prévisionnel)

- `StructureCftc` : identifiant, type, parent, configuration.
- `Utilisateur` / `Affectation` : rôles *par structure ou mandat*.
- `Mandat` / `Instance` / `Reunion` : clés stables et dates.
- `CompteRendu` : id, auteur, mandat, réunion, statut, version, sensibilité, contenu structuré.
- `PieceJointe` : id, compteRenduId, référence Drive et droits d’accès.
- `Action` : compteRenduId, responsable, échéance, état.
- `RapportActivite` : périmètre, période, indicateurs, sources, statut de validation, export.
- `Audit` : acteur, action, cible, horodatage.

Les données seront conservées dans les espaces Google appropriés au déploiement et **jamais dans GitHub**. Les statistiques doivent expliciter leur périmètre et les données manquantes.

## Rapports d’activité

Pipeline : **comptes rendus validés → filtrage par droits et périmètre → agrégation → calcul d’indicateurs → document brouillon → validation humaine → diffusion autorisée**.

Les rapports doivent tracer les identifiants des comptes rendus sources et distinguer « réunion tenue », « réunion déclarée » et « compte rendu transmis ».

## Règles de sécurité

- Contrôler chaque opération côté serveur, y compris la lecture des exports.
- Appliquer le principe du moindre privilège et le cloisonnement entre structures.
- Protéger les données personnelles et les comptes rendus sensibles ; journaliser les accès administratifs.
- Conserver les secrets et les IDs Google de production hors dépôt.
- Prévoir la politique RGPD (durées de conservation, rectification, suppression et accès).
- Ne pas supposer que `Session.getActiveUser().getEmail()` est toujours disponible selon le contexte de déploiement.

## Outillage

GitHub + revue par Pull Request. Prévoir ESLint, Prettier, tests unitaires et d’intégration, compilation compatible Apps Script, `clasp`, GitHub Actions et environnements séparés. Aucun workflow de déploiement n’est actif à ce stade.
