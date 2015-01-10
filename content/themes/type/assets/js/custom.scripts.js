(function($) {
	"use strict";


	// 0. Settings
	
	var dribbbleWidget = true;		// Set to false to hide widget
	var dribbbleUser = 'Username';		// Set to your own Dribbble username
	var dribbbleMaxShots = 6;		// Adjust the number of shots display. Even numbers.

	var disqusComments = true;		// Set to false to hide comments
	var disqusUser = 'yourdisqus_shortname';	// Set to your own Disqus Shortname


	// ---!!! DO NOT EDIT BELOW THIS POINT !!!--- //


	// 1. Size setup

	sizeSetup();

	var resizeTimeOut = false;
	$( window ).resize( function(){
		if( resizeTimeOut !== false )
			clearTimeout( resizeTimeOut );
		resizeTimeOut = setTimeout( sizeSetup, 200 ); //200 is time in miliseconds
	});
	
	function sizeSetup() {
		var fullHeight = $( window ).height() - $( 'body' ).offset().top;
		var headerHeight = $( '#header' ).height();
		var heroHeight = fullHeight - headerHeight;
		var heroContentHeight = $( '#hero .container' ).height();

		$( '#hero .hero-content' ).css({ 'height': heroContentHeight });

		var tallHeroes = $( '.home-template #hero, #hero.image-bg, #hero.error-hero' );

		if ( Modernizr.mq( 'only screen and ( min-width: 1024px )' ) ) {
			$( tallHeroes ).addClass( 'tall-hero' ).css({ 'height': heroHeight });
		}
		else if ( Modernizr.mq( 'only screen and ( max-width: 1023px )' ) ) {
			$( tallHeroes ).removeClass( 'tall-hero' ).css({ 'height': 'auto' });
		}
	}

	// 2. Post Image Hero FX on Scroll

	if ( Modernizr.mq( 'only screen and ( min-width: 1024px )' ) ) {
		$( window ).scroll( function() {
			var scrolled = $( this ).scrollTop();
			var maxScroll = $( '#hero' ).height() * 60 / 100;
			$( '#hero.tall-hero .hero-content' ).css( { 'top' : scrolled, 'opacity' : (1 - scrolled/maxScroll) } );
		});
	}

	// 3. Posts Setup

	$( '.duo-grid > .post').addClass( 'col-md-6' ); // Add half width class to posts
	$( '.trio-grid > .post').addClass( 'col-md-4' ); // Add third width class to posts

	// 4. Mobile Nav Setup

	$( '#nav-mobile-drop' ).html( $( '#nav' ).html() );

	$( '#nav-mobile-toggle' ).click( function(el){
		el.preventDefault();

		if( $( this ).hasClass( 'active' ) ) {
			$( this ).removeClass( 'active' );
			$( '#nav-mobile-drop' ).slideUp( 'fast' ).removeClass( 'active' );
		}
		else {
			$( this ).addClass( 'active' );
			$( '#nav-mobile-drop' ).slideDown( 'fast' ).addClass( 'active' );
		}
	});

	// 4. Link FX

	$( '.post-info a' ).addClass( 'link' );

	// 5. Dribbble Widget

	if( dribbbleWidget == true && $( '#dribbble-widget' ).length ) {
		$.jribbble.getShotsByPlayerId( dribbbleUser, function ( playerShots ) {
			var html = [];

			$.each( playerShots.shots, function ( i, shot ) {
				html.push( '<li class="col-xs-6 col-sm-12 col-md-6">' );
				html.push( '<a href="' + shot.url + '" title="' + shot.title + '" target="_blank"><img src="' + shot.image_url + '" alt="' + shot.title + '" class="mono"></a>' );
				html.push( '<div class="dribbble-title"><a href="' + shot.url + '" title="' + shot.title + '">' + shot.title + '</a></div>' );
				html.push( '</li>' );
			});

			$( '#dribbble-widget ul' ).html( html.join('') );
		}, { page: 1, per_page: dribbbleMaxShots } );
	}
	else {
		$( '#dribbble-widget' ).remove();
	}

	// 6. Disqus Comments

	if( disqusComments == true && $( '#disqus_thread' ).length ) {
		(function() {
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = '//' + disqusUser + '.disqus.com/embed.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		})();
	}
	else {
		$( '.post-template .post-comments' ).remove();
	}

	// 7. FitVids

	$(".post-content").fitVids();

})(jQuery);