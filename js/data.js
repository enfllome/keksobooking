import {
  getRandomIntNumber,
  getRandomFloatNumber,
  getRandomArrayElement,
  getNoRepeatElements
} from './util.js';

const OFFER_TITLES = [
  'Лучшее предложение',
  'Эконом вариант',
  'Для любителей старины',
];

const PRICE_LIST = [100, 200, 300, 400];

const HOUSING_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
]

const CHEK_IN_TIMES = [
  '12::00',
  '13::00',
  '14::00',
];

const CHECK_OUT_TIMES = [
  '12::00',
  '13::00',
  '14::00',
];

const HOUSING_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Уютная квартира для семейной пары в центре Москвы.',
  'Солнечная квартика в Санкт-Петербурге',
  'Чистая и свежая комната в Уфе',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const OFFERS_COUNT = 3;

const getRandomCoordinate = () => {
  return {
    x: getRandomFloatNumber(35.65000, 35.70000),
    y: getRandomFloatNumber(139.70000, 139.80000),
  }
}

const photosList = new Array(getRandomIntNumber(1, PHOTOS.length))
  .fill(null)
  .map(() => getRandomArrayElement(PHOTOS));

const createRandomOffer = () => {
  const coordinates = getRandomCoordinate();

  return {
    author: {
      avatar: `img/avatars/user0${getRandomIntNumber(1, 8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: coordinates,
      price: getRandomArrayElement(PRICE_LIST),
      type:  getRandomArrayElement(HOUSING_TYPE),
      rooms: getRandomIntNumber(1, 5),
      guests: getRandomIntNumber(1, 3),
      checkin: getRandomArrayElement(CHEK_IN_TIMES),
      checkout: getRandomArrayElement(CHECK_OUT_TIMES),
      features: getNoRepeatElements(HOUSING_FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: photosList,
    },
    location: coordinates,
  }
};

const offers = new Array(OFFERS_COUNT)
  .fill(null)
  .map(() => createRandomOffer());

export {offers};
