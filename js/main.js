'use strict';

(function () {

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {
		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	var sliderMain = function() {
	  	$('#signup-hero .flexslider').flexslider({
			animation: "fade",
			animationLoop: false,
			slideshow: false,
			directionNav: true,
			controlsContainer: ".flexslider",
			customDirectionNav: $("span.custom-navigation"),
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 200);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 200);
			}
	  	});

	  	$('#signup-hero .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('#signup-hero .flexslider .slides > li').css('height', $(window).height());	
	  	});
	};

	var centerBlock = function() {
		$('.signup-section-with-image .signup-box').css('margin-top', -($('.signup-section-with-image .signup-box').outerHeight()/2));
	  	$(window).resize(function(){
	  		$('.signup-section-with-image .signup-box').css('margin-top', -($('.signup-section-with-image .signup-box').outerHeight()/2));
	  	});
	};

	var responseHeight = function() {
		setTimeout(function(){
			$('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
		}, 1);
		
		$(window).resize(function(){
			setTimeout(function(){
				$('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
			}, 1);
		})
	};


	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#signup-offcanvas, .js-signup-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas-visible') ) {
    			$('body').removeClass('offcanvas-visible');
    			$('.js-signup-nav-toggle').removeClass('active');
	    	}
	    }
		});
	};

	var offcanvasMenu = function() {
		$('body').prepend('<div id="signup-offcanvas" />');
		$('#signup-offcanvas').prepend('<ul id="signup-side-links">');
		$('body').prepend('<a href="#" class="js-signup-nav-toggle signup-nav-toggle"><i></i></a>');
		$('#signup-offcanvas').append($('#signup-header nav').clone());
	};

	var burgerMenu = function() {
		$('body').on('click', '.js-signup-nav-toggle', function(event){
			var $this = $(this);
			$('body').toggleClass('signup-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();
		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-signup-nav-toggle').removeClass('active');
		   }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-signup-nav-toggle').removeClass('active');
		   }
		});
	};

	var toggleBtnColor = function() {
		if ( $('#signup-hero').length > 0 ) {	
			$('#signup-hero').waypoint( function( direction ) {
				if( direction === 'down' ) {
					$('.signup-nav-toggle').addClass('dark');
				}
			} , { offset: - $('#signup-hero').height() } );

			$('#signup-hero').waypoint( function( direction ) {
				if( direction === 'up' ) {
					$('.signup-nav-toggle').removeClass('dark');
				}
			} , { 
				offset:  function() { return -$(this.element).height() + 0; }
			} );
		}
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
				}, 100);
			}
		} , { offset: '85%' } );
	};

	$("#signUpBtn").on("click", function(){
		$("#signup").addClass("hide");
		$("#successMsg").removeClass("hide");
		setTimeout(function(){
			$("#signup .custom-navigation.flex-next").click();
		}, 1500);
	});

	$("#recoverLink").on("click", function(){
		$("#signin").addClass("hide");
		$("#recover").removeClass("hide");
	});

	$("#backBtn").on("click", function(){
		$("#signin").removeClass("hide");
		$("#recover").addClass("hide");
	});

	$("#sendEmailBtn").on("click", function(){
		setTimeout(function(){
			$("#recover").addClass("animated zoomOut");
			setTimeout(function(){
				$("#recover").addClass("hide");
				$("#signin").removeClass("hide");
			}, 800);
		}, 500);
	});

	$("#submitBtn").on("click", function(){
		$("#signup-hero").addClass("hide");
		$("#item-list").removeClass("hide");
	});

	$(function(){
		fullHeight();
		centerBlock();
		sliderMain();
		responseHeight()
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		toggleBtnColor();
		contentWayPoint();
	});


}());