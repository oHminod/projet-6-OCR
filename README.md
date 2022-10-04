# Piiquante

**Piiquante** : application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

## Installation

Pour installer les dépendances, dans un terminal à la racine du projet, lancer la commande : `npm install`

Vérifier la présence ou créer un fichier nommé `.env` à la racine. Ce fichier doit être de la forme suivante, en prenant garde de respecter la casse des noms de variables et de mettre les valeurs de celles-ci entre guillemets ou apostrophes, la connexion à la base de données est configurée pour utiliser MongoDB Atlas :

```
PORT: '3000'
DB_PASS: 'mot de passe de la base de données'
DB_NAME: 'nom du cluster'
DB_URL: 'URL du cluster'
TOKEN: 'token complexe généré à partir d'un générateur de clés'
```

Pour rappel la connexion se fait avec une adresse de cette forme :

`mongodb+srv://DB_NAME:DB_PASS@DB_URL/piiquante`

Si le fichier ne contient que la variable du port, il faut configurer MongoDB Atlas pour créer un nouveau projet dédié à l'API, créer un utilisateur et un cluster pour récupérer les variables sur le lien donné par MongoDB Atlas pour connecter son application.

## Démarrage

Pour démarrer l'API, dans un terminal à la racine du projet, lancer la commande : `npm start`