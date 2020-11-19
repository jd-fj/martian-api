export default class ImageService {
  static async getImage() {
    try { 
      const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-11-16&page=2&api_key=${process.env.API_KEY}`);
      if (!response.ok) {
        throw Error(response.statusText);
      } 
      return response.json(); 
    } catch(error) {
      return error.message;
    } 
  }
}