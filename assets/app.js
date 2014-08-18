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
	// $('#attackGo').css('width', '100%').css('height', '250%').css('cursor', 'auto');
	$('#attackGo').addClass('answer');
	$('#defendGo').addClass('offscreenDefend');
	// $('#buttons').css('top', '-60%').css('height', '100%');
	$('#buttons').addClass('buttonAnswer');
	$('#attackText').fadeOut();
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
	$('.firstStrike h5').empty();
	attackApp.minuteTime = Math.floor(seconds/60) + " minutes and " + (seconds%60) + " seconds";
	attackApp.phrase = bandName + "? Please. Have you even listened to '" + title + "'? That song is only " + attackApp.minuteTime + " long, but it feels like a fucking eternity. A BAD eternity.";
	$('.firstStrike h5').append(attackApp.phrase);
	$('#reset').css('bottom', '0');
	$('#reset').on('click', function(){
		attackApp.reset();
	});
};

attackApp.reset = function(){
	$('#reset').css('bottom', '-50%');
	$('.firstStrike h5').empty();
	// $('#attackGo').css('width', '50%').css('height', '100%').css('cursor', 'pointer');
	$('#attackGo').removeClass('answer');
	$('#defendGo').removeClass('offscreenDefend');
	// $('#buttons').css('top', '0').css('height', '40%');
	$('#buttons').removeClass('buttonAnswer');
	$('#attackText').fadeIn();
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
	// $('#defendGo').css('width', '100%').css('height', '250%').css('cursor', 'auto');
	$('#defendGo').addClass('answer');
	$('#attackGo').addClass('offscreenAttack');
	// $('#buttons').css('top', '-60%').css('height', '100%');
	$('#buttons').addClass('buttonAnswer');
	$('#defendText').fadeOut();
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
	$('.firstCounter h5').empty();
	if (artist !== album && album !== song) {
		defendApp.phrase = "You don't like " + artist + "? Have you even listened to '" + album + "', or were you too busy having bad taste? '" + song + "' changed the way people open their albums!";
		$('.firstCounter h5').append(defendApp.phrase);
	} else if (artist == album && album !== song) {
		defendApp.phrase = "You don't like " + artist + "? Have you even listened to the self-titled album, or were you too busy having bad taste? '" + song + "' changed the way people open their albums!";
		$('.firstCounter h5').append(defendApp.phrase);
	} else {
		defendApp.phrase = "You don't like " + artist + "? Have you even listened to '" + album + "', or were you too busy having bad taste? The title track changed the way people open their albums!";
		$('.firstCounter h5').append(defendApp.phrase);
	};
	$('#reset').css('bottom', '0');
	$('#reset').on('click', function(){
		defendApp.reset();
	});
};

defendApp.reset = function(){
	$('#reset').css('bottom', '-50%');
	$('.firstCounter h5').empty();
	// $('#defendGo').css('width', '50%').css('height', '100%').css('cursor', 'pointer');
	$('#defendGo').removeClass('answer')
	$('#attackGo').removeClass('offscreenAttack');
	// $('#buttons').css('top', '0').css('height', '40%');
	$('#buttons').removeClass('buttonAnswer')
	$('#defendText').fadeIn();
};


/*
==========================
ABOUT SCREEN LAUNCHER
==========================
*/ 

var aboutScreen = {};

aboutScreen.init = function(){
	$('#attackGo').addClass('offscreenAttack');
	$('#defendGo').addClass('offscreenDefend');
	$('#header').addClass('offscreenHeader');
	// $('.about').css('top', '-6%');
	$('#about').addClass('aboutShow');
	$('.title').fadeOut(400, 'linear');
	// $('.aboutClose').css('top', '1.5%');
	$('#aboutClose').addClass('aboutCloseShow');
};

var aboutClose = {};

aboutClose.init = function(){
	$('#attackGo').removeClass('offscreenAttack');
	$('#defendGo').removeClass('offscreenDefend');
	$('#header').removeClass('offscreenHeader');
	// $('.about').css('top', '0');
	$('#about').removeClass('aboutShow');
	$('.title').fadeIn(400, 'linear');
	$('.aboutClose').fadeOut(50, function(){
		// $(this).css('top', '-40%').delay(800).fadeIn(400);
		$(this).removeClass('aboutCloseShow').delay(800).fadeIn(400);
	});
};


/*
==========================
G0-GO-GADGET-PAGE-LOAD!
==========================
*/ 

$(function(){
	$('#aboutButton').on('click', function(){
		aboutScreen.init();
	});
	$('#aboutClose').on('click', function(){
		aboutClose.init();
	});
	$('#attackGo').on('click', function(){
		attackApp.init();
	});
	$('#defendGo').on('click', function(){
		defendApp.init();
	});
});
