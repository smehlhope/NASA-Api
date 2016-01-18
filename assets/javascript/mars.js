$(function() {

	//////////////GET DATE FOR MARS IMAGERY //////
	var today = new Date();
	var dd = today.getDate()-3;
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) { dd = '0'+dd } 
	if(mm<10) { mm = '0'+mm } 
	var today = yyyy + '-' + mm + '-' + dd;


	//////////MARS IMAGERY FORM////////////////
	$('#mars-form').on('submit', function(event) {
		 // Stop the browser from submitting the form.
		event.preventDefault();
		var roverSelect = document.getElementById("rover");
		var cameraSelect = document.getElementById("camera");
		var roverValue = roverSelect.selectedOptions[0].value;
		var cameraValue = cameraSelect.selectedOptions[0].value;
		
		var urlMARS = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + roverValue +"/photos?earth_date=" + today + "&camera=" + cameraValue + "&api_key=U8cAqGyKykhwQ5UjDuuGNQNLZyeVjlOLvNM3WH4u";

		//Get the image from the url
		getNewMarsRoverImage(urlMARS, roverValue);
	});

	function getNewMarsRoverImage(urlMARS, roverName) {
		$.ajax({
			type: 'GET',
			url: urlMARS,
			success: function(result) {
				updateText(result, roverName);
				toggleForm(false);
				toggleDetails(true);
				$('#error-message-mars').html('');
			},
			error: handleError
		})
	};

	function handleError(result) {
		$('#error-message-mars').html("<span class='glyphicon glyphicon-alert'></span> There is no imagery available for the selected rover/camera combination at this time. <span class='glyphicon glyphicon-alert'></span>"); 
	};

	function updateText(result, roverValue) {
		$("#mars-img-id").attr("src", result.photos[0].img_src);
		$("#mars-img-id").show();
		$('#mars-camera').text(roverValue + "'s " +result.photos[0].camera.full_name);
		$('#mars-sol').html("<a href='http://www.giss.nasa.gov/tools/mars24/help/notes.html'>Sol</a>: " + result.photos[0].sol);
		$('#mars-earth-date').text("Earth Date: " + result.photos[0].earth_date);
		$('#mars-landing-date').text("Rover Landing Date: " + result.photos[0].rover.landing_date);
	};

	function toggleDetails(state, speed) {
		_slideToggleElement($('#mars-img-details'), state, speed);
		$('#slide-mars').html('Mars Rover Imagery <small><span class="glyphicon glyphicon-menu-hamburger"></span></small>');
	};

	function toggleForm(state, speed) {
		_slideToggleElement($('#mars-form'), state, speed);
		$('#slide-mars').html('Mars Rover Imagery <small><span class="glyphicon glyphicon-resize-full"></span></small>');
	};

	function _slideToggleElement(element, state, speed) {
		var speed = speed || 'slow';

		if (state === true) {
			element.slideDown(speed);
		} else if (state === false) {
			element.slideUp(speed);
		} else {
			element.slideToggle(speed);		
		}
	};

	///////SLIDE-TOGGLE ELEMENTS///////////////////////
	$('#slide-mars').click(function() {
		toggleDetails();
		toggleForm();
	});
});