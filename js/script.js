// var Marker = function (markerObject) {
// 	var position = ko.observable(markerObject.position);
// 	var map = ko.observable(markerObject.map);
// 	var title = ko.observable(markerObject.title);
// 	var draggable = ko.observable(markerObject.draggable);
// 	var animation = ko.observable(markerObject.animation);
// };


function initialize() {

	var cafe = new google.maps.LatLng(52.535372, 13.422328);
	var supermarket = new google.maps.LatLng(52.534217, 13.425483);
	var lalala = new google.maps.LatLng(52.533258, 13.437248);

	var mapProp = {
		center:new google.maps.LatLng(52.531283, 13.422102),
		zoom:15,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

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
		this.markerList = ko.observableArray([]);
		initialMarkers.forEach( function(marker) {
			self.markerList.push(new google.maps.Marker(marker));
			console.log(marker);
		})
	};

	ko.applyBindings(new ViewModel());
}
google.maps.event.addDomListener(window, 'load', initialize);
