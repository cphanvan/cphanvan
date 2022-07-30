---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title: "Dernières parutions"
seo_title: "Graine d'autrice"
description: Site officiel de l'autrice Catherine Phan van. Retrouvez ses publications, des textes gratuits et inédits en exclusivité, son actu...
layout: splash
permalink: /
date: 2022-03-23T22:40:00Z
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/bandeau.webp
  actions:
    - label: "En savoir plus"
      url: "/publications"
excerpt: "Nouvelles hivernales : pour vos lectures au coin du feu, vous êtes plutôt douceur ou frissons ?"
a_propos:
  - excerpt: |
      Catherine Phan van est née en 1976 au pays des sapins et du froid, qu'elle a quitté pour s'installer près de Bordeaux, où elle vit depuis 2008.

      Ingénieure de formation mais autrice de cœur depuis sa plus tendre adolescence, elle a attendu, avec patience à défaut de courage, d'atteindre sa quarante-cinquième année avant d'oser enfin brandir sa plume et dévoiler ses textes.
    url: "/a-propos"
    btn_label: "En savoir plus"
contenu_site:
  - image_path: assets/images/publications.webp
    title: "Publications"
    excerpt: "Découvrez ici mes nouvelles publiées, mais aussi mes recueils, romans ou novellas qui trépignent de suivre un jour le même chemin"
    url: "/publications"
    btn_label: "Découvrir"
  - image_path: /assets/images/echantillons.webp
    alt: "Echantillons"
    title: "Échantillons"
    excerpt: "Quelques-uns de mes textes sont à lire ici en accès libre : nouvelles à quatre mains avec des autrices amies, micronouvelles, jeux d'écriture..."
    url: "/echantillons"
    btn_label: "Lire"
  - image_path: /assets/images/bonus_abonnes.webp
    alt: "Bonus abonnés"
    title: "Textes offerts"
    excerpt: "Abonnez-vous gratuitement à la newsletter mensuelle et retrouvez ici les textes qui vous sont réservés en exclusivité !"
    url: "/bonus#abonnez-vous"
    btn_label: "S'abonner"
contact:
  - url: "/contact"
    btn_label: "Vous souhaitez me contacter ?"
---

{% include feature_row id="a_propos" type="center" %}

{% include feature_row id="contenu_site" %}

{% include feature_row id="contact" type="center" %}
