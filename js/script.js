var places = [
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

var mapProp = {
	center: new google.maps.LatLng(52.531283, 13.422102),
	zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

var applyMarkers = function (markersArray) {
	for (var i = 0; i < places.length; i++) {
		markersArray.push(new google.maps.Marker ({
			position: new google.maps.LatLng(places[i].lat, places[i].longt),
			map: map,
			title: places[i].name
		}));
	}
}

var ViewModel = function () {
	var self = this;

	self.userInput = ko.observable("");
	self.markers = ko.observableArray([]);

	applyMarkers(self.markers());

	self.markers()[2].setVisible(false);	
};

ko.applyBindings(new ViewModel());
