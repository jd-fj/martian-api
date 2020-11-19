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
      $('#imgSearchResults').append(`<div class="card"><img src="${response.collection.items[i].links[0].href}">
      <p class="card-text">${response.collection.items[i].data[0].description}</p></div>`);
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
}

async function makeBackgroundCall(search) {
  const response = await ImgSearch.getImgSearch(search);
  background(response);
  console.log("call");
}

function background(response) {
  let random = Math.floor((Math.random()*10)+1);
  let randomUrl = `"url('${response.collection.items[random].links[0].href}')"`;
  document.body.style.backgroundImage = randomUrl;
  console.log(random);
  console.log(randomUrl);
}

$(document).ready(function() {
  makeBackgroundCall("earth");
  console.log(makeBackgroundCall("earth"));
  makeApiCall();
  makeImgCall();
  $('#searchClick').click(function(){
    let search = $('#userSeach').val();
    $('#imgSearchResults').empty();
    makeSearchCall(search);
    console.log(makeSearchCall(search));
  });
});