var key = '5c406cfcc3c57ea167f02969db547f45'

/*
==========================
ATTACK APP
==========================
*/

var attackApp = {};

attackApp.init = function(){
	var band = $('#band').val();
	attackApp.getTrack(band);
};

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
	$('#attackGo').on('click', function(){
		attackApp.init();
	});
	$('DEFENDBUTTONHERE').on('click', function(){
		defendApp.init();
	});
});
