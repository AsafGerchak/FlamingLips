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
	attackApp.randomAttack(band);
	$('#attackGo').addClass('answer');
	$('#defendGo').addClass('offscreenDefend');
	$('#buttons').addClass('buttonAnswer');
	$('#attackText').fadeOut();
};


/*
ATTACK RANSOMISER ==================
*/

// For now, I'm using with this very basic if/else randomizer, because I only have 2 attacks programmed. I'll make a proper randomizer, which will pick from an array of attacks, soon.

attackApp.randomAttack = function(artist){
	attackApp.attackNumber = Math.ceil(Math.random() * 2);
	if (attackApp.attackNumber === 1){
		attackApp.getTrack(artist);
	} else {
		attackApp.twoTracks(artist);
	};
};


/*
ATTACK OPTION 1 ==================
*/

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
			// If an error is returned, pass the band name into the error function. On a successful call, grab all variables needed to construct the insult, and pass them into the insult function:
			if (result.error) {
				attackApp.error(bandQuery)
			} else {
				attackApp.trackName = result.toptracks.track[2].name;
				attackApp.trackTime = result.toptracks.track[2].duration;
				attackApp.insultOne(bandQuery, attackApp.trackName, attackApp.trackTime);
			};			
		}
	});
};

// Time to start some shit:
attackApp.insultOne = function(bandName, title, seconds){
	// Build the insult and inject it into the DOM:
	$('.firstStrike h5').empty();
	$('#reset h3').empty();
	$('#reset h2').empty();
	attackApp.minuteTime = Math.floor(seconds/60) + " minutes and " + (seconds%60) + " seconds";
	attackApp.phrase = bandName + "? Please. Have you even listened to '" + title + "'? That song is only " + attackApp.minuteTime + " long, but it feels like a goddamn eternity. A BAD eternity.";
	$('.firstStrike h5').append(attackApp.phrase);
	attackApp.resetOriginalH3 = "Nice. That'll teach them to have an opinion in public."
	attackApp.resetOriginalH2 = "Let's go do that again"
	$('#reset h3').append(attackApp.resetOriginalH3);
	$('#reset h2').append(attackApp.resetOriginalH2);
	$('#reset').addClass('resetOnscreen');
	$('#reset').on('click', function(){
		attackApp.reset();
	});
};

// =================END ATTACK 1


/*
ATTACK OPTION 2 ==================
*/

// First ajax call, using band input by user as argument to query their top track
attackApp.twoTracks = function(bandQuery){
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks',
		type: 'GET',
		data: {
			api_key: key,
			format: 'json',
			artist: bandQuery,
			limit: 2
		},
		dataType: 'jsonp',
		success: function(result){
			// If an error is returned, pass the band name into the error function. On a successful call, grab the band's most succesful track, pass it into the the query for a similar band:
			if (result.error) {
				attackApp.error(bandQuery)
			} else {
				attackApp.bigHit = result.toptracks.track[0].name;
				attackApp.getSimilarBand(bandQuery, attackApp.bigHit);
			};			
		}
	});
};

// Second ajax call, to get a band similar to the one submitted by the user
attackApp.getSimilarBand = function(bandName, trackName){
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar',
		type: 'GET',
		data: {
			api_key: key,
			format: 'json',
			artist: bandName,
			limit: 5
		},
		dataType: 'jsonp',
		success: function(result){
			// On a successful call, grab a similar artist's name, and pass it into the second topTracks function:
			attackApp.similarBand = result.similarartists.artist[2].name;
			attackApp.simBandTrack(bandName, trackName, attackApp.similarBand);
		}
	});
};

// Third ajax call (oh FFS) to get the similar band's top track
attackApp.simBandTrack = function(bandFirst, bandFirstHit, bandSecond){
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks',
		type: 'GET',
		data: {
			api_key: key,
			format: 'json',
			artist: bandSecond,
			limit: 2
		},
		dataType: 'jsonp',
		success: function(result){
			// Grab the second band's most succesful track, pass it into the the insult function with the other info:
			attackApp.otherHit = result.toptracks.track[0].name;
			attackApp.insultTwo(bandFirst, bandFirstHit, bandSecond, attackApp.otherHit);
		}
	});
};

// Let's set fire to tears:
attackApp.insultTwo = function(bandOne, bandOneHit, bandTwo, bandTwoHit){
	// Build the insult and inject it into the DOM:
	$('.firstStrike h5').empty();
	$('#reset h3').empty();
	$('#reset h2').empty();
	attackApp.phraseTwo = "You actually like " + bandOne + "? You probably love " + bandTwo + " too. Hey, I know, let's put on '" + bandOneHit + "' <span class=\"lightEmphasis\">and</span>  '" + bandTwoHit + "'. That way, we can ruin everyone's day, not just mine from listening to your terrible opinions!";
	$('.firstStrike h5').append(attackApp.phraseTwo);
	attackApp.resetOriginalH3 = "Nice. That'll teach them to have an opinion in public."
	attackApp.resetOriginalH2 = "Let's go do that again"
	$('#reset h3').append(attackApp.resetOriginalH3);
	$('#reset h2').append(attackApp.resetOriginalH2);
	$('#reset').addClass('resetOnscreen');
	$('#reset').on('click', function(){
		attackApp.reset();
	});
};

// =================END ATTACK 2


// Error to return if no band info found:

