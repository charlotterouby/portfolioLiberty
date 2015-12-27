(function ($) {
	"use strict";
	// Smooth Hash Link Scroll
	$('.smooth-scroll').click(function () {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	$('.nav a').on('click', function () {
		if ($('.navbar-toggle').css('display') !== 'none') {
			$(".navbar-toggle").click();
		}
	});

	//Isotope filter
	$(window).load(function () {
		var $container = $('.portfolioContainer');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});

		$('.portfolioFilter a').click(function () {
			$('.portfolioFilter .current').removeClass('current');
			$(this).addClass('current');

			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
			return false;
		});
	});

	//Contact form
	$('#contactform').submit(function () {
		var action = $(this).attr('action');
		var values = $(this).serialize();

		$.post(action, values, function (data) {
			$('.results').hide().html(data).slideDown('slow');
			$('#contactform').find('.form-control').val('');
		});
		return false;
	});

}(jQuery));