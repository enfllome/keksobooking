'use strict';

const firstRangeNumber = -5;
const secondRangeNumber = 6;

const getRandomInt = (bottom, top) => {
  const min = Math.ceil(Math.min(bottom, top));
  const max = Math.floor(Math.max(bottom, top));
  const result = Math.abs(Math.floor(Math.random() * (max - min + 1)) + min); //Максимум и минимум включаются
  return result;
}

const getRandomFloat = (bottom, top, roundUp) => {
  const min = Math.ceil(Math.min(bottom, top));
  const max = Math.floor(Math.max(bottom, top));
  const result = Math.abs(Math.random() * (max - min) + min); //Максимум и минимум включаются
  return result.toFixed(roundUp);
}

const intResult = getRandomInt(firstRangeNumber, secondRangeNumber);
const floatResult = getRandomFloat(firstRangeNumber, secondRangeNumber, 3);

alert('Рандомное целое число: ' + intResult);
alert('Рандомное дробное число: ' + floatResult);

