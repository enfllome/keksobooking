const housingType = document.querySelector('#type');
const priceForNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const formElementTime = document.querySelector('.ad-form__element--time');
const headlineInput = document.querySelector('#title');
const roomsInput = document.querySelector('#room_number');
const guestsInput = document.querySelector('#capacity');

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
