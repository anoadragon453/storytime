var delay=50;
var currentChar=1;
var destination="text";
var stopTyping = false;
var isTyping = false;

var placeholders = ["Hack Illinois", "20/20 Diet", "Adele", "Agar.io", "Alex Morgan", "Amazon.com", "Charlie Sheen", "Chevrolet", "Chicken", "Coffee", "DeMarco Murray", "Destiny", "Donald Trump", "Duke Energy", "Fashion", "FC Barcelona", "Flu", "Hello", "Husky", "Jack Daniel's", "Jake Arrieta", "Java", "Jurassic World", "Just Do It", "Kim Kardashian", "Lamar Odom", "Lamar Odom", "Lupita Nyong'o", "Malia Obama", "Mark Ronson", "McLaren 650S", "Minnesota Lynx", "New York Mets", "New York Mets", "Pepe the Frog", "Pizza Inn", "Raf Simons", "Ronda Rousey", "Ruby Rose", "Sangria", "Stephen Curry", "Sun", "Taylor Swift", "The Martian", "United Nations", "United States", "Water", "Wells Fargo", "Zeng Fanyi", "Amy Schumer", "Antibiotics", "Bangladesh", "Beer", "Bernie Sanders", "Bill Cosby", "BP", "Caitlyn Jenner", "Calvin Harris", "Chase Utley", "Cocker Spaniel", "Cocker Spaniel", "DeAndre Jordan", "Dodge", "Fallout 4", "Forever 21", "Gose beer", "Greg Hardy", "Holly Holm", "Hope Solo", "HTML", "Inge Lehmann", "Jennifer Lopez", "Jessica Jones", "John Cena", "Jurassic World", "Lego", "Let It Go", "Lionel Messi", "Miss Lebanon", "Moscow Mule", "Nicole Curtis", "Palm Breeze", "Paris", "Pie Face", "Pizza", "Pluto", "Porsche 930", "Rickrolling", "Ronald Reagan", "Sia", "Sonic Boom", "Stuart Scott", "US Senate", "Walmart", "Yoga Challenge", "21 Day Fix", "Al Roker", "Arsenal FC", "Atlanta Hawks", "Birth control", "Blank Space", "Bristol Palin", "Cake", "Carli Lloyd", "Carly Fiorina", "Chase", "Chicago Cubs", "Chicago Cubs", "Chicago Sky", "Clash of Clans", "Crown Royal", "DJ Sneak", "Drake", "Fetty Wap", "George W. Bush", "Gimlet", "H&M", "Henry Danger", "Honda", "Julian Edelman", "Kepler-186f", "Matt Harvey", "Measles", "Mole", "Nick Jonas", "Paleo Diet", "Pekapoo", "Pie Five", "Python", "Ronda Rousey", "Sandra Bland", "Stephen Curry", "Syria", "Taylor Kinney", "The Home Depot", "The Visit", "Thomas Edison", "Toyota 86", "Who Knows", "Wine", "805 beer", "Abby Wambach", "Alprazolam", "Anna Atkins", "Bald Eagle", "Bat", "Ben Carson", "Ben Zobrist", "Buffalo", "Caitlyn Jenner", "Capital One", "Cate Blanchett", "Ceres", "Cosmopolitan", "Crossfit", "Donald Trump", "Eazy-E", "Egg", "Empire", "Florida Man", "Freddie Gray", "GM Diet Plan", "Houston Astros", "Jameson", "Jamie xx", "JavaScript", "Jessa Duggar", "Kam Chancellor", "Listeria", "Manny Pacquiao", "Mercedes-Benz", "Milk", "Nepal", "Nissan GT-R", "PlayStation 3", "Rumer Willis", "Scott Eastwood", "Scream Queens", "That's Racist", "The Nutcracker", "Uptown Funk", "US Congress", "VeggieTales", "Zach Lavine", "Adderall", "Alex Morgan", "Amazing Grace", "Andre Iguodala", "Anna Kendrick", "Bartolo Colon", "Best Buy", "Bill Clinton", "Black panther", "Chelsea FC", "Coffee", "Dakota Johnson", "Earth", "ExxonMobil", "Frank Gifford", "Furious 7", "Hollister Co.", "Honda HR-V", "Honda NSX", "Indiana Fever", "Johnnie Walker", "Luis Suárez", "MattyBRaps", "Megan Rapinoe", "O Rly", "Rehab Addict", "Rihanna", "Ronda Rousey", "Ruby Rose", "Sam Smith", "SQL", "SweetWater 420", "Tadashi Shoji", "Tea", "Team Beachbody", "Ted Cruz", "Volkswagen", "Zed"];
var text = "";

$(document).ready(function() {
    $('#topic').bind('keypress', function(e) {
        if (e.keyCode == 13) {
        	if(document.getElementById('topic').value == "" || !document.getElementById('topic').value)
        	{
        		document.getElementById('topic').value = document.getElementById('topic').placeholder;
        	}
        	console.log($('#topic').attr('value')); //jquery bad
        	console.log(document.getElementById('topic').value);
            writestory();
        }
    });
});

$('#text').bind('beforeunload', function() {
    responsiveVoice.cancel();
    responsiveVoice.pause();
});

$(function()
{
	$("#topic").typed({
        strings: placeholders,
        typeSpeed: 100,
        backSpeed: 10,
        shuffle: true,
        attr: 'placeholder',
        startDelay: 1000,
        backDelay: 2500
	});
});

function stopvoice() {
    responsiveVoice.cancel();
    responsiveVoice.pause();
}

function init() {
    stopvoice();
    $("#text").hide();
    $("#load_anim").hide();
}


function writestory() {
    //loading
    stopvoice();
    $("#text").hide();
    $("#load_anim").show();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var returnText = xmlhttp.responseText;
            text = returnText;
            startTyping(returnText, delay, destination);

            //end loading
            $("#load_anim").delay(0).hide(0, function() {
                $("#text").fadeIn(500, function() {
                    speak();
                });

            });


        } else {
            console.log("AJAX Error: ".concat(xmlhttp.status));
        }
    };

    var service = "twitter";

    xmlhttp.open("GET", "./backend/php/generate.php?q=" + document.getElementById('topic').value + "&s=" + service, true);
    xmlhttp.send();
}

function type()
{
      if (document.getElementById)
      {
               var dest=document.getElementById(destination);
               if (dest)
               {
                    dest.innerHTML=text.substr(0, currentChar);
                    //dest.innerHTML+=text[currentChar-1];
                    currentChar++;
                    if (currentChar>text.length || stopTyping)
                    {
                        return;
                    }
                    else 
                        setTimeout("type()", delay);
               }
    }
}

function startTyping(textParam, delayParam, destinationParam)
{
  text=textParam;
  delay=delayParam;
  currentChar=1;
  destination=destinationParam;
  if (isTyping == true) {
      stopTyping = true;
      setTimeout("delayedType()", 100); 
  }
  else {
      stopTyping = false;
      isTyping = true;
      type();
  }
}

function delayedType() {
    stopTyping = false;
    type();
}

function getText(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            text = xhttp.responseText;
            callback();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function speak() {
    responsiveVoice.cancel();
    responsiveVoice.resume();
    responsiveVoice.speak(text, "UK English Female");
}
