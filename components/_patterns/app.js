import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel'

// import $ from 'jquery';
// import 'imports?jQuery=jquery!owl.carousel';

console.clear();

const CAROUSEL_CLASS_SEED = ".js-carousel-",
	CAROUSEL_CLASSES = {
		CONTAINER: CAROUSEL_CLASS_SEED + "container",
		CONTROLS: {
			PREV: CAROUSEL_CLASS_SEED + "nav-prev",
			NEXT: CAROUSEL_CLASS_SEED + "nav-next",
			DOT: CAROUSEL_CLASS_SEED + "nav-dot",
		}
	};

const opts = {
	items: 1,
	nav: false,
	dots: false,
	rewind: false,
	nestedItemSelector: "js-carousel-item",
	responsiveClass: true,
	lazyLoad: true,
	autoplayHoverPause: true,
};

$(CAROUSEL_CLASSES.CONTAINER).each(function() {
	console.log($(this).data());

	const _opts = { ...opts, ...$(this).data() }, // Merging data attributes with default config
		carousel = $(this),
		controls = {
			prev: carousel.find(CAROUSEL_CLASSES.CONTROLS.PREV),
			next: carousel.find(CAROUSEL_CLASSES.CONTROLS.NEXT),
			dots: carousel.find(CAROUSEL_CLASSES.CONTROLS.DOT)
		};

	// Registering events
	carousel.on("initialized.owl.carousel", e => {

		const { index, count } = e.item

		// Activate prev/next controls
		carousel
			.find(controls.prev)
			.on("click", _ => carousel.trigger("prev.owl.carousel"));

		carousel
			.find(controls.next)
			.on("click", _ => carousel.trigger("next.owl.carousel"));

		// Activate dots (@todo: use delegate and place event on parent)
		controls.dots
			.each((ind, dot) =>
				$(dot).on('click', e =>
					carousel.trigger("to.owl.carousel", ind)))
	});

	carousel.on("changed.owl.carousel", e => {


		const { index, count } = e.item;

		// Handle prev/next disabled
		controls.prev.removeClass("disabled")
		controls.next.removeClass("disabled")

		if (index === 0)
			controls.prev.addClass("disabled")
		else if (index + 1 === count)
			controls.next.addClass("disabled")

		// Set active dot
		controls.dots.removeClass("active")
		$(controls.dots[index]).addClass("active")
	});

	// Instantiate carousel with merged config
	carousel.owlCarousel(_opts);
});
