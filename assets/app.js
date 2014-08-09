var key = '5c406cfcc3c57ea167f02969db547f45'

/*
==========================
ATTACK APP
==========================
*/

var attackApp = {};

// init function, to be triggered on attack-button click
attackApp.init = function(){
	var band = $('#band').val();
	attackApp.getTrack(band);
};

// the ajax call! Passing the band name entered by the user as an argument to query info about their top tracks
attackApp.getTrack = function(bandQuery){
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks',
		type: 'GET',
		data: {
			api_key: key,
			format: 'json',
			artist: bandQuery,
			limit: 5
		},
		dataType: 'jsonp',
		success: function(result){
			// On a successful call, grab all variables needed to construct the insult, and pass them into the insult function:
			attackApp.trackName = result.toptracks.track[2].name;
			attackApp.trackTime = result.toptracks.track[2].duration;
			attackApp.insult(bandQuery, attackApp.trackName, attackApp.trackTime);
		}
	});
};

attackApp.insult = function(bandName, title, seconds){
	// Build the insult and inject it into the DOM
	$('.firstStrike h3').empty();
	attackApp.minuteTime = Math.floor(seconds/60) + " minutes and " + (seconds%60) + " seconds";
	attackApp.phrase = bandName + "? Please. Have you even listened to '" + title + "'? That song is only " + attackApp.minuteTime + " long, but it feels like a fucking eternity. A BAD eternity.";
	$('.firstStrike h3').append(attackApp.phrase);

	// $('.length').text(attackApp.minuteTime);
};




/*
==========================
DEFEND APP
==========================
*/

var defendApp = {};

defendApp.init = function(){
	
};


/*
==========================
G0-GO-GADGET-PAGE-LOAD!
==========================
*/ 

$(function(){
	$('#attackGo').on('click', function(){
		attackApp.init();
	});
	$('#defendGo').on('click', function(){
		defendApp.init();
	});
});
