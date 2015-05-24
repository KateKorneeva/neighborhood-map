var places = [
	{
		lat: 52.535372,
		longt: 13.425483,
		name: 'Cafe',
		visible: true
	},
	{
		lat: 52.534217,
		longt: 13.422328,
		name: 'Supermarkt',
		visible: true
	},
	{
		lat: 52.533258,
		longt: 13.437248,
		name: 'Shop',
		visible: true
	}
];

var mapProp = {
	center: new google.maps.LatLng(52.531283, 13.422102),
	zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);



var ViewModel = function () {
	var self = this;

	self.userInput = ko.observable();
	self.markers = ko.observableArray([]);
	self.isVisible = ko.observable(true);

	self.applyMarkers = function () {
		for (var i = 0; i < places.length; i++) {
			self.markers.push(new google.maps.Marker ({
				position: new google.maps.LatLng(places[i].lat, places[i].longt),
				map: map,
				title: places[i].name,
				visible: true,
				koVisible: ko.observable(true)
			}));
		}
	}

	self.filterMarkers = function () {

		for (var i = 0; i < self.markers().length; i++) {
			var name = places[i].name.toLowerCase();

			if (name.indexOf(self.userInput()) >= 0) {
				self.setPlaceVisible(self.markers()[i], true);
			}
			else {
				self.setPlaceVisible(self.markers()[i], false);
			}
		}
		return true;
	}

	self.setPlaceVisible = function (place, value) {
		place.setVisible(value);
		place.koVisible(value);
	}

	self.test = function() {
		console.log(self.markers()[1].koVisible());
	}

	self.applyMarkers(self.markers());

};

ko.applyBindings(new ViewModel());
