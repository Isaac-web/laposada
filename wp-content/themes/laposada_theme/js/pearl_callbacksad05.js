"use strict";
jQuery(document).ready(function () {
    //Global Valiables
    var BOOKING_PARAMS = [];
    var BOOKING_ROOMS = [];
    var ROOMS_SELECT_FOR_BOOKING = [];
    var CURRENT_ROOM = 1;
    var ajaxurl = scripts_constants.ajaxurl;
    var is_sticky = scripts_constants.is_sticky;
    var enable_preloader = scripts_constants.enable_preloader;
	var smooth_scroll	= scripts_constants.smooth_scroll;
	
	var responsive_menu_title	= scripts_constants.responsive_menu_title;
	var responsive_menu_copyright	= scripts_constants.responsive_menu_copyright;
	
    // init cubeportfolio
    jQuery('#grid-container').cubeportfolio({
        filters: '#filters-container',
        defaultFilter: '*',
        animationType: 'quicksand',
        gapHorizontal: 70,
        gapVertical: 35,
        gridAdjustment: 'responsive',
        mediaQueries: [{
                width: 800,
                cols: 3
            }, {
                width: 500,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
        caption: 'moveRight',
        displayType: 'bottomToTop',
        displayTypeSpeed: 400,
    });
    // init cubeportfolio
    /*jQuery('#grid-container2').cubeportfolio({
     filters: '#filters-container',
     defaultFilter: '*',
     animationType: 'quicksand',
     gapHorizontal: 70,
     gapVertical: 35,
     gridAdjustment: 'responsive',
     mediaQueries: [{
     width: 800,
     cols: 2
     }, {
     width: 500,
     cols: 2
     }, {
     width: 320,
     cols: 1
     }],
     caption: 'moveRight',
     displayType: 'bottomToTop',
     displayTypeSpeed: 400,
     });*/
    // init cubeportfolio
    /*jQuery('#grid-container4').cubeportfolio({
     filters: '#filters-container',
     defaultFilter: '*',
     animationType: 'quicksand',
     gapHorizontal: 70,
     gapVertical: 35,
     gridAdjustment: 'responsive',
     mediaQueries: [{
     width: 800,
     cols: 4
     }, {
     width: 500,
     cols: 2
     }, {
     width: 320,
     cols: 1
     }],
     caption: 'moveRight',
     displayType: 'bottomToTop',
     displayTypeSpeed: 400,
     });*/

    jQuery("#menu").mmenu({
        "classes": "mm-slide",
        "offCanvas": {
            "position": "right"
        },
        "footer": {
            "add": true,
            "title": responsive_menu_copyright,
        },
        "header": {
            "title": responsive_menu_title,
            "add": true,
            "update": true
        },
    });

    if (is_sticky == 'on') {
        // ---------- Header One ---------- //
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 1) {
                jQuery('.pearl-header-wrap').addClass("sticky");
            } else {
                jQuery('.pearl-header-wrap').removeClass("sticky");
            }
        });

        // ---------- Header Two ---------- //
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 1) {
                jQuery('.pearl-header-wrap').addClass("sticky");
            } else {
                jQuery('.pearl-header-wrap').removeClass("sticky");
            }
        });
    }
	
	if( smooth_scroll == 'on'  ) {
		// ---------- Smooth Scrol ---------- //
		jQuery(function() {
			var $window = jQuery(window); //Window object
			var scrollTime = 0.6; //Scroll time
			var scrollDistance = 355; //Distance. Use smaller value for shorter scroll and greater value for longer scroll
			$window.on("mousewheel DOMMouseScroll", function(event) {
				event.preventDefault();
				var delta = event.originalEvent.wheelDelta / 125 || -event.originalEvent.detail / 3;
				var scrollTop = $window.scrollTop();
				var finalScroll = scrollTop - parseInt(delta * scrollDistance);
				TweenMax.to($window, scrollTime, {
					scrollTo: {y: finalScroll, autoKill: true},
					ease: Power1.easeOut,
					autoKill: true,
					overwrite: 5
				});
			});
		});
	}
	
    //------About Hotel--------//
    jQuery("#tour").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
                // "singleItem:true" is a shortcut for:
                // items : 1, 
                // itemsDesktop : false,
                // itemsDesktopSmall : false,
                // itemsTablet: false,
                // itemsMobile : false
    });

    jQuery("#hotel-view").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
                // "singleItem:true" is a shortcut for:
                // items : 1, 
                // itemsDesktop : false,
                // itemsDesktopSmall : false,
                // itemsTablet: false,
                // itemsMobile : false
    });

    //-------Welcome Text---------//
    jQuery("#special-services").owlCarousel({
        items: 2,
        lazyLoad: true,
        navigation: true
    });

    if (enable_preloader == 'on') {
        //---------Preloader----------//
        jQuery(window).load(function () { // makes sure the whole site is loaded
            jQuery('#status').fadeOut(); // will first fade out the loading animation
            jQuery('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
            jQuery('body').delay(350).css({'overflow': 'visible'});
        });
    }

    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
            //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offset_opacity = 1200,
            //duration of the top scrolling animation (in ms)
            scroll_top_duration = 1400,
            //grab the "back to top" link
            $back_to_top = jQuery('.cd-top');
    //hide or show the "back to top" link
    jQuery(window).scroll(function () {
        (jQuery(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if (jQuery(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        jQuery('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration
                );
    });

    //smooth scroll
    jQuery('a[href^="#"]').on('click', function (event) {
        var target = jQuery(jQuery(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    //Accordian Action
    var action = 'click';
    var speed = "500";

    jQuery('li.close-bag').on(action, function () {
        //gets next element
        //opens .a of selected question
        jQuery(this).next().slideToggle(0)
                //selects all other answers and slides up any open answer
                .siblings('li.open-bag').slideUp();
        //Grab img from clicked question
        var img = jQuery(this).children('img');
        //Remove Rotate class from all images except the active
        jQuery('img').not(img).removeClass('rotate');
        //toggle rotate class
        img.toggleClass('rotate');
    }); //End on click

    jQuery('#example').countdown({
        date: '7/29/2016 23:59:59',
        offset: -8,
        day: 'Day',
        days: 'Days'
    }, function () {
        //alert('Done!');
    });

    jQuery("#blog-slide").owlCarousel({
        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
                // "singleItem:true" is a shortcut for:
                // items : 1, 
                // itemsDesktop : false,
                // itemsDesktopSmall : false,
                // itemsTablet: false,
                // itemsMobile : false
    });

    // JavaScript Document
    function checkcontact(input) {
        var pattern1 = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
        if (pattern1.test(input)) {
            return true;
        } else {
            return false;
        }
    }
    //Validate Contact Form
    function validateContact() {
        var errors = "";
        var name = document.getElementById("name");
        var email_address = document.getElementById("email_address");
        var msg = document.getElementById("msg");
        if (name.value == "" || name.value == "Your Name") {
            name.className = "error";
            return false;
        } else if (email_address.value == "" || email_address.value == "E-mail Address") {
            email_address.className = "last error";
            return false;
        } else if (checkcontact(email_address.value) == false) {
            email_address.className = "last error";
            return false;
        } else if (msg.value == "" || msg.value == "Message") {
            msg.className = "error";
            return false;
        } else {
            //document.coaches_form.submit();
            jQuery.ajax({
                type: "POST",
                url: "process.php",
                data: jQuery("#contact_form").serialize(),
                success: function (msg)
                {
                    // alert(msg);
                    document.getElementById("name").value = "Your Name";
                    document.getElementById("name").className = "";
                    document.getElementById("email_address").value = "E-mail Address";
                    document.getElementById("email_address").className = "last";
                    document.getElementById("msg").value = "Message";
                    document.getElementById("msg").className = "";
                    jQuery("#success_msg").fadeIn(2000);
                    jQuery("#contact_form").fadeOut(2000);
                }
            });
            setTimeout("jQuery('#success_msg').fadeOut();", 6000);
            setTimeout("jQuery('#contact_form').fadeIn();", 6000);
        }
    }
    function validateReservation() {
        var errors = "";
        var reserv_name = document.getElementById("reserv_name");
        var datepicker = document.getElementById("datepicker");
        var reserv_time = document.getElementById("reserv_time");
        var reserv_persons = document.getElementById("reserv_persons");
        var reserv_email = document.getElementById("reserv_email");
        var reserv_phone = document.getElementById("reserv_phone");

        if (reserv_name.value == "" || reserv_name.value == "Your Name") {
            errors += 'Please provide your name.<br />';
        } else if (datepicker.value == "" || datepicker.value == "Choose A Date") {
            errors += 'Please select a booking date.<br />';
        } else if (reserv_time.value == "" || reserv_time.value == "Choose A Time") {
            errors += 'Please select booking time.<br />';
        } else if (reserv_persons.value == "" || reserv_persons.value == "Persons") {
            errors += 'Please select number of persons.<br />';
        } else if (reserv_email.value == "" || reserv_email.value == "Email Address") {
            errors += 'Please provide an email address.<br />';
        } else if (checkcontact(reserv_email.value) == false) {
            errors += 'Please provide a valid email address.<br />';
        } else if (reserv_phone.value == "" || reserv_phone.value == "Phone No") {
            errors += 'Please provide your phone no.<br />';
        }

        if (errors) {
            document.getElementById("reserv_error").style.display = "block";
            document.getElementById("reserv_error").innerHTML = errors;
            //document.getElementById("bordered-hd").scrollIntoView();
            return false;
        } else {
            jQuery.ajax({
                type: "POST",
                url: "process.php",
                data: jQuery("#reserv_form").serialize(),
                success: function (msg)
                {
                    document.getElementById("reserv_error").style.display = "none";
                    var reserv_name = document.getElementById("reserv_name").value = "Your Name";
                    var datepicker = document.getElementById("datepicker").value = "";
                    var reserv_time = document.getElementById("reserv_time").value = "";
                    var reserv_persons = document.getElementById("reserv_persons").value = "";
                    var reserv_email = document.getElementById("reserv_email").value = "Email Address";
                    var reserv_phone = document.getElementById("reserv_phone").value = "Phone No";
                    jQuery("#reserv_success_msg").fadeIn(2000);
                    jQuery("#reserv_form").fadeOut(2000);
                }
            });
            setTimeout("jQuery('#reserv_success_msg').fadeOut();", 6000);
            setTimeout("jQuery('#reserv_form').fadeIn();", 6000);
        }
    }

    //Remove Error
    function remove_contact_errors() {
        var name = document.getElementById("name");
        var email_address = document.getElementById("email_address");
        var msg = document.getElementById("msg");
        if (name.value != "" && name.value != "Your Name") {
            name.className = "";
        }

        if (email_address.value != "" && email_address.value != "E-mail Address") {
            email_address.className = "";
        }

        if (checkcontact(email_address.value) != true) {
            email_address.className = "";
        }

        if (msg.value != "" && msg.value != "Message") {
            msg.className = "";
        }
    }
    //News letter Validate
    function validateNewsletter() {
        var errors = "";
        var nws_email_address = document.getElementById("nws_email_address");
        if (nws_email_address.value == "" || nws_email_address.value == "Enter your e-mail address") {
            nws_email_address.className = "error";
            return false;
        } else if (checkcontact(nws_email_address.value) == false) {
            nws_email_address.className = "error";
            return false;
        } else {
            //document.coaches_form.submit();
            jQuery.ajax({
                type: "POST",
                url: "process.php",
                data: jQuery("#newsletter_form").serialize(),
                success: function (msg)
                {
                    // alert(msg);
                    document.getElementById("nws_email_address").value = "Enter your e-mail address";
                    document.getElementById("nws_email_address").className = "";
                    jQuery("#nws_success_msg").fadeIn(2000);
                    jQuery("#newsletter_form").fadeOut(2000);
                }
            });
            setTimeout("jQuery('#nws_success_msg').fadeOut();", 6000);
            setTimeout("jQuery('#newsletter_form').fadeIn();", 6000);
        }
    }

    //NEw letter Errors
    function remove_newsletter_errors() {
        var nws_email_address = document.getElementById("nws_email_address");
        if (nws_email_address.value != "" && nws_email_address.value != "Enter your e-mail address") {
            nws_email_address.className = "";
        }
        if (checkcontact(nws_email_address.value) != true) {
            nws_email_address.className = "";
        }
    }


    /**/
    var date_custom_format = scripts_constants.date_format;
    jQuery(".select-style").heapbox();
    jQuery("#checkin-date").datepicker({
        inline: true,
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        dateFormat: date_custom_format,
        onSelect: function (dateText, inst) {
            jQuery(this).trigger('change');
            jQuery('#room-calender-rang').datepicker('refresh');
        },
        closeText: scripts_constants.closeText,
        currentText: scripts_constants.currentText,
        monthNames: scripts_constants.monthNames,
        monthNamesShort: scripts_constants.monthNamesShort,
        dayNames: scripts_constants.dayNames,
        dayNamesShort: scripts_constants.dayNamesShort,
        dayNamesMin: scripts_constants.dayNamesMin,
        firstDay: scripts_constants.firstDay
    });

    jQuery("#checkout-date").datepicker({
        inline: true,
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        dateFormat: date_custom_format,
        onSelect: function (dateText, inst) {
            jQuery(this).trigger('change');
            jQuery('#room-calender-rang').datepicker('refresh');
        },
        closeText: scripts_constants.closeText,
        currentText: scripts_constants.currentText,
        monthNames: scripts_constants.monthNames,
        monthNamesShort: scripts_constants.monthNamesShort,
        dayNames: scripts_constants.dayNames,
        dayNamesShort: scripts_constants.dayNamesShort,
        dayNamesMin: scripts_constants.dayNamesMin,
        firstDay: scripts_constants.firstDay
    });

    //Check-in Date Set
    jQuery(document).on('change', '#checkin-date, #total-nights', function () {
        var checkin_field = jQuery('#checkin-date');
        var checkout_field = jQuery('#checkout-date');
        var total_nights = jQuery('#total-nights').val();

        if (checkin_field.val()) {
            var check_out_date = jQuery('#checkin-date').datepicker('getDate', '+1d');
            check_out_date.setDate(check_out_date.getDate() + parseInt(total_nights));

            //check_out_date.setDate(check_out_date.getDate()+1); 
            jQuery('#checkout-date').datepicker('setDate', check_out_date);

            var check_out_min = checkin_field.datepicker('getDate', '+1d');
            check_out_min.setDate(check_out_min.getDate() + 1);
            checkout_field.datepicker('option', 'minDate', check_out_min);
            jQuery('#checkout-date').datepicker('setDate', check_out_date);
            jQuery('#room-calender-range').datepicker('refresh');
        }
        pearl_get_available_rooms();
    });

    //Check-out Date Set
    jQuery(document).on('change', '#checkout-date', function () {

        var check_in = jQuery('#checkin').datepicker('getDate');
        jQuery('#room-calender-range').datepicker('refresh');

        var checkin_field = jQuery('#checkin-date').datepicker('getDate');
        var checkout_field = jQuery('#checkout-date').datepicker('getDate');
        var date_diff = (checkout_field - checkin_field) / 86400000;
        if (checkin_field && date_diff > 0) {
            var total_nights = jQuery('#total-nights');
            if (total_nights.children('option[value="' + date_diff + '"]').length == 0) {
                total_nights.append('<option value="' + date_diff + '" >' + date_diff + '</option>')
            }
            jQuery('#total-nights').val(date_diff);
        }

    });

    //Range Calender
    jQuery("#room-calender-range").datepicker({
        minDate: 0,
        dateFormat: date_custom_format,
        numberOfMonths: [1, 2],
        beforeShowDay: function (date) {
            var check_in = jQuery.datepicker.parseDate(date_custom_format, jQuery("#checkin-date").val());
            var check_out = jQuery.datepicker.parseDate(date_custom_format, jQuery("#checkout-date").val());
            return [true, check_in && ((date.getTime() == check_in.getTime()) || (check_out && date >= check_in && date <= check_out)) ? "date-range-bg" : ""];
        },
        onSelect: function (dateText, inst) {
            var check_in = jQuery.datepicker.parseDate(date_custom_format, jQuery("#checkin-date").val());
            var check_out = jQuery.datepicker.parseDate(date_custom_format, jQuery("#checkout-date").val());
            if (!check_in || check_out) {
                jQuery("#checkin-date").datepicker('setDate', dateText);
                jQuery("#checkout-date").val('');
            } else {
                jQuery("#checkout-date").datepicker('setDate', dateText).trigger('change');
            }
        },
        closeText: scripts_constants.closeText,
        currentText: scripts_constants.currentText,
        monthNames: scripts_constants.monthNames,
        monthNamesShort: scripts_constants.monthNamesShort,
        dayNames: scripts_constants.dayNames,
        dayNamesShort: scripts_constants.dayNamesShort,
        dayNamesMin: scripts_constants.dayNamesMin,
        firstDay: scripts_constants.firstDay

    });


    jQuery(document).on('change', '#total-rooms', function () {
        var total_rooms = parseInt(jQuery(this).val());
        var list_rooms = jQuery('.rooms-person-data');
        var room_diff = total_rooms - list_rooms.children().length;

        console.log(total_rooms);

        if (room_diff > 0) {
            for (var i = 0; i < room_diff; i++) {
                var new_item = list_rooms.children(':first-child').clone().hide();
                new_item.find('select').prop('selectedIndex', 0);
                new_item.find('.bt-room-number span').html(list_rooms.children().length + 1);
                new_item.appendTo(list_rooms).slideDown(250);
            }
        } else if (room_diff < 0) {
            list_rooms.children().slice(room_diff).slideUp(250, function () {
                jQuery(this).remove();
            });
        }
    });
    jQuery(document).on('change', '.booking-field', function () {
        pearl_get_available_rooms();
    });

    jQuery(document).on('click', '.select-room-for-booking', function () {
        var room_id = jQuery(this).data('room_id');
        var room_name = jQuery(this).data('room_name');
        jQuery('.pearl-active-booking input.pearl_room_id').val(room_id);
        jQuery('.pearl-active-booking input.pearl_room_name').val(room_name);

        if (jQuery('#total-rooms').val() >= CURRENT_ROOM) {
            pearl_add_room_to_booking(room_id);
        } else {

        }

    });

    function pearl_get_available_rooms() {

        jQuery('.breadcrumb-your-room').addClass('selected');
        jQuery('.breadcrumb-place-reservation').removeClass('selected');
        jQuery('.breadcrumb-confirmation').removeClass('selected');

        jQuery.each(jQuery('.booking-form-data').serializeArray(), function (i, field) {
            BOOKING_PARAMS[field.name] = field.value;
        });

        jQuery('.booking-process-extras').html('');
        //jQuery('.booking-process-rooms').html('Loading...');
        //jQuery('.th-hotalrooms').html('Loading...');

        jQuery('.booking-process-rooms').fadeTo("slow", 0.5).html('Loading...');
        jQuery('.room-booking-wrapper').fadeTo("slow", 0.5).html('Loading...');
        var data = jQuery('.booking-form-data').serialize();
        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: jQuery('.booking-form-data').serialize() + "&action=pearl_get_available_rooms",
            success: function (response)
            {
//                jQuery('.th-hotalrooms').html(response);
                if (response.step == 2) {
                    jQuery('.room-booking-wrapper').html(response.get_next_step);
                } else {
                    jQuery('.room-booking-wrapper').html(response.available_rooms);
                }
                jQuery('.booking-process-rooms').html(response.booking_form_data);
                jQuery('.room-booking-wrapper').fadeTo("slow", 1);
                jQuery('.booking-process-rooms').fadeTo("slow", 1);
            }
        });
    }
    function pearl_add_room_to_booking(room_id) {
        jQuery('.pearl_current_room').val(parseInt(jQuery('.pearl_current_room').val()) + 1);
        var data = jQuery('.booking-form-data').serialize() + "&room_id=" + room_id + "&action=pearl_booking_cart";
        //jQuery('.room-booking-wrapper').fadeTo("slow", 0.5);
        // jQuery('.booking-process-rooms').fadeTo("slow", 0.5);
        jQuery('.room-booking-wrapper').append("<div class='preloader-wrap'><div class='pearl-loader'>Loading...</div></div>");

        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: data,
            success: function (response)
            {
                jQuery('.room-booking-wrapper').find('.preloader-wrap').remove();
                if (response.step == 2) {
                    jQuery('.room-booking-wrapper').html(response.get_next_step);
                } else {
                    jQuery('.room-booking-wrapper').html(response.available_rooms);
                }

                jQuery('.booking-process-rooms').html(response.booking_form_data);
                jQuery('.room-booking-wrapper').fadeTo("slow", 1);
                jQuery('.booking-process-rooms').fadeTo("slow", 1);
            }
        });
    }
    jQuery(document).on('click', '.pearl-bt-edit-room', function () {
        var room_id = jQuery(this).data('room_id');
        var row_id = jQuery(this).data('row_id');
        //debugger;
        var room_id = jQuery(this).siblings('input.pearl_room_id').val();
        jQuery(this).siblings('input').val('');
//        jQuery('.pearl_current_room').val( parseInt(jQuery('.pearl_current_room').val())+ 1  );
        var data = jQuery('.booking-form-data').serialize() + "&row_id=" + row_id + "&action=pearl_booking_cart";

        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: data,
            success: function (response)
            {
                if (response.step == 2) {

                    jQuery('.room-booking-wrapper').html(response.get_next_step);
                } else {
                    jQuery('.room-booking-wrapper').html(response.available_rooms);
                }
                jQuery('.booking-process-rooms').html(response.booking_form_data);
                jQuery('.room-booking-wrapper').fadeTo("slow", 1);
                jQuery('.booking-process-rooms').fadeTo("slow", 1);
            }
        });
    });
    jQuery(document).on('click', '.edit-room-availability', function () {
        jQuery('.breadcrumb-your-room').addClass('selected');
        jQuery('.breadcrumb-place-reservation').removeClass('selected');
        jQuery('.breadcrumb-confirmation').removeClass('selected');

        jQuery('.booking-form').show('slow');
        jQuery('.price-breakdown-form').hide("slow");
        pearl_get_available_rooms();
    });

    jQuery(document).on('change', '.pearl-extras-checkbox', function () {
        //jQuery(this).parents('li').find('.pearl-extras-checkbox-field').prop('disabled', jQuery(this).prop('checked') != true);
        jQuery(this).parents('li').find('.form-control').prop('disabled', jQuery(this).prop('checked') != true);
    });
    /*jQuery(document).on('click', '.process-booking', function () {
     
     });*/
    jQuery(document).on('click', '.process-booking', function () {

        var data = jQuery('.booking-form-data').serialize() + "&action=pearl_get_booking_form";
        data = data + "&" + jQuery('.pearl-booking-extras-form').serialize();
        jQuery('.room-booking-wrapper').append("<div class='preloader-wrap'><div class='pearl-loader'>Loading...</div></div>");
        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: data,
            success: function (response)
            {
                jQuery('.breadcrumb-your-room').addClass('selected');
                jQuery('.breadcrumb-place-reservation').addClass('selected');
                jQuery('.breadcrumb-confirmation').removeClass('selected');

                // jQuery('.room-booking-wrapper').find('.preloader-wrap').remove();
                jQuery('.booking-process-rooms').hide('slow');
                jQuery('.booking-form').hide('slow');
                jQuery('.room-booking-wrapper').html(response.payment_form);
                jQuery('.booking-process-rooms').html(response.booking_form_data);
                jQuery('.booking-process-extras').html(response.extras);
                jQuery('.price-breakdown-form').html(response.booking_details);
                jQuery('.price-breakdown-form').fadeIn('slow');
                scroll_page_to_booking();

            }
        });
    });

    jQuery(document).on('click', '.pay-now-with-email', function () {

        var data = jQuery('.booking-form-data').serialize() + "&action=pearl_process_booking";
        data = data + "&" + jQuery('.guest-details-form').serialize();
        data = data + "&" + 'payment_method=email';
        jQuery('.room-booking-wrapper').fadeTo("slow", 0.5);
        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: data,
            success: function (response)
            {
                jQuery('.booking-form').hide('slow');
                jQuery('.room-booking-wrapper').html(response.booking_form_data);
                jQuery('.booking-process-rooms').html(response.booking_form_data);
                jQuery('.price-breakdown-form').fadeTo("slow", 1);
                jQuery('.room-booking-wrapper').fadeTo("slow", 1);
                jQuery('.booking-process-rooms').fadeTo("slow", 1);
                jQuery('.price-breakdown-form').fadeIn('slow');
            }
        });

    });
    jQuery(document).on('click', '.pay-now-with-email', function () {

        jQuery('.breadcrumb-your-room').addClass('selected');
        jQuery('.breadcrumb-place-reservation').addClass('selected');
        jQuery('.breadcrumb-confirmation').addClass('selected');

        var data = jQuery('.booking-form-data').serialize() + "&action=pearl_process_booking";
        data = data + "&" + jQuery('.guest-details-form').serialize();
        data = data + "&" + 'payment_method=email';
        jQuery('.room-booking-wrapper').fadeTo("slow", 0.5);
        jQuery.ajax({
            type: "POST",
            url: ajaxurl,
            data: data,
            success: function (response)
            {
                jQuery('.booking-form').hide('slow');
                jQuery('.room-booking-wrapper').html(response.booking_form_data);
                jQuery('.booking-process-rooms').html(response.booking_form_data);
                jQuery('.price-breakdown-form').fadeTo("slow", 1);
                jQuery('.room-booking-wrapper').fadeTo("slow", 1);
                jQuery('.booking-process-rooms').fadeTo("slow", 1);
            }
        });

    });
    //    jQuery(document).on('click', '.init-booking', function () {
    //
    //        var data = jQuery('.booking-form-data').serialize() + "&action=pearl_process_booking";
    //        data = data + "&" + jQuery('.guest-details-form').serialize();
    //        data = data + "&" + 'payment_method=' + jQuery(this).data('payment_method');
    //        jQuery('.room-booking-wrapper').fadeTo("slow", 0.5);
    //        jQuery.ajax({
    //            type: "POST",
    //            url: ajaxurl,
    //            data: data,
    //            success: function (response)
    //            {
    //                jQuery('.booking-form').hide('slow');
    //                jQuery('.room-booking-wrapper').html(response.booking_form_data);
    //                jQuery('.booking-process-rooms').html(response.booking_form_data);
    //                jQuery('.price-breakdown-form').fadeTo("slow", 1);
    //                jQuery('.room-booking-wrapper').fadeTo("slow", 1);
    //                jQuery('.booking-process-rooms').fadeTo("slow", 1);
    //            }
    //        });
    //
    //    });

    jQuery(document).on('click', '.pearl-confirm-order', function () {
        //

        jQuery.confirm({
            'title': scripts_constants.confirm_order_title,
            'message': scripts_constants.confirm_order,
            'buttons': {
                'Yes': {
                    'class': 'blue',
                    'action': function () {
                        jQuery('.breadcrumb-your-room').addClass('selected');
                        jQuery('.breadcrumb-place-reservation').addClass('selected');
                        jQuery('.breadcrumb-confirmation').addClass('selected');
                        jQuery('.room-booking-wrapper').append("<div class='preloader-wrap'><div class='pearl-loader'>Loading...</div></div>");

                        var action = jQuery('.pearl-confirm-order-form').attr('action');
                        var data = jQuery('.pearl-confirm-order-form').serialize() + "&action=pearl_confirm_order";
                        jQuery('.edit-room-availability').hide("normal");
                        jQuery.ajax({
                            type: "POST",
                            url: ajaxurl,
                            data: data,
                            dataType: "json",
                            success: function (response)
                            {
                                jQuery('body').find('.preloader-wrap').remove();
                                jQuery('body').find('.pearl-loader').remove();
                                if (response.type == 'success') {
                                    if (response.method == 'email') {
                                        jQuery('body').find('.pearl-loader').remove();
                                        jQuery('.booking-confirm-wrap').remove();
                                        jQuery('.confirmation.final-step').fadeIn(200);
                                    } else if (response.method == 'stripe') {
                                        console.log(response);
                                        var obj = [];
                                        jQuery.each(response, function (index, element) {
                                            obj[index] = element;
                                        });

                                        var handler = StripeCheckout.configure({
                                            key: obj.key,
                                            token: function (token) {
                                                jQuery('body').append("<div class='pearl-loader'>Loading...</div>");
                                                jQuery.ajax({
                                                    type: "POST",
                                                    url: ajaxurl,
                                                    data: {
                                                        'action': 'pearl_complete_stripe_payment',
                                                        'booking_id': obj.booking_id,
                                                        'method': obj.method,
                                                        'type': obj.type,
                                                        'email': obj.email,
                                                        'payment_method': obj.payment_method,
                                                        'description': obj.description,
                                                        'process': '',
                                                        'name': obj.name,
                                                        'amount': obj.amount,
                                                        'total_amount': obj.total_amount,
                                                        'token': token,
                                                    },
                                                    dataType: "json",
                                                    success: function (response) {
                                                        jQuery('body').find('.pearl-loader').remove();
                                                        jQuery('body').find('.preloader-wrap').remove();
                                                        jQuery('.booking-confirm-wrap').remove();
                                                        jQuery('.confirmation.final-step').fadeIn(200);
                                                        handler.close();
                                                    }
                                                });
                                            }
                                        });

                                        handler.open({
                                            name: obj.name,
                                            description: obj.description,
                                            amount: obj.amount,
                                            email: obj.email,
                                            currency: obj.currency,
                                            allowRememberMe: false,
                                            opened: function () {
                                                //Some Action
                                            },
                                            closed: function () {
                                                //Reload
                                            }
                                        });


                                        /*jQuery(window).on('popstate', function() {
                                         handler.close();
                                         });*/
                                    } else {
                                        jQuery('body').find('.preloader-wrap').remove();
                                        jQuery('body').find('.pearl-loader').remove();
                                        jQuery('body').append(response.form_data);
                                    }

                                } else {
                                    jQuery.sticky(response.message, {classList: 'important', speed: 200, autoclose: 5000, position: 'top-right', });
                                }
                            }
                        });
                    }
                },
                'No': {
                    'class': 'gray',
                    'action': function () {
                        return false;
                    }	// Nothing to do in this case. You can as well omit the action property.
                }
            }
        });

    });
    jQuery(document).on('click', '.init-booking', function () {
        //Validate form
        jQuery('.breadcrumb-your-room').addClass('selected');
        jQuery('.breadcrumb-place-reservation').addClass('selected');
        jQuery('.breadcrumb-confirmation').removeClass('selected');

        var validated = false;
        validated = pearl_booking_form_validation();
        if (validated) {
            var data = jQuery('.booking-form-data').serialize() + "&action=pearl_process_booking";
            data = data + "&" + jQuery('.guest-details-form').serialize();
            data = data + "&" + 'payment_method=' + jQuery(this).data('payment_method');
            jQuery('.room-booking-wrapper').fadeTo("slow", 0.5);
            jQuery.ajax({
                type: "POST",
                url: ajaxurl,
                data: data,
                success: function (response)
                {
                    //jQuery('.booking-form').show('slow');
                    jQuery('.room-booking-wrapper').html(response.booking_completion);
                    jQuery('.price-breakdown-form').fadeTo("slow", 1);
                    jQuery('.room-booking-wrapper').fadeTo("slow", 1);
                    jQuery('.booking-process-rooms').html('');
//                    jQuery('.price-breakdown-form').html('');
                    scroll_page_to_booking();
                    jQuery('.pearl_current_room').val(1);
                }
            });
        }

    });

    //Deposit Payment
    jQuery(document).on('change', '.booking-deposit-info input[name="pay_amount"]', function () {
        if (jQuery(this).val() == 'half') {
            jQuery('.half-price-data').fadeIn(200);
        } else {
            jQuery('.half-price-data').fadeOut(200);
        }
    });
	
	//Mailchimp newsletter
	jQuery(document).on('click','.subscribe_newsletter',function(event){
		'use strict';
		event.preventDefault();
		$ = jQuery;
		var $this	= jQuery(this);
		var counter	= jQuery(this).data('counter');
		$this.find('i.fa-refresh').remove();
		$this.append("<i class='fa fa-refresh fa-spin'></i>");
		$this.addClass('loading');
		jQuery('#newsletter_message_' + counter).hide();
		jQuery('#newsletter_message_' + counter+" .mailchimp-message").removeClass('alert alert-success');
		jQuery('#newsletter_message_' + counter+" .mailchimp-message").removeClass('alert alert-danger');
		
		jQuery.ajax({
			type: 'POST',
			url: ajaxurl,
			data:jQuery(this).parents('form').serialize()+'&action=pearl_subscribe_mailchimp', 
			dataType:"json",
			success: function (response) {
				$this.find('i.fa-refresh').remove();
				$this.removeClass('loading');
				if( response.type == 'success' ){
					jQuery('#newsletter_message_' + counter+" .mailchimp-message").addClass('alert alert-success');
					jQuery('#mailchimpwidget_' + counter).get(0).reset();
					jQuery('#newsletter_message_' + counter).fadeIn(600);
					jQuery('#newsletter_message_' + counter+" .mailchimp-message").html(response.message);
					jQuery('#newsletter_' + counter).html('');
					
				} else{
					jQuery('#newsletter_message_' + counter+" .mailchimp-message").addClass('alert alert-danger');
					jQuery('#newsletter_message_' + counter).fadeIn(600);
					jQuery('#newsletter_message_' + counter+" .mailchimp-message").html(response.message);
					jQuery('#newsletter_' + counter).html('');
					
				}
			   
			}
		});
	});

}); // end ready

