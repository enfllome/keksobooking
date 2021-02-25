const housingType = document.querySelector('#type');
const priceForNight = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

housingType.addEventListener('change', (evt) => {
  switch ( evt.target.value ) {
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

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

