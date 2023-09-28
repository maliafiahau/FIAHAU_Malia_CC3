# FIAHAU_Malia_CC3
TP5 - Développement Web

Partie 1 - Serveur HTTP natif Node.js

  Installation

    Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur

      - Connection
      - Date
      - Keep-alive
      - Transfer-encoding

  Servir différents types de contenus

    Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente

      - Content-length
      - Content-type

    Question 1.3 que contient la réponse reçue par le client 

      Aucune réponse n'est reçue par le client.

    Question 1.4 quelle est l'erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d'erreur affiché.

      L'erreur affichée est "Error : ENOENT: no such file or directory".

    Question 1.5 donner le code de requestListener() modifié avec gestion d'erreur en async/await 
      <code>
      async function requestListener(_request, response) {
        try {
          const contents = await fs
            .readFile("index.html", "utf8")
            .then((contents) => {
              response.setHeader("Content-Type", "text/html");
              response.writeHead(200);
              return response.end(contents);
            });
        } catch (error) {
          console.error(error);
          response.writeHead(500);
          return response.end(error);
        }
      }
    </code>
  Mode développement

    Question 1.6 indiquer ce que cette commande a modifié dans votre projet

      Ces commandes permettent d'installer les packages cross-env et nodemon. 
      Elles modifient le fichier package.json sous "dependencies" et "devDependencies" où l'on peut voir les version de ces deux packages installées.

    Question 1.7 quelles sont les différences entre les scripts http-dev et http-prod ? 

      Le script http-dev est exécuté avec nodemon. S'il y a changement dans le code, le serveur se relance automatiquement avec les nouvelles modifications      
      apportées dans le code.
      Le script http-prod est exécuté sans nodemon, donc il n'y aura pas de relance automatique du serveur.

  Gestion manuelle des routes

    Question 1.8 donner les codes HTTP reçus par votre navigateur pour chacune des pages précédentes

      - http://localhost:8000/index.html : 200 OK
      - http://localhost:8000/random.html : 200 OK
      - http://localhost:8000/ : 404 NOT FOUND
      - http://localhost:8000/dont-exist : 404 NOT FOUND

Partie 2 - framework Express

  Création du serveur

    Question 2.1 donner les URL des documentations de chacun des modules intallés par la commande précédente.

      "express": "^4.18.2" https://expressjs.com
      "http-errors": "^2.0.0" https://www.npmjs.com/package/http-errors
      "loglevel": "^1.8.1" https://www.npmjs.com/package/loglevel
      "morgan": "^1.10.0" https://www.npmjs.com/package/morgan

    Question 2.2 vérifier que les trois routes fonctionnent.

      Les routes "/", "index.html" et "/random/:nb" fonctionnent.

    Question 2.3 lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP?

      Les en-têtes nouvelles par rapport au serveur HTTP : 
        - Accept-ranges
        - Cache-control
        - Etag
        - Last-modified 
        - X-Powered-By

    Question 2.4 quand l'évènement listening est-il déclenché?

      La variable server est créée lors de l'appel app.listen(port, host). L'évènement listening sera déclenché lorsque le serveur à réussi à se lier au port
      et à l'adresse host spécifiés.

  Ajout de middlewares

    Question 2.5 indiquer quelle est l'option (activée par défaut) qui redirige "/" vers "/index.html"?

      L'option activée par défaut qui redirige "/" vers "/index.html" est 'fallthrough' qui prend comme valeur par défaut true. 
      "Il est généralement true souhaité que plusieurs répertoires physiques puissent être mappés à la même adresse Web ou que des itinéraires remplissent des
      fichiers inexistants."

    Question 2.6 visiter la page d'accueil puis rafraichir (Ctrl+R) et ensuite forcer le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le
    fichier style.css? Justifier.

      En rafraichissant la page d'accueil le code HTTP sur le fichier style.css est 304 (NOT MODIFIED). Ensuite en forçant le rafraichissement, le code HTTP est 200 (OK).
      Cela reflète le comportement du cache d'un navigateur. Le code 304 signifie que les ressources ont été téléchargées depuis le cache, mais en forçant le rafraichissement, le navigateur ignore le cache.

  Gestion d'erreurs

    Question 2.7 vérifier que l'affichage change bien entre le mode production et le mode development.

      En mode production, la page affiche "Error 404 NOT FOUND".
      En mode development, on rajoute "NOTFOUNDERROR: NOT FOUND at...".
