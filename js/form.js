import {
  sendData,
  URL_SERVER
} from './api.js';
import {
  mainMarker,
  mainCoordinateLat,
  mainCoordinateLng
} from './map.js';

import { closePopup } from './util.js';

const adForm = document.querySelector('.ad-form');
const housingType = adForm.querySelector('#type');
const priceForNight = adForm.querySelector('#price');
const addressValue = document.querySelector('#address');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const formElementTime = adForm.querySelector('.ad-form__element--time');
const headlineInput = adForm.querySelector('#title');
const roomsInput = adForm.querySelector('#room_number');
const guestsInput = adForm.querySelector('#capacity');
const description = adForm.querySelector('#description');
const resetFormBtn = adForm.querySelector('.ad-form__reset');

const successTemplate = document.querySelector('#success ').content;
const newSuccessTemplate = successTemplate.querySelector('.success');
const successPopup = newSuccessTemplate.cloneNode(true);

const errorTemplate = document.querySelector('#error').content;
const newErrorTemplate = errorTemplate.querySelector('.error')
const errorPopup = newErrorTemplate.cloneNode(true);
const errorButton = errorPopup.querySelector('.error__button');

const MIN_HEADLINE_LENGTH = 30;
const MAX_HEADLINE_LENGTH = 100;
const GUESTS_IN_ROOMS = { // Соответствие комнат и гостей по индексам
  0: [2],
  1: [1, 2],
  2: [0, 1, 2],
  3: [3],
};

housingType.addEventListener('change', (evt) => {
  switch (evt.target.value) {
    case 'palace':
      priceForNight.value = '';
      priceForNight.placeholder = 10000;
      priceForNight.setAttribute('min', 10000);
      break;
    case 'flat':
      priceForNight.value = '';
      priceForNight.placeholder = 1000;
      priceForNight.setAttribute('min', 1000);
      break;
    case 'house':
      priceForNight.value = '';
      priceForNight.placeholder = 5000;
      priceForNight.setAttribute('min', 5000);
      break;
    case 'bungalow':
      priceForNight.value = '';
      priceForNight.placeholder = 0;
      priceForNight.setAttribute('min', 0);
      break;
  }
});

formElementTime.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
});

headlineInput.addEventListener('input', (evt) => {
  const valueLength = evt.target.value.valueLength;

  if (valueLength < MIN_HEADLINE_LENGTH) {
    headlineInput.setCustomValidity('Еще ' + (MIN_HEADLINE_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_HEADLINE_LENGTH) {
    headlineInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_HEADLINE_LENGTH) +' симв.');
  } else {
    headlineInput.setCustomValidity('');
  }
  headlineInput.reportValidity();
});

const checkGuestsInRooms = () => {
  return GUESTS_IN_ROOMS[roomsInput.selectedIndex].includes(guestsInput.selectedIndex);
}

const onRoomsGuests = (evt) => {
  const valid = checkGuestsInRooms();
  if(valid) {
    evt.target.setCustomValidity('')
  } else {
    evt.target.setCustomValidity('Проверьте данные')
  }
  evt.target.reportValidity();
}

roomsInput.addEventListener('change', onRoomsGuests);
guestsInput.addEventListener('change', onRoomsGuests);

const resetForm = () => {
  headlineInput.value = '';
  addressValue.value = `${mainCoordinateLat}, ${mainCoordinateLng}`;
  mainMarker.setLatLng([mainCoordinateLat, mainCoordinateLng]);
  housingType.value = 'flat';
  priceForNight.value = '';
  priceForNight.placeholder = '1000';
  timeIn.value = '12:00';
  timeOut.value = '12:00';
  roomsInput.value = '1';
  guestsInput.value = '1';
  description.value = '';
};

const showSuccess = () => {
  resetForm();
  document.body.append(successPopup);
  closePopup(successPopup);
};

const showError = () => {
  document.body.append(errorPopup);
  closePopup(errorPopup, errorButton);
};

resetFormBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
})

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  sendData(URL_SERVER, showSuccess, showError, data)
});
