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

// Time to start some shit:
attackApp.insult = function(bandName, title, seconds){
	// Build the insult and inject it into the DOM:
	$('.firstStrike h3').empty();
	attackApp.minuteTime = Math.floor(seconds/60) + " minutes and " + (seconds%60) + " seconds";
	attackApp.phrase = bandName + "? Please. Have you even listened to '" + title + "'? That song is only " + attackApp.minuteTime + " long, but it feels like a fucking eternity. A BAD eternity.";
	$('.firstStrike h3').append(attackApp.phrase);
};


/*
==========================
DEFEND APP
==========================
*/

var defendApp = {};

// init function, to be triggered on attack-button click
defendApp.init = function(){
	var band = $('#band').val();
	defendApp.getAlbum(band);
};

// the ajax call! Passing the band name entered by the user as an argument to query info about their top albums:
defendApp.getAlbum = function(bandQuery){
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums',
		type: 'GET',
		data: {
			api_key: key,
			format: 'json',
			artist: bandQuery,
			limit: 3
		},
		dataType: 'jsonp',
		success: function(result){
			// On a successful call, grab top album, pass it in as an argument to the album-info function:
			defendApp.topAlbum = result.topalbums.album[0].name;
			defendApp.getOpeningTrack(bandQuery, defendApp.topAlbum);
		}
	});
};

// Second ajax call! Passing in the top album to get its opening track:
defendApp.getOpeningTrack = function(bandName, albumQuery){
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/?method=album.getInfo',
		type: 'GET',
		data: {
			api_key: key,
			format: 'json',
			artist: bandName,
			album: albumQuery
		},
		dataType: 'jsonp',
		success: function(result){
			// On a successful call, grab the opening track of the album and pass it and other needed info into the insult function:
			defendApp.openingTrack = result.album.tracks.track[0].name;
			defendApp.insult(bandName, albumQuery, defendApp.openingTrack);
		}
	});
};

// Time to make someone uncomfortable:
defendApp.insult = function(artist, album, song){
	// Build the insult and variants (dependent on name overlaps), and inject it into the DOM
	$('.firstCounter h3').empty();
	if (artist !== album && album !== song) {
		defendApp.phrase = "You don't like " + artist + "? Have you even listened to '" + album + "', or were you too busy having bad taste? '" + song + "' changed the way musicians open albums!";
		$('.firstCounter h3').append(defendApp.phrase);
	} else if (artist == album && album !== song) {
		defendApp.phrase = "You don't like " + artist + "? Have you even listened to the self-titled album, or were you too busy having bad taste? '" + song + "' changed the way musicians open albums!";
		$('.firstCounter h3').append(defendApp.phrase);
	} else {
		defendApp.phrase = "You don't like " + artist + "? Have you even listened to '" + album + "', or were you too busy having bad taste? The title track changed the way musicians open albums!";
		$('.firstCounter h3').append(defendApp.phrase);
	};
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
