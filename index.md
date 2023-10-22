---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title: "Dernières nouvelles&hellip;"
seo_title: "Graine d'autrice"
description: Site officiel de l'autrice Catherine Phan van. Retrouvez ses publications, des textes gratuits et inédits en exclusivité, son actu...
layout: splash
permalink: /
date: 2022-12-02T12:00:00Z
header:
  overlay_color: "#557a95"
  overlay_filter: "rgba(85, 122, 149, 0.7)"
  overlay_image: /assets/images/bandeau-arbre-de-lune.webp
  actions:
    - label: "Télécharger le recueil"
      url: "https://festival-fantastique.fr/wp-content/uploads/2023/10/FFB-2023-pdf.pdf"
    - label: "Mes autres publications"
      url: "/publications"
excerpt: "Ma nouvelle &laquo;&nbsp;<em><strong>L'arbre de lune</strong></em>&nbsp;&raquo; a terminé 3<sup>e</sup> du concours du Festival du Fantastique de Béziers.<br><br>Envie de la lire&nbsp;?"
a_propos:
  - excerpt: |
      Née en 1976 au pays des sapins et du froid, je vis aujourd'hui près de Bordeaux.
      
      J'ai semé des nouvelles sur la toile et dans diverses anthologies. Sur ce site, vous pouvez explorer mes [publications](/publications), [lire gratuitement certains de mes textes](/echantillons), découvrir [les coulisses de ma vie d'autrice](/blog/tags#viedautrice), ou retrouver mes [chroniques de lecture](/blog/tags#chronique).
      
      Et si vous avez envie de rire de mes bourdes, n'hésitez pas à [vous abonner à ma newsletter](/bonus)&nbsp;!
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
  - url: "/agenda"
    btn_label: "Vous souhaitez me rencontrer lors d'une séance de dédicaces ?"
  - url: "/contact"
    btn_label: "Vous pouvez également me contacter ici !"
---

{% include feature_row id="a_propos" type="center" %}

{% include feature_row id="contenu_site" %}

{% include feature_row id="contact" type="center" %}
