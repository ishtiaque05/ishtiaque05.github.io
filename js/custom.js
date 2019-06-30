jQuery(document).ready(function(){ 
	
	/* ---------------------------------------------------------------------- */
	/*	Custom Functions
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $logo 	= $('#logo');
		
	// Show logo 
	$('.tab-resume,.tab-portfolio,.tab-contact').click(function() {
	  $logo.fadeIn('slow');
	});
	// Hide logo
	$('.tab-profile').click(function() {
	  $logo.fadeOut('slow');
	});	
	
	/* ---------------------------------------------------------------------- */
	/*	Menu
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $content 		= $("#content");
	
	// Run easytabs
  	$content.easytabs({
	  animate			: true,
	  updateHash		: false,
	  transitionIn		:'slideDown',
	  transitionOut		:'slideUp',
	  animationSpeed	:600,
	  tabs				:"> .menu > ul > li",
	  tabActiveClass	:'active',
	});
	
	// Hover menu effect
	$content.find('.tabs li a').hover(
		function() {
			$(this).stop().animate({ marginTop: "-7px" }, 200);
		},function(){
			$(this).stop().animate({ marginTop: "0px" }, 300);
		}
	);
	/* ---------------------------------------------------------------------- */
	/*	Portfolio
	/* ---------------------------------------------------------------------- */ 
	
	// Needed variables
	var $container	 	= $('#portfolio-list');
	var $filter 		= $('#portfolio-filter');
		
	// Run Isotope  
	$container.isotope({
		filter				: '*',
		layoutMode   		: 'masonry',
		animationOptions	: {
		duration			: 750,
		easing				: 'linear'
	   }
	});	
	
	// Isotope Filter 
	$filter.find('a').click(function(){
	  var selector = $(this).attr('data-filter');
		$container.isotope({ 
		filter				: selector,
		animationOptions	: {
		duration			: 750,
		easing				: 'linear',
		queue				: false,
	   }
	  });
	  return false;
	});	
	
	/* ---------------------------------------------------------------------- */
	/*	Background pattern
	/* ---------------------------------------------------------------------- */
  	jQuery('#opt_block .opt_header span').click(function(){
		if(jQuery(this).hasClass('vis')) {
			jQuery(this).removeClass('vis').parents('#opt_block').animate({'marginRight':0}, 700, 'easeInCubic');
		}
		else{
			jQuery(this).addClass('vis').parents('#opt_block').animate({'marginRight':222}, 700, 'easeInCubic');
		}
	});
	jQuery('.patterns_select li a').click(function(){
		var src = jQuery(this).find('img').attr('src');
		jQuery('body').addClass('colored').removeClass('bg_img').css({'background': 'url('+src+')'});
		setCookie('body_pt', src, 9999999, 'index.html');
		deleteCookie('body_img', 'index.html');
		deleteCookie('body_bg', 'index.html');
		return false;
	});
	jQuery('.bg_select li a').click(function(){
		var src = jQuery(this).find('img').attr('src');
		jQuery('body').addClass('bg_img').css({'background': 'url('+src+')'});
		setCookie('body_img', src, 9999999, 'index.html');
		deleteCookie('body_bg', 'index.html');
		deleteCookie('body_pt', 'index.html');
		return false;
	});

	if(getCookie('body_bg')) {
		var src = getCookie('body_bg');
		jQuery('body').css({'background':src});
		jQuery('#bg_col').css({'background':src});
	}
	else if(getCookie('body_img')) {
		var src = getCookie('body_img');
		jQuery('body').css({'background':'url('+src+')'}).addClass('bg_img');
	}
	else if(getCookie('body_pt')) {
		var src = getCookie('body_pt');
		jQuery('body').css({'background':'url('+src+')'}).removeClass('bg_img');
	}


	// Portfolio image animation 
	$container.find('img').adipoli({
		'startEffect' 	: 'transparent',
		'hoverEffect' 	: 'boxRandom',
		'imageOpacity' 	: 0.6,
		'animSpeed' 	: 100,
	});
	
	// Copy categories to item classes
	$filter.find('a').click(function() {
		var currentOption = $(this).attr('data-filter');
		$filter.find('a').removeClass('current');
		$(this).addClass('current');
	});	
	
	/* ---------------------------------------------------------------------- */
	/*	Fancybox 
	/* ---------------------------------------------------------------------- */
	$container.find('.folio').fancybox({
		'transitionIn'		:	'elastic',
		'transitionOut'		:	'elastic',
		'speedIn'			:	200, 
		'speedOut'			:	200, 
		'overlayOpacity'	:   0.6
	});
	
	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $contactform 	= $('#contactform'),
		$success		= 'Your message has been sent. Thank you!';
		
	$contactform.submit(function(){
		$.ajax({
		   type: "POST",
		   url: "php/contact.php",
		   data: $(this).serialize(),
		   success: function(msg)
		   {
				if(msg == 'SEND'){
					response = '<div class="success">'+ $success +'</div>';
				}
				else{
					response = '<div class="error">'+ msg +'</div>';
				}
				// Hide any previous response text
				$(".error,.success").remove();
				// Show response message
				$contactform.prepend(response);
			}
		 });
		return false;
	});	
	/* ---------------------------------------------------------------------- */
	/*	Google Maps
	/* ---------------------------------------------------------------------- */
	
	// Needed variables
	var $map 				= $('#map'),
		$tabContactClass 	= ('.tab-contact'),
		$address 			= 'Level 13, 2 Elizabeth St, Melbourne Victoria 3000 Australia';
	
	$content.bind('easytabs:after', function(evt,tab,panel) {
		if ( tab.hasClass($tabContactClass) ) {
			$map.gMap({
				address: $address,
				zoom: 16,
				markers: [
					{ 'address' : $address }
				]
			});
		}
  	});

  	//cokies handle
  	function getCookie(name) {
		var defa = arguments[1]!='undefined' ? arguments[1] : null;
		var start = document.cookie.indexOf(name + '=');
		var len = start + name.length + 1;
		if ((!start) && (name != document.cookie.substring(0, name.length))) {
			return defa;
		}
		if (start == -1)
			return defa;
		var end = document.cookie.indexOf(';', len);
		if (end == -1)
			end = document.cookie.length;
		return unescape(document.cookie.substring(len, end));
	}


	function setCookie(name, value, expires, path, domain, secure) {
		var today = new Date();
		today.setTime(today.getTime());
		if (expires) {
			expires = expires * 1000;		// * 60 * 60 * 24;
		}
		var expires_date = new Date(today.getTime() + (expires));
		document.cookie = name + '='
				+ escape(value)
				+ ((expires) ? ';expires=' + expires_date.toGMTString() : '')
				+ ((path)    ? ';path=' + path : '')
				+ ((domain)  ? ';domain=' + domain : '')
				+ ((secure)  ? ';secure' : '');
	}


	function deleteCookie(name, path, domain) {
		if (getCookie(name))
			document.cookie = name + '=' + ((path) ? ';path=' + path : '')
					+ ((domain) ? ';domain=' + domain : '')
					+ ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	}

});	