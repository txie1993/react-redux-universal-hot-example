import fetch from 'isomorphic-fetch';

const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
const REQUEST_WEATHER = 'REQUEST_WEATHER';

const receiveWeather = (weather) => ({
  type: RECEIVE_WEATHER,
  weather
});

const requestWeather = () => ({
  type: REQUEST_WEATHER
});

export default function reducer(initialState = {isFetching: true}, action = {}) {
  switch (action.type) {
    case REQUEST_WEATHER:
      return Object.assign({}, initialState, {
        isFetching: true,
      });
    case RECEIVE_WEATHER:
      return Object.assign({}, initialState, {
        isFetching: false,
        current: action.weather
      });
    default:
      return initialState;
  }
}

export const fetchWeather = (zip) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=5f686178cf5a8befa9c3323296d7d62e`;

  return (dispatch) => {
    dispatch(requestWeather());

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveWeather(json)))
      .catch(error => console.log(error));
  };
};
