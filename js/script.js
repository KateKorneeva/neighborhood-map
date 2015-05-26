var places = [
	{
		lat: 52.529648,
		longt: 13.434989,
		name: 'Cafe 1',
		visible: true,
		placeType: 'cafe'
	},
	{
		lat: 52.530875,
		longt: 13.403017,
		name: 'Cafe 2',
		visible: true,
		placeType: 'cafe'
	},
	{
		lat: 52.535259,
		longt: 13.437249,
		name: 'Cafe 3',
		visible: true,
		placeType: 'cafe'
	},
	{
		lat: 52.537371,
		longt: 13.420482,
		name: 'Shop 1',
		visible: true,
		placeType: 'shop'
	},
	{
		lat: 52.526216,
		longt: 13.418327,
		name: 'Shop 2',
		visible: true,
		placeType: 'shop'
	},
	{
		lat: 52.533257,
		longt: 13.415247,
		name: 'Shop 3',
		visible: true,
		placeType: 'shop'
	},
	{
		lat: 52.535369,
		longt: 13.425480,
		name: 'Bar',
		visible: true,
		placeType: 'misc'
	},
	{
		lat: 52.534214,
		longt: 13.422325,
		name: 'Library',
		visible: true,
		placeType: 'misc'
	},
	{
		lat: 52.533255,
		longt: 13.437255,
		name: 'Chirch',
		visible: true,
		placeType: 'misc'
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
				koVisible: ko.observable(true),
				placeType: places[i].placeType
			}));
		}
	}

	self.filterMarkers = function () {

		for (var i = 0; i < self.markers().length; i++) {
			var name = self.markers()[i].title.toLowerCase();

			if (name.indexOf(self.userInput()) >= 0) {
				self.setPlaceVisible(self.markers()[i], true);
			}
			else {
				self.setPlaceVisible(self.markers()[i], false);
			}
		}
		return true;
	}

	self.filterMarkersByType = function (type) {
		for (var i = 0; i < self.markers().length; i++) {
			var placeType = self.markers()[i].placeType.toLowerCase();

			if (placeType.indexOf(type) >= 0) {
				self.setPlaceVisible(self.markers()[i], true);
			}
			else {
				self.setPlaceVisible(self.markers()[i], false);
			}
		}
	}

	// This function updates two properties of marker at the same time.
	// It is necessary because visible property of google marker can not be made an observable
	self.setPlaceVisible = function (place, value) {
		place.setVisible(value);
		place.koVisible(value);
	}

	self.test = function() {
		console.log('test!!!');
	}

	self.applyMarkers();
};

ko.applyBindings(new ViewModel());
