---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title: "Dernières parutions"
layout: splash
permalink: /
date: 2022-03-23T22:40:00Z
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/bandeau.png
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
  - image_path: assets/images/publications.jpg
    title: "Publications"
    excerpt: "Découvrez ici mes nouvelles publiées"
    url: "/publications"
    btn_label: "Découvrir"
  - image_path: /assets/images/echantillons.jpg
    alt: "Echantillons"
    title: "Échantillons"
    excerpt: "Quelques-uns de mes textes sont à lire ici en accès libre : micro-nouvelles, nouvelles, extraits..."
    url: "/echantillons"
    btn_label: "Lire"
  - image_path: /assets/images/bonus_abonnes.png
    alt: "Bonus abonnés"
    title: "Bonus abonnés"
    excerpt: "Abonnez-vous gratuitement à la newsletter mensuelle et retrouvez ici les textes exclusifs qui vous sont réservés !"
    url: "/bonus#abonnez-vous"
    btn_label: "S'abonner"
contact:
  - url: "/contact"
    btn_label: "Vous souhaitez me contacter ?"
---

{% include feature_row id="a_propos" type="center" %}

{% include feature_row id="contenu_site" %}

{% include feature_row id="contact" type="center" %}
