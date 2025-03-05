# Footchain - Blockchain et Football

## Description
**Footchain** est un projet qui permet aux clubs de football de créer leur propre token (ERC20) et d'utiliser une banque décentralisée pour gérer les transactions, le paiement des joueurs et l'achat de services pour les supporters.

## Cas d'Utilisation
1. **Création du Token** : Un club crée son token (ex. PSG Token) et effectue un minting.
2. **Achat de Tokens** : Les supporters achètent des tokens pour accéder à des places, maillots, etc.
3. **Paiement des Joueurs** : Le club paie ses joueurs en tokens via la banque.
4. **Transfert de Tokens** : Les tokens des joueurs peuvent être transférés lors des transferts.

## Répartition des tâches

### 1. **Back-end**
- Développement des Smart Contracts (`Footchain.sol` et `FootchainBank.sol`).
- Tests des contrats.
- Déploiement sur réseau de test.

### 2. **Front-end**
- Développement de l'interface utilisateur.
- Intégration avec la blockchain via Web3.js ou Ethers.js.

### 3. **Sécurisation et Audit**
- Sécurisation des Smart Contracts.
- Audit avant le déploiement final.



## Installation
1. Clonez le projet :
   ```bash
   git clone https://github.com/ton-compte/footchain.git
   ```
2. Installation des dépendances 
    ```bash
    npm install
    ```
