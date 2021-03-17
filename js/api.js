const URL_DATA = 'https://22.javascript.pages.academy/keksobooking/data';

const getData = (url, onSuccess, onError) => {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}`);
    })
    .then((json) => {
      onSuccess(json);
    })
}


export {
  getData,
  URL_DATA
}
