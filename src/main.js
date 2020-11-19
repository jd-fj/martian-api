import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service-fetch.js';
import ImageService from './image-service.js';
import ImgSearch from './img-search.js';

function getElements(response) {
  if (response[698]){
    $('#atmosphericTemp').text(`The atmospheric temperature on Mars is ${response[698].AT.av} degrees Something?`);
  } else if (response.photos) {
    $('#marsImage').append(`<img src="${response.photos[15].img_src}">`);
  } else if (response.collection.items) {
    for(let i=0;i<=5;i++){
      $('#imgSearchResults').append(`<img src="${response.collection.items[i].links[0].href}">`);
    }
  }else {
    $('#errorSection').text(`There was an error: ${response.message}`);
  }
}

async function makeApiCall() {
  const response = await WeatherService.getWeather();
  getElements(response);
}

async function makeImgCall() {
  const response = await ImageService.getImage();
  getElements(response);
}

async function makeSearchCall(search) {
  const response = await ImgSearch.getImgSearch(search);
  getElements(response);
  console.log(search);
}

$(document).ready(function() {
  makeApiCall();
  makeImgCall();
  $('#searchClick').click(function(){
    let search = $('#userSeach').val();
    $('#imgSearchResults').empty();
    makeSearchCall(search);
    console.log("clicked");
  });
});