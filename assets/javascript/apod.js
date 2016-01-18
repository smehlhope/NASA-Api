$(function() {

////////REFRESH PAGE//////////////
$('#refresh').on("click", function(){
  location.reload(true);
});


//////////////GET DATE FOR APOD IMAGERY //////
// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
// var yyyy = today.getFullYear();
// if(dd<10) { dd = '0'+dd } 
// if(mm<10) { mm = '0'+mm } 
// var today = yyyy + '-' + mm + '-' + dd;

///////SLIDE-TOGGLE ELEMENTS///////////////////////
$('#apod-slider').on('click', function() {
	$('#copyright, #apod-title, #apod-explaination').slideToggle('slow');
	$(this).toggleClass('slide-apod-on slide-apod-off');
});

$('.show-planets').on('click', function() {
    $('#mars, #earth').slideToggle('slow');
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
  }
  else {
    $("#copyright").text("Image Credits: " + "Public Domain");
  }
  
  if(result.media_type == "video") {
    $("#apod-vid-id").attr("src", result.url);
  }
  else {
    $("#apod-vid-id").css("display", "none"); 
    $("body").css('background-image', "url(" + result.url + ")");
  }
  $("#reqObject").text(urlAPOD);
  $("#returnObject").text(JSON.stringify(result, null, 4));  
  $("#apod-explaination").text(result.explanation);
  $("#apod-title").text(result.title);
}


});