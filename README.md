# nlpf-2



## Launch Project

1- git clone

2- Lance docker

3- A la root du projet : 
```docker compose up```

Le front sera dispo sur http://localhost/

Tu peux dev avec le docker qui tourne, les changements se font dynamiquement

## Dev Back

Aller dans /backend/src

Crée le fichier de la feature que tu veux. 
Le dossier test sert d'example.

Tu dois créer 3 fichiers, 
- un fichier avec tes services qui modifient la db
- un fichier avec les controlleurs qui appellent les services
- un fichier avec les routes qui appellent les fonctions du controlleur.

Puis importer le fichier route que tu a crée dans le fichier routes/index.js, et l'ajouter en utilisant routeur.use, en donnant l'endoint de ta feature



## Dev Front

Comme en UBSI

Aller dans /frontend/src

L'entrée de l'application est App.tsx

Ajouter pages et composants dans /pages et /components

Voila.




## Visualiser la DB

### Mongo Compass

Install compass sur ubuntu (il y a aussi le client sur windows, pour ça la aller sur internet et télécharger le .exe)

```
wget https://downloads.mongodb.com/compass/mongodb-compass_1.44.5_amd64.deb

sudo apt install ./mongodb-compass_1.44.5_amd64.deb

mongodb-compass
```

Dans l'interface, ajouter un serveur en cliquant sur le + a gauche.

Rentrer l'url de la db, présent par défaut dans le .env-example du backend.
Normalement: ```mongodb://root@localhost:27017/tms?authSource=admin```

Puis tu peux visualiser la db.
