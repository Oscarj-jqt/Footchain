# Footchain

**Footchain** est une plateforme décentralisée permettant la gestion de tokens représentant des joueurs, des billets, des maillots et des salaires dans l'industrie du football. Grâce à la blockchain, les clubs peuvent effectuer des transferts de joueurs, gérer des actifs et garantir une transparence totale dans les transactions. Le projet utilise des contrats intelligents écrits en **Solidity** et un backend en **TypeScript** pour interagir avec la blockchain.

## Description des Choix Techniques

### Blockchain - Ethereum et Solidity
- **Ethereum** a été choisi pour sa sécurité et sa large adoption, permettant de créer des applications décentralisées.
- **Solidity** est utilisé pour développer les contrats intelligents qui gèrent les tokens (joueurs, billets, maillots) et les salaires.
- **Hardhat** est utilisé pour le développement et le test des contrats intelligents dans un environnement local.
- **ethers.js** permet d'interagir avec la blockchain pour lire et écrire dans les contrats.

### Backend - TypeScript
- **TypeScript** offre une sécurité de type renforcée et facilite la maintenance du code.
- **Node.js** est utilisé pour exécuter le backend qui interagit avec la blockchain.


### Wallet - MetaMask
- **MetaMask** est utilisé comme wallet pour permettre aux utilisateurs de signer des transactions et interagir avec les contrats intelligents.

### Transactions et Gestion des Actifs
- **Tokens des joueurs** : Représentent les joueurs et permettent aux clubs de gérer les transferts de manière sécurisée.
- **Tokens des billets et maillots** : Permettent aux fans d'acheter, vendre ou échanger des billets et des maillots.
- **Transferts et salaires** : Le club gère les transferts de joueurs et les paiements de salaires via des contrats intelligents, assurant la transparence des transactions.

## Prérequis

Pour installer et exécuter le projet, vous aurez besoin de :

- **Node.js** 16.x ou supérieur
- **npm** ou **yarn** pour gérer les dépendances
- **Hardhat** pour compiler et déployer les contrats intelligents
- **MetaMask** pour gérer les wallets et signer les transactions
- **dotenv** pour la gestion des variables d'environnement

## Installation

1. **Cloner le repository :**

   ```bash
   git clone https://github.com/votre-utilisateur/footchain.git
   cd footchain

2. **Installer les dépendances :**

 ```bash
 npm install
 ```


## Participants

 - Oscar JACQUET    - Développeur Back End
 - Alexis HU        - Développeur Full Stack
 - Issa Abdoulaye  - Développeur Front End
 - Aryles Ben Chabane - Développeur Full Stack
 - Hugo Da Rocha    - Développeur Back End
 