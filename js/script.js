function initialize() {

	var markers = [];

	var cafe = new google.maps.LatLng(52.535372, 13.422328);

	var supermarket = new google.maps.LatLng(52.534217, 13.425483);

	var mapProp = {
		center:new google.maps.LatLng(52.531283, 13.422102),
		zoom:15,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};

	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

	// Create the search box and link it to the UI element.

	var input = document.getElementById(('pac-input'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

	// [START region_getplaces]
	// Listen for the event fired when the user selects an item from the
	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();
		if (places.length == 0) {
			return;
		}
		for (var i = 0, marker; marker = markers[i]; i++) {
			marker.setMap(null);
		}

		// For each place, get the icon, place name, and location.
		markers = [];
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0, place; place = places[i]; i++) {
			var image = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			// Create a marker for each place.
			var marker = new google.maps.Marker({
				map: map,
				icon: image,
				title: place.name,
				position: place.geometry.location
			});

			markers.push(marker);

			bounds.extend(place.geometry.location);
		}

		map.fitBounds(bounds);
	});

	// [END region_getplaces]

	// Bias the SearchBox results towards places that are within the bounds of the
	// current map's viewport.
	google.maps.event.addListener(map, 'bounds_changed', function() {
		var bounds = map.getBounds();
		searchBox.setBounds(bounds);
	});


	var marker = new google.maps.Marker({
		position: cafe,
		map: map,
		title: 'Cafe!',
		draggable:true,
		animation: google.maps.Animation.DROP
	});

	var marker = new google.maps.Marker({
		position: supermarket,
		map: map,
		title: 'Supermarket!',
		draggable:true,
		animation: google.maps.Animation.DROP
	});
}
google.maps.event.addDomListener(window, 'load', initialize);
