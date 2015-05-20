var initialPlaces = [
	{
		lat: 52.535372,
		longt: 13.425483,
		name: 'Cafe'
	},
	{
		lat: 52.534217,
		longt: 13.422328,
		name: 'Supermarkt'
	},
	{
		lat: 52.533258,
		longt: 13.437248,
		name: 'Shop'
	}
];

function Place(placeObj) {
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(placeObj.lat, placeObj.longt),
		title: placeObj.name,
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP
	});
}

var mapProp = {
	center: new google.maps.LatLng(52.531283, 13.422102),
	zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

var ViewModel = function () {
	var self = this;

	self.userInput = ko.observable("");
};

ko.applyBindings(new ViewModel());
