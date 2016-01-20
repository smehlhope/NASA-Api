$(function() {


	//////////////GET DATE FOR EARTH IMAGERY //////
	var today2 = new Date();
	var dd = today2.getDate()-3;
	var mm = today2.getMonth()+1; //January is 0!
	var yyyy2 = today2.getFullYear()-1;
	if(dd<10) { dd = '0'+dd } 
	if(mm<10) { mm = '0'+mm } 
	var today2 = yyyy2 + '-' + mm + '-' + dd;

	
	//////GOOGLE MAPS API INTIALIZE/////////////////
	var myLatlng = new google.maps.LatLng(47.608894, -122.340056);
    
    function initialize() {
        var myLatlng = new google.maps.LatLng(47.608894, -122.340056);

        var myOptions = {
            zoom: 10,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        var marker = new google.maps.Marker({
            draggable: true,
            position: myLatlng,
            map: map,
            title: "Your location"
        });

        google.maps.event.addListener(marker, 'dragend', function (event) {
            document.getElementById("latSlider").value = event.latLng.lat();
            document.getElementById("longSlider").value = event.latLng.lng();
        });

    }

    initialize();

	$('.show-planets').on('click', function() {
    	$('#mars, #earth').slideToggle('slow');
    	google.maps.event.trigger(map, 'resize');
    	 map.setCenter(myLatlng);
	});

	////////EARTH IMAGERY FORM ////////////////

	$('#earth-form').on('submit', function(event) {
		 // Stop the browser from submitting the form.
		event.preventDefault();

		longitude = document.getElementById("longSlider").value;
		latitude = document.getElementById("latSlider").value;

		var urlEARTH = "https://api.nasa.gov/planetary/earth/imagery?lon=" + longitude + "&lat=" + latitude + "&date=" + today2 + "&api_key=U8cAqGyKykhwQ5UjDuuGNQNLZyeVjlOLvNM3WH4u";

		//Get the image from the url
		getNewEarthImage(urlEARTH, longitude, latitude);
	});

	function getNewEarthImage(urlEARTH, longitude, latitude) {
		$.ajax({
			type: 'GET',
			url: urlEARTH,
			success: function(result) {
				if (result.error) {
					handleError();
				} else {
				updateText(result, longitude, latitude);
				toggleForm(false);
				toggleDetails(true);
				$('#error-message-earth').html('');
				}	
			},
			error: handleError
		})
	};

	function handleError(result) {
		$('#error-message-earth').html("<span class='glyphicon glyphicon-alert'></span> There is no imagery available for the selected location at this time. Try another location! <span class='glyphicon glyphicon-alert'></span>"); 
	};

	function updateText(result, longitude, latitude) {
		$('#earth-img-id').attr("src", result.url);
		$('#earth-img-id').show();
		$('#earth-credit').text('Image courtesy of the U.S. Geological Survey.');
		$('#scene-id').html('Landsat Scene ID: <small>' + result.id.split('/')[1] +'</small>');
		$('#longitude').text('Longitude: '+ longitude);
		$('#latitude').text('Latitude: ' + latitude);
	};

	function toggleDetails(state, speed) {
		_slideToggleElement($('#earth-img-details'), state, speed);
		$('#slide-earth').html('Choose Where You View Earth <small><span class="glyphicon glyphicon-menu-hamburger"></span></small>');
	};

	function toggleForm(state, speed) {
		_slideToggleElement($('#earth-form'), state, speed);
		$('#slide-earth').html('Choose Where You View Earth <small><span class="glyphicon glyphicon-resize-full"></span></small>');
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
	$('#slide-earth').click(function() {
		toggleDetails();
		toggleForm();
	});

});



