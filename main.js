"use strict";
var apiUrl = "http://api.wunderground.com/api/dad32a490467dc62"


$(document).ready(init);

function init(){
	
	console.log("I'm init");

	$("#zip").data("value", defaultZip());
	$("#getZip").click(getInfoForZip);
	$(".header").mouseover(function(){
		$(".heading").toggleClass("invisible");
		})
}

function defaultZip(){
	$.get("http://api.wunderground.com/api/dad32a490467dc62/geolookup/conditions/q/autoip.json")
		 .done(function (data){
		 	$("#zip").val(data.location.zip);
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
		 					// })
 				 		// $.get(logo.url)
				 if (parseInt(temp) < 80){
				 	$("#hotOrCold").text("Whoa!" + temp + " degrees! " + 
				 		"You definitely aren't hot, but you are one cool cucumber!").removeClass("hottie");
				 	$(".coolCue").removeClass("invisible");
				 	$("#coolCue").attr("src", "https://dirtyfilthyhealthy.files.wordpress.com/2013/05/screen-shot-2013-05-19-at-17-33-50.png?w=560");
				 	$("#wrapper").removeClass("summer").addClass("winter");
 					$("#vacationIdeas").attr("href", "https://www.airbnb.com/s/Lake-Tahoe--United-States?af=8781787&c=p2_d_eng_laketahoe_p2&gclid=CjwKEAiA9uaxBRDYr4_hrtC3tW8SJAD6UU8G0NtnffCX2bpOjigNIPJ6r9Z0tEwGdplAVkVmOT0vjBoCQUHw_wcB&dclid=CNrwqN-19sgCFaQSRQod3P4M7A")
 						.text("hot time in a new town... huh... huhhhh?").attr("type", "button");
 									}else{
					$("#hotOrCold").text("Yeah you arrrre!  " + temp + " degrees!             " +
						"     One hawt tamale that's what you are");
					$(".hottie").removeClass("invisible");
					$("#hotTammie").removeClass("invisible");
					$("#wrapper").removeClass("winter").addClass("summer");
					$("#vacationIdeas").attr("href", "https://www.airbnb.com/?af=43720035&c=A_TC%3Djmydw8thr5%26G_MT%3Db%26G_CR%3D19944542536%26G_N%3Dg%26G_K%3D%2Bair%20%2Bbnb%26G_P%3D%26G_D%3Dc&gclid=CjwKEAiA9uaxBRDYr4_hrtC3tW8SJAD6UU8GiANrBwuak5j42k1L9KrT7_Q-8PzbUixzhajnnRZHDRoCrm3w_wcB&dclid=CKzjtYS39sgCFTEHRQodbVcByA")
						 .text("chill out").attr("type", "button");				
					}
					$("#temp").text("current temp " + temp + "F");	
					$("#icon").attr("src", icon), 
					$("#forecast").attr("href", forecast).text("Click To View Full Forecast")
	})
			.fail(function(promise, status, error){
				console.log("promise:", promise);
				console.log("error:", error);
		});
	} //end else zip a number?
	
}