attackApp.error = function(bandName){
	// Build an error message and inject it into the DOM:
	$('.firstStrike h5').empty();
	$('#reset h3').empty();
	$('#reset h2').empty();
	attackApp.errorMessage = "I can't find any info on '" + bandName + "'. I'm going to assume it's your fault. You don't know the first thing about music, do you? Uch, you probably <span class=\"heavyEmphasis\">still read Pitchfork.</span> GOD.";
	$('.firstStrike h5').append(attackApp.errorMessage);
	attackApp.errorResetH3 = "Let's go try that again, and this time,"
	attackApp.errorResetH2 = "GET IT RIGHT"
	$('#reset h3').append(attackApp.errorResetH3);
	$('#reset h2').append(attackApp.errorResetH2);
	$('#reset').addClass('resetOnscreen');
	$('#reset').on('click', function(){
		attackApp.reset();
	});
};


// Reset button function:

attackApp.reset = function(){
	$('#reset').removeClass('resetOnscreen');
	$('.firstStrike h5').empty();
	$('#attackGo').removeClass('answer');
	$('#defendGo').removeClass('offscreenDefend');
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

	// defendApp.getAlbum(band);

	defendApp.yearFormed(band);

	$('#defendGo').addClass('answer');
	$('#attackGo').addClass('offscreenAttack');
	$('#buttons').addClass('buttonAnswer');
	$('#defendText').fadeOut();
};


/*
DEFENSE OPTION 2 ==================
*/

defendApp.yearFormed = function(bandQuery){
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getInfo',
		type: 'GET',
		data: {
			api_key: key,
			format: 'json',
			artist: bandQuery,
		},
		dataType: 'jsonp',
		success: function(result){
			// If an error is returned, pass the band name into the error function. On a successful call, grab the year the band was founded and pass it into the insult function:
			if (result.error) {
				defendApp.error(bandQuery)
			} else {
				defendApp.founded = result.artist.bio.yearformed;
				defendApp.insultTwo(bandQuery, defendApp.founded);
			};
		}
	});
};

defendApp.insultTwo = function(bandName, year){
	// Build the insult and variants (dependent on founding year), and inject it into the DOM
	$('.firstCounter h5').empty();
	$('#reset h3').empty();
	$('#reset h2').empty();
	if (year >= 2005){
		defendApp.phraseTwo = "You're out of your mind. I'm 100% sure that " + bandName + "'s music career was the single best thing to be created in " + year + ", and that's literally the year my son was born.";
		$('.firstCounter h5').append(defendApp.phraseTwo);
	} else if (year >= 1993){
		defendApp.phraseTwo = "You're out of your mind. I'm 100% sure that " + bandName + "'s music career was the single best thing to be created in " + year + ", and that's literally the year my sister's only child was born.";
		$('.firstCounter h5').append(defendApp.phraseTwo);
	}  else if (year >= 1977){
		defendApp.phraseTwo = "You're out of your mind. I'm 100% sure that " + bandName + "'s music career was the single best thing to be created in " + year + ", and that's literally the year my partner was born.";
		$('.firstCounter h5').append(defendApp.phraseTwo);
	} else {
		defendApp.phraseTwo = "You're out of your mind. I'm 100% sure that " + bandName + "'s music career was the single best thing to be created in " + year + ", and that's literally the year my father was born.";
		$('.firstCounter h5').append(defendApp.phraseTwo);
	};
	defendApp.resetOriginalH3 = "Nice. That'll teach them to have an opinion in public."
	defendApp.resetOriginalH2 = "Let's go do that again"
	$('#reset h3').append(defendApp.resetOriginalH3);
	$('#reset h2').append(defendApp.resetOriginalH2);	
	$('#reset').addClass('resetOnscreen');
	$('#reset').on('click', function(){
		defendApp.reset();
	});
};

// =================END DEFENSE 2


/*
DEFENSE OPTION 1 ==================
*/

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
			if (result.error) {
				defendApp.error(bandQuery)
			} else {
				defendApp.topAlbum = result.topalbums.album[0].name;
				defendApp.getOpeningTrack(bandQuery, defendApp.topAlbum);
			};
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
			defendApp.insultOne(bandName, albumQuery, defendApp.openingTrack);
		}
	});
};

// Time to make someone uncomfortable:
defendApp.insultOne = function(artist, album, song){
	// Build the insult and variants (dependent on name overlaps), and inject it into the DOM
	$('.firstCounter h5').empty();
	$('#reset h3').empty();
	$('#reset h2').empty();
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
	defendApp.resetOriginalH3 = "Nice. That'll teach them to have an opinion in public."
	defendApp.resetOriginalH2 = "Let's go do that again"
	$('#reset h3').append(defendApp.resetOriginalH3);
	$('#reset h2').append(defendApp.resetOriginalH2);	
	$('#reset').addClass('resetOnscreen');
	$('#reset').on('click', function(){
		defendApp.reset();
	});
};

// =================END DEFENSE 2


// Error to return if no band info found:

defendApp.error = function(bandName){
	// Build an error message and inject it into the DOM:
	$('.firstCounter h5').empty();
	$('#reset h3').empty();
	$('#reset h2').empty();
	defendApp.errorMessage = "I can't find any info on '" + bandName + "'. I'm going to assume it's your fault. You don't know the first thing about music, do you? Uch, you probably <span class=\"heavyEmphasis\">still read Pitchfork.</span> GOD.";
	$('.firstCounter h5').append(defendApp.errorMessage);
	defendApp.errorResetH3 = "Let's go try that again, and this time,"
	defendApp.errorResetH2 = "GET IT RIGHT"
	$('#reset h3').append(defendApp.errorResetH3);
	$('#reset h2').append(defendApp.errorResetH2);
	$('#reset').addClass('resetOnscreen');
	$('#reset').on('click', function(){
		defendApp.reset();
	});
};


// Reset button function:

defendApp.reset = function(){
	// $('#reset').css('bottom', '-50%');
	$('#reset').removeClass('resetOnscreen');
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
