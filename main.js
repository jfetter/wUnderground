"use strict";
var apiUrl = "http://api.wunderground.com/api/dad32a490467dc62"


$(document).ready(init);

function init(){
	
	console.log("I'm init");
	$("#getZip").click(getInfoForZip);
	$("#zip").data("value", defaultZip());
}

function defaultZip(){
	$.get("http://api.wunderground.com/api/dad32a490467dc62/geolookup/conditions/q/autoip.json")
		 .done(function (data){
		 	$("#zip").val(data.location.zip)
	});
}
function getInfoForZip(){
 	var userZip = $("#zip").val();
   //if the user input is not valid ask them to do it again
	 if (userZip.match(/[^0-9.]/g) || userZip.length !==5 ){ 		
		alert("Please Enter A Valid Zip Code!");
		return;
	}else{
	var url = apiUrl + "/geolookup/conditions/q/" + userZip + ".json";

	$.get(url)
		 .done(function (data){
		 		var temp = parseFloat(data.current_observation.temp_f);
		 		var	icon = (data.current_observation.icon_url);
		 		var	forecast = (data.current_observation.forecast_url);
				console.log( data);
				 if (parseInt(temp) < 80){	
						var hot = true; 
				 	$("#hotOrCold").text("No, but you're pretty cool!");
				}else{
					var hot = false;
					$("#hotOrCold").text("Yeah You ARrre!");
				}
					$(".temp").text(temp);
				 	//$("#temp").text(temp);
				// 	console.log($("#temp").text(temp));
				// 	$("#icon").attr("src", icon);
				// 	$("#forecast").attr("href", forecast).text("Forecast");
				// 	if (hot){
				// 			$("#pageWrapper").css({"background-image": url('http://imgc.allpostersimages.com/images/P-473-488-90/26/2680/ESZUD00Z/posters/mike-england-beach-scene-barbados.jpg')
				// 							});
				// 								$("#vacationIdeas").attr("href", "http://www.smartertravel.com/travel-advice/Beat-heat-Five-cool.html?id=15616");}
				// 	})else {
				// 		$("#pageWrapper").css(background-image", "url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScbTh8ZCanwVrqMs2yHOFvC842HSURy3aDgD_XNwahNTLUi_lkf5E4WVCG"));
 			// 			 						$("#vacationIdeas").attr("href", 
 			 					 	}	)

			.fail(function(promise, status, error){
				console.log("promise:", promise);
				console.log("error:", error);
		});
	} //end else zip a number?
	
}