function select_your_rooms_breadcrumbs() {
    jQuery('.breadcrumb-your-room').addClass('selected');
    jQuery('.breadcrumb-place-reservation').removeClass('selected');
    jQuery('.breadcrumb-confirmation').removeClass('selected');

}
function scroll_page_to_booking() {
    jQuery('html, body').animate({
        scrollTop: jQuery(".room-booking-wrapper").offset().top - 100
    }, 700);
}
// Validate booking form
function pearl_booking_form_validation() {
    var first_name_required = scripts_constants.first_name_required;
    var last_name_required = scripts_constants.last_name_required;
    var email_required = scripts_constants.email_required;
    var valid_email_required = scripts_constants.valid_email_required;
    var phone_required = scripts_constants.phone_required;

    var _first_name = jQuery('.guest-details-form input#first_name').val();
    var _last_name = jQuery('.guest-details-form input#last_name').val();
    var _email = jQuery('.guest-details-form input#email').val();
    var _phone = jQuery('.guest-details-form input#phone').val();

    var validated = true;
    if (_first_name.length == 0) {
        jQuery.sticky(first_name_required, {classList: 'important', speed: 200, autoclose: 5000, position: 'top-right', });
        validated = false;
        pearl_goToByScroll('booking-from-wrap');
    } else if (_last_name.length == 0) {
        jQuery.sticky(last_name_required, {classList: 'important', speed: 200, autoclose: 5000, position: 'top-right', });
        validated = false;
        pearl_goToByScroll('booking-from-wrap');
    } else if (_email.length == 0) {
        jQuery.sticky(email_required, {classList: 'important', speed: 200, autoclose: 5000, position: 'top-right', });
        validated = false;
        pearl_goToByScroll('booking-from-wrap');

    } else if (!validateEmail(_email)) {
        jQuery.sticky(valid_email_required, {classList: 'important', speed: 200, autoclose: 5000, position: 'top-right', });
        validated = false;
        pearl_goToByScroll('booking-from-wrap');
    } else if (_phone.length == 0) {
        jQuery.sticky(phone_required, {classList: 'important', speed: 200, autoclose: 5000, position: 'top-right', });
        validated = false;
        pearl_goToByScroll('booking-from-wrap');
    }
    return validated;
}
//Scroll To Div
function pearl_goToByScroll(id) {
    jQuery('html, body').animate({
        scrollTop: jQuery("#" + id).offset().top
    }, 600);
}

