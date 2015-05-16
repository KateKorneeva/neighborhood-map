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

var mapProp = {
	center: new google.maps.LatLng(52.531283, 13.422102),
	zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

var ViewModel = function () {
	var self = this;
	self.places = ko.observableArray([]);
	initialPlaces.forEach( function(placeObj) {
		self.places.push(new Place(placeObj));
	});

	self.userInput = ko.observable("");

	self.searchFilter = ko.pureComputed(function() {
		var testVar = "";
		initialPlaces.forEach( function(placeObj) {
			if (placeObj.name.indexOf(self.userInput()) >= 0) {
				testVar = placeObj.name;
			}
		});
		return testVar;
	}, this);
};

function Place(placeObj) {
	this.name = placeObj.name;
	this.lat = ko.observable(placeObj.lat);
	this.longt = ko.observable(placeObj.longt);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(this.lat, this.longt),
		title: name,
		map: map,
		draggable: true
	});
}

ko.applyBindings(new ViewModel());
