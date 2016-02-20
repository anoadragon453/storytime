$(document).ready(function(){
    $('#topic').bind('keypress', function(e) {
		if(e.keyCode==13){
			getstory();
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

		//$("#topic").delay(3000).attr("placeholder", placeholders[j%placeholders.length]); 

		//i++; if(i == placeholders.length){i = 0;}	

		//setTimeout(function(){}, 2000);

	}
	
	
}	


function getstory()
{
	getText("https://amorgan.me/storytime/markov_out.txt", function() {
		speak();
	});
}

function getText(url, callback)
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	       text = xhttp.responseText;
	       $("#text").html(text);

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
