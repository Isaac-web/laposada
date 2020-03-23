(function ($) {
    'use strict';

    /**
     * All of the code for your public-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
     *
     * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
     *
     * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */
	
	// End mediaUpload

	
	
	

    /*
     * @Contact Form
     * @return{}
     */
    jQuery(document).on('click', '.contact_now', function(e) {
        e.preventDefault();
        var $this = jQuery(this);

        var success = $this.parents('.contact_form').find('.form-data').data('success');
        var error = $this.parents('.contact_form').find('.form-data').data('error');
        var email = $this.parents('.contact_form').find('.form-data').data('email');

        var serialize_data = $this.parents('.contact_wrap').find('.contact_form').serialize();
        var dataString = serialize_data + '&success=' + success + '&error=' + error + '&email=' + email + '&action=pearl_submit_contact';

        var errors = "";
        var username = $this.parents('.contact_wrap').find("#name").val();
        var useremail = $this.parents('.contact_wrap').find("#email_address").val();
        var description = $this.parents('.contact_wrap').find("#description").val();

        if (username == "" || username == "Your Name") {
            errors += 'Please provide your name.<br />';
        } else if (useremail == "" || useremail == "E-mail Address") {
            errors += 'Please provide an email address.<br />';
        } else if (validate_email(useremail) == false) {
            errors += 'Please provide a valid email address.<br />';
        } else if (description == "" || description == "Message") {
            errors += 'Please add description.<br />';
        }

        $this.parents('.contact_wrap').find('.message_contact').html('').hide();
        $this.parent('.contact-me').append("<i class='fa fa-refresh fa-spin'></i>");
        $this.parents('.contact_wrap').find('.message_contact').removeClass('alert-success');
        $this.parents('.contact_wrap').find('.message_contact').removeClass('alert-danger');

        if (errors) {
            $this.parents('.contact_wrap').find('.message_contact').html(errors);
            $this.parents('.contact_wrap').find('.message_contact').addClass('alert alert-danger').show();
			$this.parent('.contact-me').find('i.fa-refresh').remove();
            return false;
        }

        jQuery.ajax({
            type: "POST",
            url: scripts_constants.ajaxurl,
            data: dataString,
            dataType: "json",
            success: function(response) {
                $this.parent('.contact-me').find('i.fa-refresh').remove();
                jQuery('.message_contact').show();
                if (response.type == 'error') {
                    $this.parents('.contact_wrap').find('.message_contact').addClass('alert alert-danger').show();
                    $this.parents('.contact_wrap').find('.message_contact').html(response.message);
                } else {
                    $this.parents('.contact_wrap').find('.contact_form').get(0).reset();
                    $this.parents('.contact_wrap').find('.message_contact').addClass('alert alert-success').show();
                    $this.parents('.contact_wrap').find('.message_contact').html(response.message);
                }
            }
        });

        return false;

    });
	
    /*
     * @Booking
     * @return{}
     */
    jQuery(document).on('click', '.book_order', function(e) {
        e.preventDefault();
        var $this = jQuery(this);

        var serialize_data = $this.parents('.order_booking').find('.booking_from').serialize();
        var dataString = serialize_data + '&action=pearl_add_booking';

        jQuery('.message_booking').hide();
        $this.parents('.order_booking').find('.message_contact').html('').hide();
        $this.parent('.loading-order').append("<i class='fa fa-refresh fa-spin'></i>");
        $this.parents('.order_booking').find('.message_booking').removeClass('alert-success');
        $this.parents('.order_booking').find('.message_booking').removeClass('alert-danger');

        var errors = "";
        var reserv_name = $this.parents('.order_booking').find("#reserv_name").val();
        var datepicker = $this.parents('.order_booking').find("#datepicker").val();
        var reserv_time = $this.parents('.order_booking').find("#reserv_time").val();
        var reserv_persons = $this.parents('.order_booking').find("#reserv_persons").val();
        var reserv_email = $this.parents('.order_booking').find("#reserv_email").val();
        var reserv_phone = $this.parents('.order_booking').find("#reserv_phone").val();

        if (reserv_name == "" || reserv_name == "Your Name") {
            errors += '<p>Please provide your name.</p>';
        } else if (datepicker == "" || datepicker == "Choose A Date") {
            errors += '<p>Please select a booking date</p>';
        } else if (reserv_time == "" || reserv_time == "Choose A Time") {
            errors += '<p>Please select booking time.</p>';
        } else if (reserv_persons == "" || reserv_persons == "Persons") {
            errors += '<p>Please select number of persons.</p>';
        } else if (reserv_email == "" || reserv_email == "Email Address") {
            errors += '<p>Please provide an email address.</p>';
        } else if (validate_email(reserv_email) == false) {
            errors += '<p>Please provide a valid email address.</p>';
        } else if (reserv_phone == "" || reserv_phone == "Phone No") {
            errors += '<p>Please provide your phone no.</p>';
        }

        if (errors) {
            $this.parents('.order_booking').find('.message_booking').html(errors);
            $this.parents('.order_booking').find('.message_booking').addClass('alert alert-danger').show();
            $this.parent('.loading-order').find('i.fa-refresh').remove();
            return false;
        }

        jQuery.ajax({
            type: "POST",
            url: scripts_constants.ajaxurl,
            data: dataString,
            dataType: "json",
            success: function(response) {
                $this.parent('.loading-order').find('i.fa-refresh').remove();
                jQuery('.message_booking').show();
                if (response.type == 'error') {
                    $this.parents('.order_booking').find('.message_booking').addClass('alert alert-danger').show();
                    $this.parents('.order_booking').find('.message_booking').html(response.message);
                } else {
                    $this.parents('.order_booking').find('.booking_from').get(0).reset();
                    $this.parents('.order_booking').find('.message_booking').addClass('alert alert-success').show();
                    $this.parents('.order_booking').find('.message_booking').html(response.message);
                }
            }
        });

        return false;

    });
	
	
	


	jQuery(function() {
		var Accordion = function(el, multiple) {
			this.el = el || {};
			this.multiple = multiple || false;
	
			// Variables privadas
			var links = this.el.find('.link');
			// Evento
			links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
		}
	
		Accordion.prototype.dropdown = function(e) {
			var $el = e.data.el;
			var $this = jQuery(this),
				$next = $this.next();
	
			$next.slideToggle();
			$this.parent().toggleClass('open');
	
			if (!e.data.multiple) {
				$el.find('.booking-form').not($next).slideUp().parent().removeClass('open');
			};
		}	
	
		var accordion = new Accordion(jQuery('#booking-accordion'), false);
	});
	
})(jQuery);

