/* global L:readonly */
import {
  goToInactiveState,
  goToActiveState
} from './util.js';

import { offers } from './data.js';
import { createAdCard } from './similar-card.js';

const adForm = document.querySelector('.ad-form');
const allFieldset = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilterChildren = mapFilters.children;
const mapFilterItems = Array.from(mapFilterChildren);
const addressValue = document.querySelector('#address');
const mainCoordinateLat = 35.68331;
const mainCoordinateLng = 139.7631;

goToInactiveState(mapFilters, adForm, allFieldset, mapFilterItems);

const map = L.map('map-canvas')
  .on('load', () => {
    goToActiveState(mapFilters, adForm, allFieldset, mapFilterItems);
    addressValue.setAttribute('disabled', 'disabled');
    addressValue.value = `${mainCoordinateLat}, ${mainCoordinateLng}`;
  })
  .setView(
    {
      lat: mainCoordinateLat,
      lng: mainCoordinateLng,
    }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
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

offers.forEach((offersItem) => {
  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  const marker = L.marker(
    {
      lat: offersItem.location.x,
      lng: offersItem.location.y,
    },
    {
      icon: pinIcon,
    },
  );

  marker.addTo(map).bindPopup(createAdCard(offersItem), {
    keepInView: true,
  });
});
