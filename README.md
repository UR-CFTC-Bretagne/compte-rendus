# MANDAT’CR CFTC

**Application open source de transmission, de suivi et de valorisation des comptes rendus des mandatés CFTC.**

Projet initié par l’**Union Régionale CFTC Bretagne**. La première installation visée est régionale ; le code est conçu pour pouvoir être déployé indépendamment par d’autres structures CFTC.

> **État : initialisation.** Ce dépôt contient pour le moment la documentation et la structure initiale. Il ne constitue pas encore une application prête à être déployée.

## Objectifs

- Saisir des comptes rendus de réunions d’instances paritaires et syndicales, sans double saisie.
- Identifier les mandats, les organismes et les réunions auxquels les comptes rendus se rattachent.
- Soumettre, relire, valider et archiver les comptes rendus en préservant leur confidentialité.
- Suivre les décisions, alertes, actions et échéances.
- **Produire des rapports d’activité** individuels, par mandat, par pôle, par structure CFTC ou à l’échelle régionale, à partir des comptes rendus validés.

## Principes techniques

- Google Apps Script (exécution), JavaScript, HTML/CSS.
- GitHub pour le code source et la revue des évolutions ; `clasp` pour la synchronisation avec Apps Script.
- Architecture modulaire par domaines : identité/autorisations, mandats, comptes rendus, documents, workflows, notifications, actions, rapports.
- Accès aux services Google via des adaptateurs séparés (Sheets, Drive, Gmail, Calendar).
- Configuration par installation ; aucune donnée réelle des mandatés ni secret dans ce dépôt public.
- CI/CD GitHub Actions **prévue**, à mettre en place puis à valider avant tout déploiement automatique.

Consulter [l’architecture](docs/ARCHITECTURE.md) et la [feuille de route](docs/ROADMAP.md).

## Arborescence initiale

```text
.github/                      # Workflows et gouvernance (à intégrer)
docs/
  ARCHITECTURE.md
  ROADMAP.md
src/
  core/                       # Configuration, sécurité, contrôles communs
  modules/
    mandats/
    comptes-rendus/
    rapports-activite/
    documents/
    workflow/
    notifications/
    actions/
  integrations/               # Adaptateurs Google Workspace / MandatScop
  ui/                         # Interface utilisateur
tests/                        # Tests métier et d’intégration
LICENSE                       # GNU AGPL-3.0
NOTICE.md                     # Crédits et marques
README.md
.gitignore
```

L’arborescence illustre les responsabilités ; les modules sont encore des espaces de conception. Google Apps Script ne prend pas en charge nativement cette hiérarchie lors du déploiement : la compilation/agrégation sera mise en place avec l’outillage `clasp`.

## Sécurité et données

**Le code est public, pas les données.** Les données personnelles, documents de réunions, configurations de production, jetons et clés d’accès doivent rester dans des espaces privés avec contrôle d’accès. Toute autorisation doit être vérifiée côté serveur ; un rôle ne donne pas automatiquement accès aux comptes rendus confidentiels. Les exports et rapports nécessitent une validation avant diffusion.

## Licence et crédits

Code distribué sous la **GNU Affero General Public License v3.0** — voir [LICENSE](LICENSE).

© 2026 **Union Régionale CFTC Bretagne** — initiative et crédit du projet, sous réserve de confirmation des droits sur les contributions publiées. Voir [NOTICE.md](NOTICE.md).

Les noms, signes distinctifs et logos de la CFTC ne sont pas concédés par la licence logicielle : leur usage reste soumis aux autorisations applicables. Le choix d’une licence open source autorise la réutilisation du code dans le respect de cette licence.

## Contribution

Les propositions pourront être déposées via Issues et Pull Requests. Les règles détaillées de contribution et de mise en production seront ajoutées avec l’outillage CI/CD.
