function initialize() {

	var cafe = new google.maps.LatLng(52.535372, 13.422328);

	var supermarket = new google.maps.LatLng(52.534217, 13.425483);

	var mapProp = {
		center:new google.maps.LatLng(52.531283, 13.422102),
		zoom:15,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};

	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

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
