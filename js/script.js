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
		self.sections = ko.observableArray(["food", "drinks", "coffee", "shops", "arts", "outdoors", "sights", "trending", "specials"]);
		self.infoWindows = ko.observableArray([]);
		self.isVisible = ko.observable(true);

		var prevInfoWindow = false;

		var client_id = "4CPJVSPROXAN332ZFSRUGBVMW4LFWYOYMVTDEFQ2NOFUU42O";
		var client_secret = "KSXNQ4KXF4SLJIQQ0UWMJR4ZWIXWGQ4CL4VW1D2IR1BC0XKV";
		var location = "52.531283, 13.422102";
		var date = "20150602";
		var baseUrl ="https://api.foursquare.com/v2/venues/explore?ll="+location+
			"&client_id="+client_id+
			"&client_secret="+client_secret+
			"&v="+date;

		self.sendFoursqResponses = function () {
			for (var i = 0; i < self.sections().length; i++) {
				var section = self.sections()[i];
				var url = baseUrl + "&query=" + section;

				$.getJSON( url, function(result) {
					// if (status !== 'success') return alert('Request to Foursquare failed, haha');
					// console.log(result.response.groups[0].items);
					// Transform each venue result into a marker on the map.
					// console.log(result.response.query);
					self.applyMarkers(result.response.groups[0].items, result.response.query);
				});
			};
		}
		self.sendFoursqResponses();

		self.applyMarkers = function (foursqPlaces, section) {
			for (var i = 0; i < foursqPlaces.length; i++) {
				var foursqPlace = foursqPlaces[i].venue;
				var marker = new google.maps.Marker ({
					position: new google.maps.LatLng(foursqPlace.location.lat, foursqPlace.location.lng),
					map: map,
					title: foursqPlace.name,
					visible: true,
					koVisible: ko.observable(true),
					section: section,
					infoWindow: new google.maps.InfoWindow({content: foursqPlace.name})
				});
				self.markers.push(marker);

				google.maps.event.addListener(marker, 'click', (function(markerCopy) {
					return function () {
						self.openInfoWindow(markerCopy);
						// markerCopy.infoWindow.open(map,markerCopy);
					};
				})(marker));
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
				var placeType = self.markers()[i].section;
				// var placeType = self.markers()[i].placeType.toLowerCase();

				if (placeType.indexOf(type) >= 0) {
					self.setPlaceVisible(self.markers()[i], true);
				}
				else {
					self.setPlaceVisible(self.markers()[i], false);
				}
			}
		}

		self.openInfoWindow = function (marker) {
			if (prevInfoWindow) {
				prevInfoWindow.close();
			}
			marker.infoWindow.open(map, marker);
			prevInfoWindow = marker.infoWindow;
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