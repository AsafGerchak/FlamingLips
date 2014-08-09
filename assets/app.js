var key = '5c406cfcc3c57ea167f02969db547f45'

/*
==========================
ATTACK APP
==========================
*/

var attackApp = {};

attackApp.init = function(){
	attackApp.getInfluences();
};

attackApp.getInfluences = function(){
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks',
		type: 'GET',
		data: {
			api_key: key,
			format: 'json',
			artist: 'Arcade Fire',
			limit: 5
		},
		dataType: 'jsonp',
		success: function(result){
			console.log(result.toptracks.track);
		}
	});
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
	//NEED TO INSERT BUTTON NAMES
	// $('ATTACKBUTTONHERE').on('click', function(){
		attackApp.init();
	// });
	$('DEFENDBUTTONHERE').on('click', function(){
		defendApp.init();
	});
});
