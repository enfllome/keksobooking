'use strict';


const getRandomInt = (bottom, top) => {
  const min = Math.ceil(Math.min(bottom, top));
  const max = Math.floor(Math.max(bottom, top));
  const result = Math.abs(Math.floor(Math.random() * (max - min + 1)) + min); //Максимум и минимум включаются
  return result;
}

const getRandomFloat = (bottom, top, roundUp = 2) => {
  const min = Math.min(bottom, top);
  const max = Math.max(bottom, top);
  const result = Math.abs(Math.random() * (max - min) + min); //Максимум и минимум включаются
  return result.toFixed(roundUp);
}

const offerTitles = [
  'Лучшее предложение',
  'Эконом вариант',
  'Для любителей старины',
];

const priceList = [100, 200, 300, 400];

const housingType = [
  'palace',
  'flat',
  'house',
  'bungalow',
]

const chekinTimes = [
  '12::00',
  '13::00',
  '14::00',
];

const chekOutTimes = [
  '12::00',
  '13::00',
  '14::00',
];

const housingFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const OFFERS_COUNT = 10;

const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

const createRandomOffer = () => {
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInt(1, 8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(offerTitles),
      address: '{{location.x}}, {{location.y}}',
      price: getRandomArrayElement(priceList),
      type:  getRandomArrayElement(housingType),
      rooms: 1,
      guests: 2,
      checkin: getRandomArrayElement(chekinTimes),
      checkout: getRandomArrayElement(chekOutTimes),
      features: getRandomArrayElement(housingFeatures),
      description: 'Уютная квартира для семейной пары в центре Москвы.',
      photos: getRandomArrayElement(photos),
    },
    location: {
      x: getRandomFloat(35.65000, 35.70000),
      y: getRandomFloat(139.70000, 139.80000),
    },
  }
}

const offers = new Array(OFFERS_COUNT).fill(null).map(() => createRandomOffer());
