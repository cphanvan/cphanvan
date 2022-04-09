---
title: Bonus abonnés
description: De nombreux textes intégraux et inédits en téléchargement gratuit, à retrouver en exclusivité sur ce site (nouvelles, légendes, récits jeunesse...)
layout: single
classes: wide
page_js:
  - /assets/js/bonus.js
sidebar_newsletter: true
sidebar:
  - title: "Bonus offerts"
    text: |
      Ces textes vous intéressent&nbsp;? Ils sont accessibles en téléchargement libre pour tous les abonnés à la newsletter.

      C'est gratuit et sans aucun engagement&nbsp;: si le contenu ne vous plaît pas, vous pouvez résilier votre abonnement à tout moment&nbsp;! N'hésitez pas à vous inscrire&nbsp;! 😉
share: true
permalink: /bonus
header:
  overlay_color: "#000"
  overlay_filter: "0.2"
  overlay_image: /assets/images/bandeau-bonus.jpg
bonus: true
books:
  - teaser: "Du noir aux flammes"
    bonus_id: "DuNoirAuxFlammes"
    image_path: /assets/images/bonus/DuNoirAuxFlammes-couv.jpg
    description: |
        Jusqu'où la noiceur d'une ville peut-elle corrompre les êtres qu'elle abrite ?

        Cette courte nouvelle paraîtra courant 2023 au sein du recueil [*Fragments de solitudes*](/publications/projets-en-cours/#fragments-de-solitudes).
  - teaser: "Un écrin pour toi, ma bien-aimée"
    bonus_id: "UnÉcrinPourToiMaBienAimée"
    image_path: /assets/images/bonus/UnÉcrinPourToiMaBienAimée-couv.png
    description: |
        Dans cette très courte nouvelle, découvrez une histoire d'amour et de mort, où les vampires rôdent…
  - teaser: "Mauvais swing"
    bonus_id: "MauvaisSwing"
    image_path: /assets/images/bonus/MauvaisSwing-couv.png
    description: |
        Une pianiste, un saxophoniste, du jazz… Et un jour, un mauvais swing.
  - teaser: "La légende de la Fée Neige"
    bonus_id: "LaLegendeDeLaFeeNeige"
    image_path: /assets/images/bonus/LaLegendeDeLaFeeNeige-couv.png
    description: |
        Une incursion au pays des sapins, de la neige et du froid…

        Retrouvez ici la légende qui a donné naissance à <a href="https://www.amazon.fr/dp/B09LXQ7LX7" target="_blank">ma nouvelle Enfants des neiges</a>&nbsp;!
  - teaser: "Pitchi et la Gardienne des Âmes"
    bonus_id: "PitchiEtLaGardienneDesAmes"
    image_path: /assets/images/bonus/PitchiEtLaGardienneDesAmes-couv.png
    description: |
        Quand Greer doit se résoudre à confier sa fille, âgée de sept jours à peine, à celui que lui a envoyé la gardiennes des âmes pour protéger l'enfant, Pitchi n'est sûrement pas le sauveur qu'elle espérait…
  - teaser: "Le lapin rose"
    bonus_id: "LeLapinRose"
    image_path: /assets/images/bonus/LeLapinRose-couv.png
    description: |
        Au travers d'une expérience qui ne tourne pas comme prévu, ce court récit jeunesse aborde le thème de la différence.

        Prenez le temps d'en admirer la couverture, entièrement créée par mon tout jeune fils (9 ans) !

---

# Textes à télécharger


<div id="bonusCredentialsForm">
    <p>Pour activer les liens de t&eacute;l&eacute;chargement, veuillez saisir ci-dessous le mot de passe abonn&eacute;s. Vous pouvez retrouver ce mot de passe dans la section <em>Le texte du mois</em> de chaque newsletter.</p>
    <p><em>Si vous avez supprim&eacute; ou &eacute;gar&eacute; mes mails ou le mot de passe, n'h&eacute;sitez pas &agrave; <a href="/contact" target="_blank">me contacter</a> pour me demander de vous le renvoyer&nbsp;!</em> 😉</p>
    <form onsubmit="event.preventDefault(); onSubmit(this);">
        <input type="password" id="bonusCredentialsToken" name="token" placeholder="Mot de passe abonnés" required>
        <input type="submit" value="Activer">
    </form>
</div>
{: .notice--info}



{% include books %}
