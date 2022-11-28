---
title: "Utiliser Staticman pour gérer les commentaires sur un blog Jekyll"
seo_title: "Gérer les commentaires sur un blog Jekyll avec Staticman et AWS"
layout: blogpost
excerpt_separator: <!--excerptEnd-->
date: 2022-11-27 12:45:00 +0100
last_modified_at: 2022-11-28 12:15:00 +0100
categories: technique
tags: technique blog astuces jekyll staticman
sidebar_newsletter: true
share: true
comments: true
toc: true
toc_label: Sommaire
header:
  teaser: /assets/images/posts/2022-11-27_teaser-staticman-jekyll-aws.webp
---
Vous souhaitez offrir la possibilité à vos visiteurs de déposer des commentaires sur votre blog Jekyll sans débourser un centime&nbsp;? C'est possible&nbsp;!
<!--excerptEnd-->

![logos Jekyll Staticman et AWS](/assets/images/posts/2022-11-27_teaser-staticman-jekyll-aws.webp)

## Intro

Je suppose ici que votre blog <a href="https://jekyllrb.com/" target="_blank">Jekyll</a> est déjà en ligne, et que vous vous y connaissez un minimum côté technique, assez au moins pour savoir ce que sont <a href="https://nodejs.org/" target="_blank">NodeJS</a>, <a href="https://github.com/" target="_blank">GitHub</a> et comment les utiliser.

Je ne prétends pas que la solution que j'ai mise en place pour mon propre blog est la meilleure, mais elle a le mérite de fonctionner et d'être gratuite *(en tout cas les 12 premiers mois, et pour un volume de requêtes tout à fait suffisant pour mes besoins&nbsp;; ce qui me laisse un peu de temps pour voir si je parviens à me passer de la couche API Gateway, pour bénéficier de la gratuité sans limite de durée)*. Et pour une autrice fauchée, l'argument du coût n'est pas négligeable&nbsp;!

Je précise en outre que j'utilise le <a href="https://mmistakes.github.io/minimal-mistakes/" target="_blank">thème Jekyll Minimal Mistakes</a>, qui a l'avantage d'être précâblé pour fonctionner avec Staticman. Si ce n'est pas le cas du thème que vous avez choisi, vous aurez un peu de travail à faire pour gérer le formulaire de dépôt de commentaire, et l'affichage des commentaires reçus. De plus, mon blog est hébergé sur <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>, ce qui fait que je n'ai même pas à lever le petit doigt quand un commentaire est déposé (sauf modération si je le souhaite)&nbsp;: la mise en ligne se fait automatiquement.

Petit tour d'horizon de ce qui va nous servir ici&nbsp;:
- <a href="https://staticman.net/" target="_blank">Staticman</a>,
- <a href="https://www.serverless.com/" target="_blank">Serverless</a>,
- <a href="https://aws.amazon.com/fr/" target="_blank">les services cloud AWS</a>, notamment Lambda et API Gateway.

Initialement, je préférais l'hébergement Heroku, mais leur offre gratuite prend fin le 28&nbsp;novembre&nbsp;2022 et j'ai donc dû me décider à migrer ailleurs&hellip; d'où finalement le choix d'AWS.


## Staticman

Quelques mots, pour commencer, sur ce qu'est <a href="https://staticman.net/" target="_blank">Staticman</a> et comment cela fonctionne.

Staticman est une API écrite en NodeJS, vers laquelle vous allez poster le commentaire soumis sur votre blog, et qui va alors se charger d'effectuer un commit dans le repository git de votre blog, afin d'y pousser ce commentaire.

Les étapes sont donc&nbsp;:
- quelqu'un ajoute un commentaire sur votre blog
- lorsqu'il est soumis, ce commentaire est posté vers l'API Staticman
- Staticman effectue un commit du commentaire dans le repository git de votre blog (ou soumet une pull request, si vous souhaitez modérer les commentaires)
- lors du commit (ou lorsque vous acceptez la pull request), votre chaîne CI/CD (continuous integration / continuous delivery), si vous en avez une, build et déploie votre blog&nbsp;; si vous n'en avez pas, charge à vous de vous occuper de cette étape
- le commentaire apparaît en ligne sur votre blog.

Vous voyez donc que votre blog Jekyll reste purement statique. La seule qu'il y a à faire, c'est héberger votre instance de l'API Staticman, et effectuer les configurations nécessaires afin, d'une part, que votre blog lui poste les commentaires et, d'autre part, que votre API Staticman ait accès au repository git de votre blog.

C'est ce que nous allons voir maintenant&nbsp;! 😊


## Création du projet avec Serverless

Je pars de l'hypothèse que vous avez déjà node et npm installés sur votre poste. Je suis pour ma part en version 16 de node.

