const housingType = document.querySelector('#type');
const priceForNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const formElementTime = document.querySelector('.ad-form__element--time');
const headlineInput = document.querySelector('#title');
const roomNumberInut = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');

const MIN_HEADLINE_LENGTH = 30;
const MAX_HEADLINE_LENGTH = 100;

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

roomNumberInut.addEventListener('change', (evt) => {
  capacityInput.value = evt.target.value;
});

capacityInput.addEventListener('change', (evt) => {
  roomNumberInut.value = evt.target.value;
});
