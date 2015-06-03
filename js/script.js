function initialize() {

	var yourLat = 52.531283;
	var yourLng = 13.422102;
	var markerIcon = "./icon.png";
	var mapProp = {
		center: new google.maps.LatLng(yourLat, yourLng),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

	var ViewModel = function () {

		var self = this;

		self.userInput = ko.observable();
		self.markers = ko.observableArray([]);
		self.sections = ko.observableArray(["food", "drinks", "coffee", "shops", "arts", "outdoors"]);
		self.infoWindows = ko.observableArray([]);
		self.isVisible = ko.observable(true);

		var prevInfoWindow = false;

		var client_id = "4CPJVSPROXAN332ZFSRUGBVMW4LFWYOYMVTDEFQ2NOFUU42O";
		var client_secret = "KSXNQ4KXF4SLJIQQ0UWMJR4ZWIXWGQ4CL4VW1D2IR1BC0XKV";
		var location = yourLat + "," + yourLng;
		var date = "20150602";
		var baseUrl ="https://api.foursquare.com/v2/venues/explore?"+
			"ll="+location+
			"&client_id="+client_id+
			"&client_secret="+client_secret+
			"&v="+date;

		self.sendFoursqResponses = function () {
			for (var i = 0; i < self.sections().length; i++) {
				var section = self.sections()[i];
				var url = baseUrl + "&query=" + section;

				$.getJSON( url, function(result) {
					// Transform each venue result into a marker on the map.
					self.applyMarkers(result.response.groups[0].items, result.response.query);
				});
			};
		}
		self.sendFoursqResponses();

		self.applyMarkers = function (foursqPlaces, section) {
			for (var i = 0; i < foursqPlaces.length; i++) {

				var foursqPlace = foursqPlaces[i];
				var lng = foursqPlace.venue.location.lng;
				var lat = foursqPlace.venue.location.lat;
				var placeName = foursqPlace.venue.name
				var category = foursqPlace.venue.categories[0].name;
				var tips = "";
				var openStatus = "";
				var address = foursqPlace.venue.location.address;

				if (foursqPlace.venue.hours) {
					if (foursqPlace.venue.hours.isOpen) {
						openStatus = foursqPlace.venue.hours.status;
					} 
				}

				if (foursqPlace.tips) {
					tips = foursqPlace.tips[0].text
				}

				var infoWContent = "<h3>" + placeName + "</h3>" +
									"<p>" + category + "</p>"+
									"<p>" + tips + "</p>"+
									"<p>" + openStatus + "</p>" +
									"<p>" + address + "</p>";

				var marker = new google.maps.Marker ({
					position: new google.maps.LatLng(lat,lng),
					map: map,
					title: placeName,
					visible: true,
					koVisible: ko.observable(true),
					section: section,
					icon: markerIcon,
					animation: google.maps.Animation.DROP,
					infoWindow: new google.maps.InfoWindow({content: infoWContent})
				});
				self.markers.push(marker);

				google.maps.event.addListener(marker, 'click', (function(markerCopy) {
					return function () {
						self.openInfoWindow(markerCopy);
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