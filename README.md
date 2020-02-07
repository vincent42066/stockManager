# Stock manager

Dans le cadre du projet "Tests et sécurité", cette application permet de gérer partiellement les stocks d'un magasin de sport.
Il existe 3 catégories d'utilisateur existantes : Utilisateur, Administrateur et Super-administrateur.
L'administrateur et le super-administrateur peuvent gérer les différents utilisateurs, contrairement à un simple utilisateur.

# Déploiement du front-end

1) Installer Node.js

https://github.com/nodesource/distributions/blob/master/README.md

2) Installer les dépendances nécessaires au fonctionnement de Node.js

`cd ./frontend`

`npm install`

3) Lancement du serveur en localhost sur le port 4200

`npm start`

Le front-end est maintenant déployé.
Vous pouvez à présent accéder au site web en spécifiant cet URL dans votre navigateur : 

http://localhost:4200/login



# Déploiement du back-end

1) Installer python3 + venv

`sudo apt install python3`
`sudo apt install python3-pip`
`sudo apt install python3-venv`


2) créer le virtualenv et installer les dependances

`cd backend.py`
`python -m venv env`
`source env/bin/activate`
`pip install -r requirements.txt`

3) Lancement du serveur en localhost

 `python backed.py`


