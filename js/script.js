function initialize() {

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
		self.infoWindows = ko.observableArray([]);
		self.isVisible = ko.observable(true);

		var client_id = "4CPJVSPROXAN332ZFSRUGBVMW4LFWYOYMVTDEFQ2NOFUU42O";
		var client_secret = "KSXNQ4KXF4SLJIQQ0UWMJR4ZWIXWGQ4CL4VW1D2IR1BC0XKV";
		var location = "52.531283, 13.422102";
		var dateAndTime = "20150515";
		var url ="https://api.foursquare.com/v2/venues/search?ll="+location+
			"&client_id="+client_id+
			"&client_secret="+client_secret+
			"&v="+dateAndTime;

		var getFousquare = $.getJSON( url, function(result, status) {
			if (status !== 'success') return alert('Request to Foursquare failed, haha');
			// Transform each venue result into a marker on the map.
			self.applyMarkers(result.response.venues);
		});

		self.applyMarkers = function (foursqPlaces) {
			for (var i = 0; i < foursqPlaces.length; i++) {
				var foursqPlace = foursqPlaces[i];
				var marker = new google.maps.Marker ({
					position: new google.maps.LatLng(foursqPlace.location.lat, foursqPlace.location.lng),
					map: map,
					title: foursqPlace.name,
					visible: true,
					koVisible: ko.observable(true),
					placeType: foursqPlace.categories[0].name,
					infoWindow: new google.maps.InfoWindow({content: foursqPlace.name})
				});
				self.markers.push(marker);

				google.maps.event.addListener(marker, 'click', (function(markerCopy) {
					return function () {
						markerCopy.infoWindow.open(map,markerCopy);
					};
				})(marker));
			}

		}

		// self.getPlaceTypes = function () {
		// 	var initPlaceTypes = [];
		// 	for (var i = 0; i < self.markers().length; i++) {
		// 		var foursqPlaceType = self.markers()[i].placeType;
		// 		if (initPlaceTypes.indexOf(foursqPlaceType) < 0) {
		// 			initPlaceTypes.push(foursqPlaceType);
		// 		}
		// 	}
		// 	console.log(initPlaceTypes);
		// 	return initPlaceTypes;
		// }
		// self.placeTypes = ko.observableArray(self.getPlaceTypes());

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
			for (var i = 0; i < self.placeTypes().length; i++) {
				// var placeType = self.placeTypes()[i].toLowerCase();
				console.log(self.placeTypes()[i]);

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
	};

	ko.applyBindings(new ViewModel());
}

google.maps.event.addDomListener(window, 'load', initialize);