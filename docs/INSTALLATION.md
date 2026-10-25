# Installation de développement

## Pré-requis

Node.js 20+, npm, accès GitHub et un projet Google Apps Script de test.

## Vérification locale

```bash
npm test
npm run build
```

Le dossier `dist/` contient les fichiers plats compatibles avec le projet Apps Script.

## Synchronisation Apps Script (manuelle pour l'instant)

Installer `@google/clasp` sur le poste de développement, lancer `clasp login`, puis configurer un fichier `.clasp.json` **non versionné** pointant vers un projet Apps Script de test avec `rootDir: "dist"`. Lancer ensuite `clasp push`.

**Ne jamais pousser vers la production sans recette, contrôle des autorisations et approbation.** Aucun système de stockage, authentification des mandatés ou accès aux données de production n'est implémenté dans ce prototype.

## Statut

Ce socle permet de tester la validation d'un compte rendu et le calcul d'indicateurs fictifs. Il n'enregistre pas de compte rendu et ne génère pas de rapport PDF. Ces fonctionnalités restent au programme du MVP.
