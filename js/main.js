const firstRangeNumber = -5;
const secondRangeNumber = 6;

const getRandomInt = function (a, b) {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  const result = Math.abs(Math.floor(Math.random() * (max - min + 1)) + min); //Максимум и минимум включаются
  return result;
}

const getRandomFloat = function (a, b, roundUp) {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  const result = Math.abs(Math.random() * (max - min) + min); //Максимум и минимум включаются
  return result.toFixed(roundUp);
}

const intResult = getRandomInt(firstRangeNumber, secondRangeNumber);
const floatResult = getRandomFloat(firstRangeNumber, secondRangeNumber, 3);

alert('Рандомное целое число: ' + intResult);
alert('Рандомное дробное число: ' + floatResult);

