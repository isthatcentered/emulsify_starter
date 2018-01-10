import "owl.carousel/dist/assets/owl.carousel.min.css"
import "owl.carousel/dist/assets/owl.theme.default.min.css"
import "owl.carousel"

import "simplelightbox"
import "simplelightbox/dist/simplelightbox.min.css"

console.clear()
// import $ from 'jquery';
// import 'imports?jQuery=jquery!owl.carousel';

// Carousel ====================================================
const CAROUSEL_CLASS_SEED = ".js-carousel-",
	CAROUSEL_CLASSES = {
		CONTAINER: CAROUSEL_CLASS_SEED + "container",
		CONTROLS: {
			PREV: CAROUSEL_CLASS_SEED + "nav-prev",
			NEXT: CAROUSEL_CLASS_SEED + "nav-next",
			DOT: CAROUSEL_CLASS_SEED + "nav-dot",
		},
	}

const CAROUSEL_OPTS = {
	items: 1,
	nav: false,
	dots: false,
	rewind: false,
	nestedItemSelector: CAROUSEL_CLASS_SEED.substr( 1 ) + "item", // dot of class has to be removed from selector
	responsiveClass: true,
	lazyLoad: true,
	autoplayHoverPause: true,
	stageElement: "ul",
	itemElement: "li",
}

$( CAROUSEL_CLASSES.CONTAINER ).each( function () {
	
	console.log( $( this ).data() )
	
	const _opts = { ...CAROUSEL_OPTS, ...$( this ).data() }, // Merging data attributes with default config
		carousel = $( this ),
		controls = {
			prev: carousel.find( CAROUSEL_CLASSES.CONTROLS.PREV ),
			next: carousel.find( CAROUSEL_CLASSES.CONTROLS.NEXT ),
			dots: carousel.find( CAROUSEL_CLASSES.CONTROLS.DOT ),
		}
	
	// Registering events
	carousel.on( "initialized.owl.carousel", e =>
		onInitialized( carousel, controls, e ) )
	
	carousel.on( "changed.owl.carousel", e =>
		onChanged( carousel, controls, e ) )
	
	// Instantiate carousel with merged config
	carousel.owlCarousel( _opts )
} )


function onInitialized( carousel, controls, e )
{
	
	const { index, count } = e.item
	
	// Activate prev/next controls
	carousel
		.find( controls.prev )
		.on( "click", _ => carousel.trigger( "prev.owl.carousel" ) )
	
	carousel
		.find( controls.next )
		.on( "click", _ => carousel.trigger( "next.owl.carousel" ) )
	
	// Activate dots (@todo: use delegate and place event on parent)
	controls.dots
		.each( ( ind, dot ) =>
			$( dot ).on( "click", e =>
				carousel.trigger( "to.owl.carousel", ind ) ) )
	
}

function onChanged( carousel, controls, e )
{
	const { index, count } = e.item
	
	// Handle prev/next disabled
	controls.prev.removeClass( "disabled" )
	controls.next.removeClass( "disabled" )
	
	if ( index === 0 )
		controls.prev.addClass( "disabled" )
	if ( index + 1 === count )
		controls.next.addClass( "disabled" )
	
	// Set active dot
	controls.dots.removeClass( "active" )
	$( controls.dots[ index ] ).addClass( "active" )
}


// Lightbox ====================================================

const LIGHTBOX_CLASS_SEED = ".js-lightbox-",
	LIGHTBOX_CLASSES = {
		CONTAINER: LIGHTBOX_CLASS_SEED + "container",
		ITEM: LIGHTBOX_CLASS_SEED + "item",
	}

const lightboxes = $( LIGHTBOX_CLASSES.CONTAINER ),
	LIGHTBOX_OPTS = {
		sourceAttr: "data-source", // Source used for large images
		captionsData: "alt", // Use this attr for caption
		fileExt: false, // Nobody asked you to check if correcttype my friend
		animationSlide: true,
		animationSpeed: 100,
		loop: false,
		alertError: false, // would throw a good old alert in your face otherwise
	}

	console.log( lightboxes )

lightboxes
	.each( ( ind, gallery ) =>
		$( gallery )
			.find( LIGHTBOX_CLASSES.ITEM )
			.simpleLightbox( LIGHTBOX_OPTS ) )
	