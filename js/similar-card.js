import {offers} from './data.js'

const cardTemplate = document.querySelector('#card').content;
const newCardTemplate = cardTemplate.querySelector('.popup');
const card = newCardTemplate.cloneNode(true);
const map = document.querySelector('.map__canvas');

const offerTitle =  card.querySelector('.popup__title');
const offerAddress = card.querySelector('.popup__text--address');
const offerPrice = card.querySelector('.popup__text--price');
const offerType = card.querySelector('.popup__type');
const offerCapacity = card.querySelector('.popup__text--capacity');
const offerTime = card.querySelector('.popup__text--time');
const offerFeatures = card.querySelector('.popup__features');
const offerDescription = card.querySelector('.popup__description');
const offerPhotos = card.querySelector('.popup__photos');
const offerAvatar = card.querySelector('.popup__avatar');
const featureList = offers[0].offer.features;


offerTitle.textContent = offers[0].offer.title; // Вывод заголовка объявления
offerAddress.textContent = offers[0].offer.address.x + ' ' +  offers[0].offer.address.y // Вывод координат
offerPrice.textContent =  offers[0].offer.price + ' ₽/ночь'; // Вывод цены

switch( offers[0].offer.type) {
  case 'palace':
    offerType.textContent = 'Дворец';
    break;
  case 'flat':
    offerType.textContent = 'Квартира';
    break;
  case 'house':
    offerType.textContent = 'Дом';
    break;
  case 'bungalow':
    offerType.textContent = 'Бунгало';
    break;
}
offerCapacity.textContent = offers[0].offer.rooms + ' комнаты для ' + offers[0].offer.guests + ' гостей'; // Вывод типа жилья, проверенный чз switch
offerTime.textContent = 'Заезд после ' + offers[0].offer.checkin + ', выезд до ' + offers[0].offer.checkout;

offerFeatures.innerHTML = ''; // Очистил в шаблоне контейнер с "удобствами"

featureList.forEach(feature => { // Вывод фич в очищенный контейнер
  const offerFeatureItem = document.createElement('li');
  offerFeatureItem.classList.add('popup__feature', 'popup__feature--' + feature);
  offerFeatures.appendChild(offerFeatureItem);
});

offerDescription.textContent = offers[0].offer.description;


offerPhotos.innerHTML = ''; // Очистил в шаблоне контейнер с фотографиями жилья
const photoSrc = offers[0].offer.photos;


for (let i = 0; i < photoSrc.length; i++) { // Вывод фотографий в очищенный контейнер
  const offerPhotoItem = document.createElement('img');
  offerPhotoItem.classList.add('popup__photo');
  offerPhotoItem.setAttribute('width', 40);
  offerPhotoItem.setAttribute('height', 40);
  offerPhotoItem.src = photoSrc[i];
  offerPhotos.appendChild(offerPhotoItem);
}

offerAvatar.src = offers[0].author.avatar;


map.appendChild(card);
