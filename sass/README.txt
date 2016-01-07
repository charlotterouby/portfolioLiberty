Arborescence du projet

index.html					page principal du portfolio

ASSETS						accueil les ressources statiques du projet
	cv_CharlotteRouby.pdf	
	
	CSS						feuilles css du projet
	FONTS					web fonts
	IMG						les photos fond d'écran + ma photo
		PROJETS				les miniatures de la grille du portfolio
			PRINT			images pour les carousels des projets print
			WEB				images pour les carousels des projets web
	JS						fichiers javascript/jquery

SASS						fichiers scss
	style.scss				fichier final qui sera compiler en feuille css
	
	GENERAL					fichiers partiels généraux
		_base.scss			configuration des sources sass du projet (! ne doit générer aucun style css)
		_basic.scss			styles généraux : typo, medias
		_layout.scss		mise en forme de la grille (agencement du site)
		_theme.scss			définition des variables utiles au projet (! ne doit générer aucun style css)
		
	PAGES					habillage graphique des différentes section du portfolio
		_about.scss			section présentation perso
		_contact.scss		section de contact
		_hero.scss			section accueil / landing page
		_portfolio.scss		mise en forme de la section portfolio
		
	UI						les différents modules graphiques de la maquette
		_button.scss		mise en forme des boutons
		_carousel.scss		mise en forme des carousels d'image
		_nav.scss			mise en forme de la navigation
		
	VENDORS					codes tierce partie