// Validate Emial Address
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/*
 Sticky v2.1.2 by Andy Matthews
 http://twitter.com/commadelimited
 
 forked from Sticky by Daniel Raftery
 http://twitter.com/ThrivingKings
 */
(function ($) {
    $.sticky = $.fn.sticky = function (note, options, callback) {
        // allow options to be ignored, and callback to be second argument
        if (typeof options === 'function')
            callback = options;

        // generate unique ID based on the hash of the note.
        var hashCode = function (str) {
            var hash = 0,
                    i = 0,
                    c = '',
                    len = str.length;
            if (len === 0)
                return hash;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + c;
                hash &= hash;
            }
            return 's' + Math.abs(hash);
        },
                o = {
                    position: 'top-right', // top-left, top-right, bottom-left, or bottom-right
                    speed: 'fast', // animations: fast, slow, or integer
                    allowdupes: true, // true or false
                    autoclose: 5000, // delay in milliseconds. Set to 0 to remain open.
                    classList: '' // arbitrary list of classes. Suggestions: success, warning, important, or info. Defaults to ''.
                },
        uniqID = hashCode(note), // a relatively unique ID
                display = true,
                duplicate = false,
                tmpl = '<div class="sticky-message-bar sticky border-POS CLASSLIST" id="ID"><span class="sticky-close"></span><p class="sticky-note">NOTE</p></div>',
                positions = ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'];

        // merge default and incoming options
        if (options)
            $.extend(o, options);

        // Handling duplicate notes and IDs
        $('.sticky').each(function () {
            if ($(this).attr('id') === hashCode(note)) {
                duplicate = true;
                if (!o.allowdupes)
                    display = false;
            }
            if ($(this).attr('id') === uniqID)
                uniqID = hashCode(note);
        });

        // Make sure the sticky queue exists
        if (!$('.sticky-queue').length) {
            $('body').append('<div class="sticky-queue ' + o.position + '">');
        } else {
            // if it exists already, but the position param is different,
            // then allow it to be overridden
            $('.sticky-queue').removeClass(positions.join(' ')).addClass(o.position);
        }

        // Can it be displayed?
        if (display) {
            // Building and inserting sticky note
            $('.sticky-queue').prepend(
                    tmpl
                    .replace('POS', o.position)
                    .replace('ID', uniqID)
                    .replace('NOTE', note)
                    .replace('CLASSLIST', o.classList)
                    ).find('#' + uniqID)
                    .slideDown(o.speed, function () {
                        display = true;
                        // Callback function?
                        if (callback && typeof callback === 'function') {
                            callback({
                                'id': uniqID,
                                'duplicate': duplicate,
                                'displayed': display
                            });
                        }
                    });

        }

        // Listeners
        $('.sticky').ready(function () {
            // If 'autoclose' is enabled, set a timer to close the sticky
            if (o.autoclose) {
                $('#' + uniqID).delay(o.autoclose).fadeOut(o.speed, function () {
                    // remove element from DOM
                    $(this).remove();
                });
            }
        });

        // Closing a sticky
        $('.sticky-close').on('click', function () {
            $('#' + $(this).parent().attr('id')).dequeue().fadeOut(o.speed, function () {
                // remove element from DOM
                $(this).remove();
            });
        });

    };
})(jQuery);


