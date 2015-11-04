"use strict";
var apiUrl = "http://api.wunderground.com/api/dad32a490467dc62"


$(document).ready(init);


function init(){
	
	console.log("I'm init");
	$("#getZip").click(getZip);
}


function getZip(){
	var userZip = $("#zip").val();
  // if the user input is not valid ask them to do it again
	 if (userZip.match(/[^0-9.]/g) || userZip.length !==5 ){ 		
		alert("Please Enter A Valid Zip Code!");
		return;
	}else{
	var url = apiUrl + "/geolookup/conditions/q/" + userZip + ".json";

	$.get(url)
		 .done(function (data, status, error){
debugger;
		 		var temp = data.temp_f;
		 		console.log("error" ,error);
				console.log( data);
				console.log("status:", status);
				if (parseInt(temp) < 80){	
					console.log("NO!")
					$("#tempDisp").text("No, but you're pretty cool!");
				}
				else{
					console.log("Yeah you are!")
					$("#tempDisp").text("Yeah You ARrre", temp);
					//$("#tempDisp").append();

				}
					
		 	})		
			.fail(function(promise, status, error){
				console.log("promise:", promise);
				console.log("status:", status);
				console.log("error:", error);
		});
	} //end else zip a number?
	
}
