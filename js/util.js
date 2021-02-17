const getRandomIntNumber = (bottom, top) => {
  const min = Math.ceil(Math.min(bottom, top));
  const max = Math.floor(Math.max(bottom, top));
  const result = Math.abs(Math.floor(Math.random() * (max - min + 1)) + min); //Максимум и минимум включаются
  return result;
}

const getRandomFloatNumber = (bottom, top, roundUp = 2) => {
  const min = Math.min(bottom, top);
  const max = Math.max(bottom, top);
  const result = Math.abs(Math.random() * (max - min) + min); //Максимум и минимум включаются
  return result.toFixed(roundUp);
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntNumber(0, elements.length - 1)];
};

const getNoRepeatElements = (elements) => {
  return elements.filter(() => Math.random() > 0.5);
};

export {
  getRandomIntNumber,
  getRandomFloatNumber,
  getRandomArrayElement,
  getNoRepeatElements
};
