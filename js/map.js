/* global L:readonly */
/* global _:readonly */
import {
  goToInactiveState,
  goToActiveState,
  goToInactiveFiltersState,
  showAlert
} from './util.js';
import { createAdCard } from './similar-card.js';
import {
  getData,
  URL_DATA
} from './api.js';
import {
  checkHouseType,
  checkPrice,
  checkRooms,
  changeElement,
  checkGuests,
  checkFeatures
} from './filter.js';

const adForm = document.querySelector('.ad-form');
const allFieldset = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilterChildren = mapFilters.children;
const mapFilterItems = Array.from(mapFilterChildren);
const addressValue = document.querySelector('#address');
const mainCoordinateLat = 35.68331;
const mainCoordinateLng = 139.7631;

const MAP_SIZE = 13;
const OFFERS_COUNT = 10;
const DEBOUNSE_DELAY = 500;

const showError = () => {
  showAlert('Данные объявлений не загружены, попробуйте позже')
  goToInactiveFiltersState(mapFilters, mapFilterItems);
};

goToInactiveState(mapFilters, adForm, allFieldset, mapFilterItems);

const layerGroup = L.layerGroup();

const createAdMarkers = (offersList) => {
  offersList
    .slice()
    .filter((el) => checkHouseType(el))
    .filter((el) => checkPrice(el))
    .filter((el) => checkRooms(el))
    .filter((el) => checkGuests(el))
    .filter((el) => checkFeatures(el))
    .slice(0, OFFERS_COUNT)
    .forEach((offersItem) => {
      const pinIcon = L.icon({
        iconUrl: './img/pin.svg',
        iconSize: [42, 42],
        iconAnchor: [21, 42],
      });
      const marker = L.marker(
        {
          lat: offersItem.location.lat,
          lng: offersItem.location.lng,
        },
        {
          icon: pinIcon,
        },
      );

      marker
        .addTo(layerGroup)
        .bindPopup(createAdCard(offersItem), {
          keepInView: true,
        });

      layerGroup.addTo(map);
    });
};

const map = L.map('map-canvas')
  .on('load', () => {
    goToActiveState(mapFilters, adForm, allFieldset, mapFilterItems);
    addressValue.setAttribute('readonly', 'readonly');
    addressValue.value = `${mainCoordinateLat}, ${mainCoordinateLng}`;
    getData(
      URL_DATA,
      (offers) => {
        createAdMarkers(offers);
        changeElement(_.debounce(
          () => {
            layerGroup.clearLayers();
            createAdMarkers(offers);
          }, DEBOUNSE_DELAY))
      },
      showError,
    );
  })
  .setView(
    {
      lat: mainCoordinateLat,
      lng: mainCoordinateLng,
    }, MAP_SIZE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: mainCoordinateLat,
    lng: mainCoordinateLng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinateValue = evt.target.getLatLng();
  const ROUND_UP = 5;
  let coordinateLat = coordinateValue.lat;
  let coordinateLng = coordinateValue.lng;
  addressValue.value = `${coordinateLat.toFixed(ROUND_UP)}, ${coordinateLng.toFixed(ROUND_UP)}`;
});

export {
  mainMarker,
  mainCoordinateLat,
  mainCoordinateLng
}
