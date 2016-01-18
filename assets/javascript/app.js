$(function() {

///////////MODULARIZED FUNCTIONS///////////////////////////////////////	

	function handleError(result) {
		if (getNewMarsRoverImage) {
			$('#error-message-mars').html("<span class='glyphicon glyphicon-alert'></span> There is no imagery available for the selected rover/camera combination at this time. <span class='glyphicon glyphicon-alert'></span>"); 
		} else if {

		}
	}
	function updateText(result, roverValue) {
		$("#mars-img-id").attr("src", result.photos[0].img_src);
		$("#mars-img-id").show();
		$('#mars-camera').text(roverValue + "'s " +result.photos[0].camera.full_name);
		$('#mars-sol').html("<a href='http://www.giss.nasa.gov/tools/mars24/help/notes.html'>Sol</a>: " + result.photos[0].sol);
		$('#mars-earth-date').text("Earth Date: " + result.photos[0].earth_date);
		$('#mars-landing-date').text("Rover Landing Date: " + result.photos[0].rover.landing_date);
	}

	function toggleDetails(state, speed) {
		_slideToggleElement($('.image-details'), state, speed);
	}
	function toggleLocationsForm(state, speed) {
		_slideToggleElement($('#mars-locations'), state, speed);
	}
	function _slideToggleElement(element, state, speed) {
		var speed = speed || 'slow';

		if (state === true) {
			element.slideDown(speed);
		} else if (state === false) {
			element.slideUp(speed);
		} else {
			element.slideToggle(speed);		
		}
	}



});	