Commencez par installer le framework Serverless (il va vous faciliter le déploiement vers l'infrastructure AWS) et initialisez un nouveau projet&nbsp;:

```
npm install -g serverless
serverless create --template aws-nodejs --path my-staticman-api
```

Cela va vous créer un projet NodeJS basique, configuré pour utiliser AWS Lambda. Dans le répertoire `my-staticman-api` ainsi créé, vous disposez désormais de 3&nbsp;fichiers&nbsp;:
- `.gitignore`
- `handler.js`
- `serverless.yml`

[![projet serverless nodejs basique pour AWS lambda](/assets/images/posts/2022-11-27_serverless-basic-aws-nodejs-project.webp)](/assets/images/posts/2022-11-27_serverless-basic-aws-nodejs-project.webp)


## Ajout des modules Staticman et serverless-http

Vous allez avoir besoin de Staticman et de serverless-http. Installez-les&nbsp;:

```
npm install -s serverless-http
npm install --save git+https://github.com/cphanvan/staticman.git#master
```

Vous pouvez constater que je vous propose ici d'utiliser mon propre fork de Staticman. J'y ai en effet apporté 2&nbsp;modifications. D'abord, la version de NodeJS, pour pouvoir utiliser node v16. Ensuite, une modification afin de décoder une variable d'environnement, parce que si Heroku permettait de créer des variables d'environnement avec des sauts de ligne, ce n'est pas le cas d'AWS Lambda, et pour tout vous avouer, cela m'a bien pris la tête pendant de longues heures, jusqu'à ce que je finisse par décider de contourner le problème en encodant ladite variable d'environnement en base64&nbsp;: il devenait donc nécessaire de la décoder à la lecture.

Vous pouvez créer votre propre fork à partir du mien, ou utiliser le mien si vous le souhaitez. *(Je ne peux cependant pas garantir que je ne le ferai pas évoluer si j'en ressens le besoin.)*

Vous avez désormais dans votre répertoire 2&nbsp;fichiers et 1&nbsp;répertoire supplémentaires&nbsp;:
- `package.json`
- `package-lock.json`
- `node_modules`

[![projet serverless nodejs staticman](/assets/images/posts/2022-11-27_serverless-staticman-project.webp)](/assets/images/posts/2022-11-27_serverless-staticman-project.webp)


## Encapsulation de Staticman par Serverless

Éditez le fichier `handler.js` et remplacez son contenu par ce qui suit&nbsp;:

```
'use strict';
const serverless = require('serverless-http');

let api;
try {
  const StaticmanApi = require('staticman/server');
  api = new StaticmanApi();
} catch (e) {
  console.error(e);
  process.exit(1);
}

module.exports.staticman = serverless(api.server);
```

## Configuration de Serverless pour le déploiement sur AWS

Éditez le fichier `serverless.yml` et remplacez son contenu par ce qui suit&nbsp;:

```
service: cphanvan-api-staticman

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs16.x
  stage: prod
  region: eu-west-3
  apiGateway:
    shouldStartNameWithService: true
  httpApi:
    cors:
      allowedOrigins:
        - https://catherinephanvan.fr
      allowedHeaders:
        - Content-Type
        - Origin
        - X-Requested-With
        - Accept
      allowedMethods:
        - OPTIONS
        - GET
        - POST


functions:
  comment:
    handler: handler.staticman
    events:
      - httpApi: '*'
```

en prenant soin de remplacer `cphanvan-api-staticman` par le nom que vous souhaitez donner à votre service, et `https://catherinephanvan.fr` par l'adresse de votre propre blog.

Vous pouvez aussi modifier la région `eu-west-3` (qui correspond à Paris) et opter pour celle de votre choix.


## Déployer votre API sur AWS

Lancez la commande `serverless deploy`.


## Créer une application GitHub pour Staticman

Pour permettre à Staticman d'accéder au repository GitHub qui contient le code source de votre blog Jekyll, suivez les étapes décrites dans la doc officielle de Staticman, Step 1, <a href="https://staticman.net/docs/getting-started.html#option-1-authenticate-as-a-github-application" target="_blank">Option 1 "Authenticate as a GitHub application"</a>.


## Configurer votre fonction AWS Lambda

Connectez vous à votre compte AWS et naviguez jusqu'à la fonction que vous venez de déployer.

Dans la partie Configuration, Variables d'environnement, créez les 3&nbsp;variables d'environnement suivantes&nbsp;:
- `GITHUB_APP_ID`, avec comme valeur l'ID de l'application GitHub que vous venez de créer
- `GITHUB_PRIVATE_KEY`, avec comme valeur la clé privée de l'application GitHub que vous venez de créer, avec les sauts de ligne, et **encodée en base64**
- `RSA_PRIVATE_KEY`, avec comme valeur une clé RSA privée que vous allez générer pour Staticman (voir <a href="https://staticman.net/docs/getting-started.html#step-2-deploy-staticman" target="_blank">ici</a>), par exemple via la commande `openssl genrsa`, sans sauts de ligne, et non encodée

Voici ce que vous devriez obtenir&nbsp;:

[![AWS Lambda variables d'environnement pour Staticman](/assets/images/posts/2022-11-27_aws-lambda-staticman-env-variables.webp)](/assets/images/posts/2022-11-27_aws-lambda-staticman-env-variables.webp)


Dans la partie Configuration, Déclencheurs, vous allez trouver l'URL de votre API, exposée par l'API Gateway. C'est celle que vous devez utiliser sur votre blog pour y envoyer vos commentaires&nbsp;:

[![AWS API Gateway API endpoint](/assets/images/posts/2022-11-27_aws-api-gateway-url.webp)](/assets/images/posts/2022-11-27_aws-api-gateway-url.webp)


## Configurez votre blog pour Staticman

À la racine du code source de votre blog, créez un fichier nommé `staticman.yml` et définissez-y <a href="https://staticman.net/docs/configuration" target="_blank">votre configuration pour Staticman</a>, afin qu'il se comporte comme vous le souhaitez.

Ce fichier devra être poussé dans votre repository GitHub, où il sera lu directement par votre instance Staticman.

Voilà, c'est terminé&nbsp;! J'espère que cela vous aura été utile et vous aura permis de passer moins de temps que moi (et d'y perdre moins de cheveux) à déployer Staticman sur AWS&nbsp;! 😊

Et devinez quoi&nbsp;? Si vous le souhaitez, vous pouvez même me laisser un petit commentaire&nbsp;! 😉