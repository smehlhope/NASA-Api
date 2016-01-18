$(function() {

///////LATITUDE AND LONGITUDE SLIDER/////////////
var longVal = $('#longVal');
var latVal = $('#latVal');

$('#longSlider').change(function(){
    longVal.html(this.value);
});

$('#latSlider').change(function(){
    latVal.html(this.value);
});

// Trigger the event on load, so the value field is populated:

$('#longSlider').change();
$('#latSlider').change();

//////////////GET DATE FOR EARTH IMAGERY //////
var today2 = new Date();
var dd = today2.getDate()-3;
var mm = today2.getMonth()+1; //January is 0!
var yyyy2 = today2.getFullYear()-1;
if(dd<10) { dd = '0'+dd } 
if(mm<10) { mm = '0'+mm } 
var today2 = yyyy2 + '-' + mm + '-' + dd;


////////EARTH IMAGERY FORM SUBMISSION////////////////

$('#earth-locations').on('submit', function(event) {
	 // Stop the browser from submitting the form.
	event.preventDefault();
	longitude = document.getElementById("longSlider").value;
	latitude = document.getElementById("latSlider").value;
	var urlEARTH = "https://api.nasa.gov/planetary/earth/imagery?lon=" + longitude + "&lat=" + latitude + "&date=" + today2 + "&api_key=U8cAqGyKykhwQ5UjDuuGNQNLZyeVjlOLvNM3WH4u";
	$.ajax({
		type: 'GET',
		url: urlEARTH,
		success: function(result) {
			$('#earth-img-id').attr("src", result.url);
			$('#earth-img-id').show();
			$('#earth-credit').text('Image courtesy of the U.S. Geological Survey.');
			$("#reqObjectEarth").text(urlEARTH);
			$('#scene-id').html('Landsat Scene ID: <small>' + result.id.split('/')[1] +'</small>');
			$('#longitude').text('Longitude: '+ longitude);
			$('#latitude').text('Latitude: ' + latitude);
			$('#earth-locations').hide(); 
		},
		error: function(result) {
			$('#error-message-earth').html("<span class='glyphicon glyphicon-alert'></span> There is no imagery available for the selected location at this time. Try another location!<span class='glyphicon glyphicon-alert'></span>"); 

		}
	})
});


///////SLIDE-TOGGLE ELEMENTS///////////////////////
$('#flip-earth').click(function() {
	$('#scene-id, #longitude, #latitude, #earth-locations').toggle('slow');
});

});



