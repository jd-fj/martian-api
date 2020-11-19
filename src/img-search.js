export default class ImgSearch {
  static async getImgSearch(search) {
    try { 
      const response = await fetch(`https://images-api.nasa.gov/search?q=${search}&page=1&media_type=image`);
      if (!response.ok) {
        throw Error(response.statusText);
      } 
      return response.json(); 
    } catch(error) {
      return error.message;
    } 
  }
}