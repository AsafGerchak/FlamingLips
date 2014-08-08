var key = "cdt6ay7muz6npnbnjvb2dyvz"

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
		url: 'https://api.rovicorp.com/data/v1.1/name/influencers?name=Flaming+Lips&count=0&offset=0&country=US&language=en&format=json&apikey=cdt6ay7muz6npnbnjvb2dyvz&sig=70c0a835d0e944c024dbb42e0f2d19e4',
		type: 'GET',
		// data: {
		// 	apikey: key,
		// 	name: 'Flaming Lips',
		// 	format: 'json'
		// },
		dataType: 'jsonp',
		success: function(result){
			console.log(result);
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
