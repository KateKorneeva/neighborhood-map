function initialize() {

	var cafe = new google.maps.LatLng(52.535372, 13.422328);
	var supermarket = new google.maps.LatLng(52.534217, 13.425483);
	var lalala = new google.maps.LatLng(52.533258, 13.437248);

	var mapProp = {
		center: new google.maps.LatLng(52.531283, 13.422102),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

	var initialMarkers = [
		{
			position: cafe,
			map: map,
			title: 'Cafe',
			draggable: true,
			animation: google.maps.Animation.DROP
		},
		{
			position: supermarket,
			map: map,
			title: 'Supermarket',
			draggable: true,
			animation: google.maps.Animation.DROP
		},
		{
			position: lalala,
			map: map,
			title: 'Lalala',
			draggable: true,
			animation: google.maps.Animation.DROP
		}
	];


	var ViewModel = function () {
		var self = this;
		self.markerList = ko.observableArray([]);
		initialMarkers.forEach( function(marker) {
			self.markerList.push(new google.maps.Marker(marker));
			console.log(marker);
		});

		self.userInput = ko.observable("fe");

		initialMarkers.forEach( function(marker) {
			console.log(self.userInput());
			if (marker.title.indexOf(self.userInput()) >= 0) {
				console.log("epic win");
			};
		});
	};

	ko.applyBindings(new ViewModel());
}
google.maps.event.addDomListener(window, 'load', initialize);