/*
 * @check email
 * @return{}
 */
function validate_email(email) {
	var pattern1 = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

	if (pattern1.test(email)) {
		return true;
	} else {
		return false;
	}
}
/*
 * @get absolute path
 * @return{}
 */
function getAbsolutePath() {
	var loc = window.location;
	var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
	return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}



//Map Styles
function pearl_get_map_styles(style){
		var styles = '';
		if(style == 'view_1'){
			var styles = [{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"simplified"},{"hue":"#ff0000"}]}];
		}else if(style == 'view_2'){
			var styles = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}];
		}else if(style == 'view_3'){
			var styles = [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}];
		
		}else if(style == 'view_4'){
			var styles = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}];
		
		}else if(style == 'view_5'){
			var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
		
		}else if(style == 'view_6'){
			var styles = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
		} else if(style == 'view_7'){
		
		var styles = [{"featureType":"landscape","elementType":"all","stylers":[{"saturation":50.2},{"lightness":-34.8},{"gamma":1},{"color":"#f4b400"}]},{"featureType":"landscape","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":54.2},{"lightness":-14.4},{"gamma":1}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#FFAD00"},{"saturation":-19.8},{"lightness":-1.8},{"gamma":1}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#FFAD00"},{"saturation":72.4},{"lightness":-32.6},{"gamma":1}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#FFAD00"},{"saturation":74.4},{"lightness":-18},{"gamma":1}]},{"featureType":"water","elementType":"all","stylers":[{"saturation":-63.2},{"lightness":38},{"gamma":1},{"color":"#fcfcfc"}]}];
		
		}
		return styles;
}


( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		
		window.addEventListener( 'hashchange', function() {
			var element = document.getElementById( location.hash.substring( 1 ) );

			if ( element ) {
				if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) )
					element.tabIndex = -1;

				element.focus();
			}
		}, false );
	}
})();