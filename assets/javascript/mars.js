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
$('#mars-locations').on('submit', function(event) {
	 // Stop the browser from submitting the form.
	event.preventDefault();
	var roverSelect = document.getElementById("rover");
	var cameraSelect = document.getElementById("camera");
	var roverValue = roverSelect.selectedOptions[0].value;
	var cameraValue = cameraSelect.selectedOptions[0].value;

	
	var urlMARS = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + roverValue +"/photos?earth_date=" + today + "&camera=" + cameraValue + "&api_key=U8cAqGyKykhwQ5UjDuuGNQNLZyeVjlOLvNM3WH4u";

	$.ajax({
		type: 'GET',
		url: urlMARS,
		success: function(result) {
			$('.errorMessage').html('');
			$("#mars-img-id").attr("src", result.photos[0].img_src);
			$("#mars-img-id").show();
			$("#reqObjectMars").text(urlMARS); 
			$('#mars-camera').text(result.photos[0].camera.full_name);
			$('#mars-sol').html("<a href='http://www.giss.nasa.gov/tools/mars24/help/notes.html'>Sol:</a>" + result.photos[0].sol);
			$('#mars-earth-date').text("Earth Date: " + result.photos[0].earth_date);
			$('#mars-landing-date').text("Rover Landing Date: " + result.photos[0].rover.landing_date);
			$('#mars-locations').hide();
			},
		error: function(result) {
			$('#error-message-mars').html("<span class='glyphicon glyphicon-alert'></span> There is no imagery available for the selected rover/camera combination at this time. <span class='glyphicon glyphicon-alert'></span>"); 

		}
	})

});


///////SLIDE-TOGGLE ELEMENTS///////////////////////
$('#flip-mars').click(function() {
	$('#mars-camera, #mars-sol, #mars-earth-date, #mars-landing-date, #mars-locations').toggle('slow');
});


});