export function load_google_maps() {
    return new Promise(function(resolve, reject) {
      // define the global callback that will run when google maps is loaded
      window.resolveGoogleMapsPromise = function() {
        // resolve the google object
        resolve(window.google);
        // delete the global callback to tidy up since it is no longer needed
        delete window.resolveGoogleMapsPromise;
      }
      // Now, Load the Google Maps API
      const script = document.createElement("script");
      const API_KEY = 'AIzaSyAKxOIw7OTYYzdQLNfQJMN_h3aLGXkOrzk';
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
      script.async = true;
      document.body.appendChild(script);
    });
  }

export function load_places() {
    let city = 'New York, NY';
    let query = 'Shopping Center';
    var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=PWDZJ1WOTHALOLRB3LEH55SHB0PD4EL5P1HKUVL1RX0QGNUW&client_secret=FNDLKEC2LCSWDCS5MPQRVUXZHSEU0DQJXUOXUZBC2QPF4IG5&v=20180111%20&limit=25&near=' + city + '&query=' + query + '';
    return fetch(apiURL).then(resp => resp.json())
}