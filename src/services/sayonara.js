// Class to handle getting the sayonara /api/public
class SayonaraService {
  constructor() {
    // Our site json
    this.siteJson = false;

    // Our current api url
    // Defaults to Production if we are not currently developing
    this.apiPublicPath = '/api/public';
    this.apiUrl = '//' + document.location.host + this.apiPublicPath;
    if(process.env.NODE_ENV === 'development') {
      this.apiUrl = '//' + document.location.hostname + ':8000' + this.apiPublicPath;
    }
  }

  // Function to return the site json
  getSayonaraSite() {
    // Return a rpomise to expose the same object on request
    return new Promise((resolve, reject) => {
      // If we already have the site JSON simply return
      if(this.siteJson) {
        resolve(this.siteJson);
      }

      // Fetch/Parse the json from the API
      fetch(this.apiUrl)
      .then((response) => {
        return response.json()
      }).then((json) => {
        console.log('parsed json', json);
        this.siteJson = json;
        resolve(json);
      }).catch((ex) => {
        console.error('Json failed', ex)
        reject(ex);
      });
    });
  }
}

// Create an instance of sayonara, and export that instance to be a singleton service.
const Sayonara = new SayonaraService();
export default Sayonara;
