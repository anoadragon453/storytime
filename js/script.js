$(document).ready(function(){
    $('#topic').bind('keypress', function(e) {
		if(e.keyCode==13){
			writestory();
		}
	});
});



function init()
{
	cycle();
}

var placeholders = ["Shia LaBeouf", "Syria", "ViaSat", "Jeb Bush", "Ferrari", "Eastbay", "Yeezys" ,"Adidas", "Lakers", "Harper Lee", "Kesha", "Footlocker"];
var text = "";

function cycle()
{
	
	var i = 0;

	for(var j = 0; j < 10000; j++)
	{	
		$("#topic").delay(5000).fadeOut(0, function(){$("#topic").attr("placeholder", placeholders[i%placeholders.length]); i++; if(i == placeholders.length){i = 0;}});	
		$("#topic").fadeIn(0);
	}
	
	
}	

function writestory()
{
	var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			text = xmlhttp.responseText;
			console.log("Got ".concat(text));
			document.getElementById("text").innerHTML = text;
			speak();
        	} else {
			console.log("AJAX Error: ".concat(xmlhttp.status));
		}
        };

	var service = "twitter";
        xmlhttp.open("GET", "./backend/php/generate.php?q=" + document.getElementById('topic').value + "&s=" + service, true);
       	xmlhttp.send();
}

function getText(url, callback)
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	       text = xhttp.responseText;
	       //$("#text").html(text);

	       callback();
	    }
	};
	xhttp.open("GET", url, true);
	xhttp.send();

	
}

function speak()
{
	responsiveVoice.speak(text, "UK English Female");
}