/* ---------------------------------------
 Confirm Box
 --------------------------------------- */
(function ($) {

    $.confirm = function (params) {

        if ($('#confirmOverlay').length) {
            // A confirm is already shown on the page:
            return false;
        }

        var buttonHTML = '';
        $.each(params.buttons, function (name, obj) {

            // Generating the markup for the buttons:

            buttonHTML += '<a href="#" class="button ' + obj['class'] + '">' + name + '<span></span></a>';

            if (!obj.action) {
                obj.action = function () {
                };
            }
        });

        var markup = [
            '<div id="confirmOverlay">',
            '<div id="confirmBox">',
            '<h1>', params.title, '</h1>',
            '<p>', params.message, '</p>',
            '<div id="confirmButtons">',
            buttonHTML,
            '</div></div></div>'
        ].join('');

        $(markup).hide().appendTo('body').fadeIn();

        var buttons = $('#confirmBox .button'),
                i = 0;

        $.each(params.buttons, function (name, obj) {
            buttons.eq(i++).click(function () {

                // Calling the action attribute when a
                // click occurs, and hiding the confirm.

                obj.action();
                $.confirm.hide();
                return false;
            });
        });
    }

    $.confirm.hide = function () {
        $('#confirmOverlay').fadeOut(function () {
            $(this).remove();
        });
    }

})(jQuery);