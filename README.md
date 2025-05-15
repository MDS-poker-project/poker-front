# Front Poker

## Sommaire
- [Description](#description)
- [Technologies utilisées](#technologies-utilisées)
- [Installation et démarrage](#installation-et-démarrage)
- [Tests](#tests)
- [Auteurs](#auteurs)

## Description

Ce projet est un front React développée en duo dans le cadre de notre formation chez MyDigitalSchool avec comme objectif de se lier au `Poker API`. Le front permet de jouer graphiquement des parties de poker en consommant l'API. Cette appli gère des joueurs et des mises, tout en respectant les règles du texas holdem. Ce projet s'inscrit dans le cadre du cours de Application web.

## Technologies utilisées
Ce projet utilise les technologies suivantes :

- **React**
- **Jest**
- **Cypress**

## Installation et démarrage

### ⚠️⚠️ Ce projet fonctionne de paire avec l'API. Il est recommandé d'installer ce projet avec docker via le repo : 

```https://github.com/MDS-poker-project/poker-tools```


### 1. Prérequis
Avant l'installation, assurez-vous d'avoir les éléments suivants :
- Node.js
- npm

### 2. Clonez le projet :

```bash
$ git clone https://github.com/MDS-poker-project/poker-front.git
```

### 3. Installez les dépendances
```bash
$ npm install
```

### 4. Lancer l'application
```bash
$ npm run dev
```

## Tests

Une partie de ce projet est couvert par des tests :

### Tests unitaire

Les tests unitaires ont étés rédigés avec `Jest` sur :
- Composant Login
- Composant Listes

⚠️ Vous devez au préalable vous positionner dans le dossier `poker-front`
```bash
cd poker-front
```

Puis exécuter les tests :

```bash
npm run test
```

### Tests E2E

Les tests E2E ont étés rédigés avec `Cypress` sur :
- Composant Home

#### Pré-requis :

Exécutez d'abord : ```npm install``` dans `poker-front`.


⚠️ Vous devez vous positionner à la racine du projet `poker-tools` pour exécuter les tests :

```bash
docker-compose -f docker-compose.cypress.yml up --build 
```

## Auteurs
- Ibragimova Maria
- Boutrois Benjamin