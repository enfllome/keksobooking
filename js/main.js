'use strict';

const firstRangeNumber = 139.70000;
const secondRangeNumber = 139.80000;

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

const intResult = getRandomInt(firstRangeNumber, secondRangeNumber);
const floatResult = getRandomFloat(firstRangeNumber, secondRangeNumber, 2);

alert('Рандомное целое число: ' + intResult);
alert('Рандомное дробное число: ' + floatResult);
