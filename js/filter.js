const HOUSE_TYPE_SETTINGS = {
  0: ['flat', 'palace', 'house', 'bungalow'],
  1: ['palace'],
  2: ['flat'],
  3: ['house'],
  4: ['bungalow'],
};

const ROOMS_SETTINGS = {
  0: [],
  1: [1],
  2: [2],
  3: [3],
};

const GUEST_SETTINGS = {
  0: [],
  1: [2],
  2: [1],
  3: [0],
};
const maxLimit = 150;

const filterHouseType = document.querySelector('#housing-type');
const filterPrice = document.querySelector('#housing-price');
const filterRooms = document.querySelector('#housing-rooms');
const filterGuests = document.querySelector('#housing-guests');
const filterFeaturesList = document.querySelector('#housing-features');
const filterFeaturesItems = filterFeaturesList.querySelectorAll('[name="features"]');


let minNumberOfRooms = 0;
let minNumberOfGuest = 0;

while(minNumberOfRooms <= maxLimit) {
  ROOMS_SETTINGS[0].push(minNumberOfRooms++);
}

while(minNumberOfGuest <= maxLimit) {
  GUEST_SETTINGS[0].push(minNumberOfGuest++);
}

const checkHouseType = (object) => HOUSE_TYPE_SETTINGS[filterHouseType.selectedIndex].includes(object.offer.type);

const checkPrice = (object) => {
  switch (filterPrice.selectedIndex) {
    case 0:
      return (object.offer.price >= 0);
    case 1:
      return (object.offer.price >= 10000 && object.offer.price <= 50000);
    case 2:
      return (object.offer.price < 10000 && object.offer.price >= 0);
    case 3:
      return (object.offer.price > 50000);
  }
};

const checkRooms = (object) => ROOMS_SETTINGS[filterRooms.selectedIndex].includes(object.offer.rooms);

const checkGuests = (object) => GUEST_SETTINGS[filterGuests.selectedIndex].includes(object.offer.guests);

const changeElement = (cb) => {
  filterPrice.addEventListener('change', () => {
    cb();
  });
  filterHouseType.addEventListener('change', () => {
    cb();
  });
  filterRooms.addEventListener('change', () => {
    cb();
  });
  filterGuests.addEventListener('change', () => {
    cb();
  });
  filterFeaturesItems.forEach((el) => el.addEventListener('change', () => {
    cb();
  }));
};

const checkFeatures = (object) => {
  const checkedFeatures = Array.from(filterFeaturesList.querySelectorAll('input:checked'));
  return checkedFeatures.every((item) => {
    return object.offer.features.some((feature) => {
      return feature === item.value;
    });
  });
};

export {
  checkHouseType,
  checkPrice,
  changeElement,
  checkRooms,
  checkGuests,
  checkFeatures
};
