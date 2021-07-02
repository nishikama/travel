'use strict';

import loadGoogleMapsApi from 'load-google-maps-api';

class Map {
	static loadGoogleMapsApi() {
		return loadGoogleMapsApi({
			key: 'AIzaSyDL-zn7P57bfGRT9epnOmDqkvoGu8eANWs',
		});
	}
}

export default Map;
