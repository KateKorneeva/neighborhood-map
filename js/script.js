var places = [
	{
		lat: 52.529648,
		longt: 13.434989,
		name: 'Cafe 1',
		visible: true,
		placeType: 'cafe',
		infoContent: 'content replacement'
	},
	{
		lat: 52.530875,
		longt: 13.403017,
		name: 'Cafe 2',
		visible: true,
		placeType: 'cafe',
		infoContent: 'content replacement'
	},
	{
		lat: 52.535259,
		longt: 13.437249,
		name: 'Cafe 3',
		visible: true,
		placeType: 'cafe',
		infoContent: 'content replacement'
	},
	{
		lat: 52.537371,
		longt: 13.420482,
		name: 'Shop 1',
		visible: true,
		placeType: 'shop',
		infoContent: 'content replacement'
	},
	{
		lat: 52.526216,
		longt: 13.418327,
		name: 'Shop 2',
		visible: true,
		placeType: 'shop',
		infoContent: 'content replacement'
	},
	{
		lat: 52.533257,
		longt: 13.415247,
		name: 'Shop 3',
		visible: true,
		placeType: 'shop',
		infoContent: 'content replacement'
	},
	{
		lat: 52.535369,
		longt: 13.425480,
		name: 'Bar',
		visible: true,
		placeType: 'misc',
		infoContent: 'content replacement'
	},
	{
		lat: 52.534214,
		longt: 13.422325,
		name: 'Library',
		visible: true,
		placeType: 'misc',
		infoContent: 'content replacement'
	},
	{
		lat: 52.533255,
		longt: 13.437255,
		name: 'Chirch',
		visible: true,
		placeType: 'misc',
		infoContent: 'content replacement'
	}
];

function initialize() {

	var mapProp = {
		center: new google.maps.LatLng(52.531283, 13.422102),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);


	google.maps.event.addListener(map, 'click', function() {
		// self.markers()[1].infoWindow.open(map,self.markers()[1]);
		console.log('la');
	});

	var ViewModel = function () {

		var self = this;

		self.userInput = ko.observable();
		self.markers = ko.observableArray([]);
		self.infoWindows = ko.observableArray([]);
		self.isVisible = ko.observable(true);

		self.applyMarkers = function (foursqPlaces) {
			for (var i = 0; i < foursqPlaces.length; i++) {
				var foursqPlace = foursqPlaces[i];
				var marker = new google.maps.Marker ({
					position: new google.maps.LatLng(foursqPlaces[i].location.lat, foursqPlaces[i].location.lng),
					map: map,
					title: foursqPlaces[i].name,
					visible: true,
					koVisible: ko.observable(true),
					placeType: foursqPlaces[i].categories.name,
					infoWindow: new google.maps.InfoWindow({content: foursqPlaces[i].name})
				});
				self.markers.push(marker);

				google.maps.event.addListener(marker, 'click', (function(markerCopy) {
					return function () {
						markerCopy.infoWindow.open(map,markerCopy);
						console.log('ffff');
					};
				})(marker));
			}
		}

		var client_id = "4CPJVSPROXAN332ZFSRUGBVMW4LFWYOYMVTDEFQ2NOFUU42O";
		var client_secret = "KSXNQ4KXF4SLJIQQ0UWMJR4ZWIXWGQ4CL4VW1D2IR1BC0XKV";
		var location = "52.531283, 13.422102";
		var dateAndTime = "20150515";
		var url ="https://api.foursquare.com/v2/venues/search?ll="+location+
			"&client_id="+client_id+
			"&client_secret="+client_secret+
			"&v="+dateAndTime+
			"&query=sushi";

		$.getJSON( url, function(result, status) {
			if (status !== 'success') return alert('Request to Foursquare failed, haha');
			// Transform each venue result into a marker on the map.
			self.applyMarkers(result.response.venues);
		});

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

		self.openInfoWindow = function (marker) {
			marker.infoWindow.open(map, marker);
		}


		// This function updates two properties of marker at the same time.
		// It is necessary because visible property of google marker can not be made an observable
		self.setPlaceVisible = function (place, value) {
			place.setVisible(value);
			place.koVisible(value);
		}

		self.test = function () {
			console.log('test!!!');
		}

		// self.applyMarkers();
	};

	ko.applyBindings(new ViewModel());
}

google.maps.event.addDomListener(window, 'load', initialize);