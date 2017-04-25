var App = ( function( $ )
{
	var infinitySlider = {

		init: function( $outline )
		{
			$outline.slick({
			  centerMode: true,
				autoplay: true,
				autoplaySpeed: 2000,
				slidesToShow: 1,
				variableWidth: true,
				arrows: false
			});
		}

	};

	var responsive = {
		isDesktopBreakPoint: function()
		{
			return parseInt($('.container').css('width')) >= 970;
		}
	};

	var scrolledHeader = {
		init: function()
		{
			$(window).scroll( function()
			{
			    if( $(window).scrollTop() > $(".igorsoloads-jumbotron").offset().top )
			    {
			        $(".igorsoloads-header").addClass("scrolled-header").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			        	$(".igorsoloads-header-menu").css("height","60px");
			        });
			    }
			    else
			    {
			    	$(".igorsoloads-header").removeClass("scrolled-header");
			        $(".igorsoloads-header-menu").attr("style","");
			    }
			});

		}
	};

	var faq = {
		init: function( $element, $publicElement )
		{
			$element.click( function( e )
			{
				var $parent = $( this ).parent();

				if( $parent.hasClass( "open") )
					$parent.removeClass("open");
				else
					$parent.addClass("open");

				$parent.children("p").slideToggle("normal");

				$(".igorsoloads-questions-question").not($parent).removeClass("open");
				$(".igorsoloads-questions-question").not($parent).children("p").slideUp("fast");
				e.preventDefault();
			});
		}
	};

	var showMore = {
		init: function()
		{
			$("#igorsoloads-offers-slider-items-showmore").click( function()
			{
				$(".igorsoloads-offers-slider-items-hidden").slideToggle();
			});
		}
	};

	var contact = {
		init: function()
		{
			$("#igorsoloads-contact").submit( function()
			{
				$form = $( this );
				var name 	= $form.find("[name=full-name]").val();
					name 	= name.split(" ");

				var firstName = name[0];
				delete name[0];

				var lastName  = name.join(" ");

				var data = {
					"firstName"	: firstName,
					"lastName"	: lastName,
					"email"		: $form.find("[name=email]").val(),
					"url"		: $form.find("[name=url]").val(),
					"target"	: $form.find("[name=target]").val(),
					"expirence" : $form.find("[name=expirence]:checked").val(),
					"additional": $form.find("[name=additional]").val()
				};

				$("#Field24").val( data['firstName'] );
				$("#Field25").val( data['lastName'] );
				$("#Field26").val( data['email'] );
				$("#Field8").val( data['url'] );
				$("#Field19").val( data['target'] );

				if( data['expirence'] == 1 )
					$("#Field21_0").attr("checked","checked");
				else if( data['expirence'] == 2 )
					$("#Field21_1").attr("checked","checked");
				else
					$("#Field21_2").attr("checked","checked");

				$("#Field22").val( data['additional'] );

				$("#igorsoloads-contact-sender").trigger("submit");
				return false;
			});
		}
	};

	var lightbox = {
		init: function()
		{
			var thisClass = this;

			$("[data-lightbox]").click( function( e )
			{
				var $this = $( this );
				var $lightboxModel = $( "#slider-lightbox" );

				thisClass._setLightboxContent( $this.attr("href") );

				$lightboxModel.modal("show");

				e.preventDefault();
			});

			$('#slider-lightbox').on('hidden.bs.modal', function () {
				$(".lightbox-content").html("");
			});
		},

		_setLightboxContent: function( url )
		{
			var $lightboxModel 		= $( "#slider-lightbox" );
			var $lightboxContent 	= $(".lightbox-content");

			if( this._getLightboxType( url ) == "img" )
				$lightboxContent.html("<img src='" + url + "' alt='' />");
			else
				$lightboxContent.html("<iframe width='758' height='458' src='https://www.youtube.com/embed/" + this._getYoutubeIdFromUrl( url ) + "?rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>");
		},

		_getLightboxType: function( url )
		{
		    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		    var matches = url.match(p);

		    if(matches)
		        return "youtube";

		    return "img";
		},

		_getYoutubeIdFromUrl: function( url )
		{
		    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		    var match = url.match(regExp);

		    if (match && match[2].length == 11) {
		        return match[2];
		    } else {
		        return 'error';
		    }
		}
	};

	var scrollspy = {
		init: function()
		{
			this._menuInit();

			$(window).on('activate.bs.scrollspy', function (e) {
			    history.replaceState({}, "", $("a[href^='#']", e.target).attr("href"));
			});
		},

		_menuInit: function()
		{
			$('.igorsoloads-header-menu-links a').bind('click', function(event) {
		        var $anchor = $(this);
		        $('html, body').stop().animate({
		            scrollTop: $($anchor.attr('href')).offset().top
		        }, 1500, 'easeInOutExpo', function()
		        {
		        	location.hash = $anchor.attr("href");
		        });
		        event.preventDefault();
		    });
		}
	};

	var textFontSize = {
		init: function()
		{
		    $(".igorsoloads-testimonials-slider-item").each( function()
		    {
		    	var $quote = $(this).find("p");
			    var $numWords = $quote.text().length;

			    if( $numWords > 73 )
			    	$quote.css("font-size","22.4px");

			    if( $numWords > 80 )
			    	$quote.css("font-size","21.4px");

			    if( $numWords > 90 )
			    	$quote.css("font-size","20.4px");

			    if( $numWords > 100 )
			    	$quote.css("font-size","19.4px");
		    });
		}
	};

	var letsGo = {
		init: function()
		{
			$(".igorsoloads-jumbotron-scroll").click( function()
			{
		        $('html, body').stop().animate({
		            scrollTop: $("#what-are-solo-ads").offset().top
		        }, 1500, 'easeInOutExpo', function()
		        {
		        	location.hash = "#what-are-solo-ads";
		        });
		        event.preventDefault();
			});
		}
	}

	return {
		init: function()
		{
			infinitySlider.init( $( ".igorsoloads-testimonials-slider-outline" ) );

			if( responsive.isDesktopBreakPoint() )
				scrolledHeader.init( );

			faq.init( $(".igorsoloads-questions-question > a"), $(".igorsoloads-questions-question") );
			showMore.init();
			contact.init();
			lightbox.init();
			scrollspy.init();
		 	textFontSize.init();
		 	letsGo.init();

		 	$('input, textarea').placeholder();
		}
	};

}( jQuery ) );

$( function()
{
	App.init();
});
