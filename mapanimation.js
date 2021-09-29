
// mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiamFhcm9uIiwiYSI6ImNrdGhqbng0ZTAzM3kzMW1zdmZrZ3hqdDQifQ.KL46guHqXp9UKPGyxXKsZQ';

//starting point
var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.091542,42.358862],
        zoom: 12
    });

//Array to hold bus markers
var busLocation = [];

//function to move buses
async function run(){    
	const locations = await getBusLocations();
	//console.log(locations);

// for loop to go through add bus markers to map
	for (let i = 0; i < locations.length; i++) { 
		
		if (busLocation.length < locations.length) {
		busname = new mapboxgl.Marker()
		busname.setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude])
		.addTo(map)
		//adding bus array to array
		busLocation.push(busname);
		}
		// if the Array is full then start moving the buses
		if  (busLocation.length === locations.length) {
			busname = busLocation[i];
			busname.setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude])
			}
	}

	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();
