$(function() {

////////REFRESH PAGE//////////////
// $('#refresh').on("click", function(){
//   location.reload(true);
// });

    ///////////DATEPICKER JQUERY-UI///////////////////////
    // $('#datePicker').datepicker();
    $('#datePicker').datepicker({
        dateFormat: "yy-mm-dd",
        setDate: new Date(),
        minDate: new Date(1995, 7-1, 16),
        maxDate: new Date(),
        onSelect: function(dateText, inst) {
            $(this).css('background-color','');
            $("input[name='datepicker']").val(dateText);
            $('#apod-form').submit();
        }
    });



    //////////APOD IMAGERY FORM///////////////////////////
    $('#apod-form').on('submit', function(event) {
        event.preventDefault();
        var date = $('#datePicker').val();

        urlAPODcustom = "https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=U8cAqGyKykhwQ5UjDuuGNQNLZyeVjlOLvNM3WH4u";

        //Get the image from the url
        getNewAPODImage(urlAPODcustom, date);
    });

    function getNewAPODImage(urlAPODcustom, date) {
        $.ajax({
            type: 'GET',
            url: urlAPODcustom,
            success: function(result) {
                updateText(result, date);
                toggleForm(false);
                toggleDetails(true);
                $('#error-message-apod').html('');
            },
            error: handleError
        })
    };

    function handleError(result) {
         $('#error-message-apod').html("<span class='glyphicon glyphicon-alert'></span> There is no imagery available for the selected date. Please try another date. <span class='glyphicon glyphicon-alert'></span>");
    };

    function updateText(result, date) {
        if("copyright" in result) {
            $("#copyright").text("Image Credits: " + result.copyright);
        } else {
            $("#copyright").text("Image Credits: " + "Public Domain");
        }

        if(result.media_type == "video") {
            $("#apod-vid-id").attr("src", result.url);
        } else {
            $("#apod-vid-id").css("display", "none"); 
            $("#content-container").css('background-image', "url(" + result.url + ")");
        }
        $('#apod-date').text('Date as Astronomy Picture of the Day: ' + date);
        $('#apod-date').show();
        $("#reqObject").text(urlAPOD);
        $("#returnObject").text(JSON.stringify(result, null, 4));  
        $("#apod-explaination").text(result.explanation);
        $("#apod-title").text(result.title);
    };

    function toggleDetails(state, speed) {
        _slideToggleElement($('#apod-details'), state, speed);
        $('#copyright, #apod-title, #apod-explaination').show();
    };

    function toggleForm(state, speed) {
        _slideToggleElement($('#apod-form'), state, speed);
    }

    function _slideToggleElement(element, state, speed) {
        var speed = speed || 'slow';

        if (state === true) {
            element.slideUp(speed);
        } else if (state === false) {
            element.slideDown(speed);
        } else {
            element.slideToggle(speed);     
        }
    };


    ///////SLIDE-TOGGLE ELEMENTS///////////////////////
    $('#apod-slider').click(function() {
        $(this).toggleClass('slide-apod-on slide-apod-off');
        toggleDetails();
        toggleForm();
    });


/////////URLs FOR IMAGERY////////
var urlAPOD = "https://api.nasa.gov/planetary/apod?api_key=U8cAqGyKykhwQ5UjDuuGNQNLZyeVjlOLvNM3WH4u";

///////AJAX FOR APOD ///////////////
$.ajax({
	url: urlAPOD,
	success: handleResult
});

//////RETRIEVE IMAGERY FOR APOD TO PAGE/////////

function handleResult(result){
    if("copyright" in result) {
        $("#copyright").text("Image Credits: " + result.copyright);
    } else {
        $("#copyright").text("Image Credits: " + "Public Domain");
    }

    if(result.media_type == "video") {
        $("#apod-vid-id").attr("src", result.url);
    } else {
        $("#apod-vid-id").css("display", "none"); 
        $("#content-container").css('background-image', "url(" + result.url + ")");
    }
    
    $("#reqObject").text(urlAPOD);
    $("#returnObject").text(JSON.stringify(result, null, 4));  
    $("#apod-explaination").text(result.explanation);
    $("#apod-title").text(result.title);
};


});