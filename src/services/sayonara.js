// Class to handle getting the sayonara /public
class SayonaraService {
  constructor() {
    // Our site json
    this.siteJson = false;

    // Our current api url
    this.apiPublicPath = '/api/public';
    this.apiUrl = '//' + document.location.host + this.apiPublicPath;
    if(process.env.NODE_ENV === 'development') {
      //this.apiUrl = '//' + document.location.hostname + ':8000' + this.apiPublicPath;
      this.apiUrl = 'https://leahrosegarza.com/api/public';
    }
  }

  getSayonaraSite() {
    return new Promise((resolve, reject) => {
      if(this.siteJson) {
        resolve(this.siteJson);
      }

      // Fetch the json
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

// Create an instance of sayonara
const Sayonara = new SayonaraService();
export default Sayonara;
