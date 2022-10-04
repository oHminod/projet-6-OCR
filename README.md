# Piiquante

**Piiquante** : application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

## Installation

Pour installer les dépendances, dans un terminal à la racine du projet, lancer la commande : `npm install`

Créer un fichier nommé `.env` à la racine. Ce fichier doit être de la forme suivante, en prenant garde de respecter la casse des noms de variables et de mettre celles-ci entre guillemets ou apostrophes, la base de donnée est hébergée sur MongoDB Atlas :

```
PORT: '3000'
DB_PASS: 'mot de passe de la base de données'
DB_NAME: 'nom du cluster'
DB_URL: 'URL du cluster'
TOKEN: 'token complexe généré à partir d'un générateur de clés'
```

Pour rappel la connexion se fait avec une adresse de cette forme :

`mongodb+srv://DB_NAME:DB_PASS@DB_URL/piiquante`

## Démarrage

Pour démarrer l'API, dans un terminal à la racine du projet, lancer la commande : `npm start`