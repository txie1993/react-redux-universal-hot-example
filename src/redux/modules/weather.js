const FETCH_WEATHER = "FETCH_WEATHER";
const RECEIVE_WEATHER = "RECEIVE_WEATHER";

const fetchWeather = () => $.ajax {
  type: FETCH_WEATHER
};
const receiveWeather = (weather) => $.ajax {
  type: FETCH_WEATHER,
  weather
};

export default function reducer(initialState = {}, action = {}) {
  switch (action.type) {
    case FETCH_WEATHER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_WEATHER:
      return Object.assign({}, state, {
        isFetching: false,
        current: action.weather
      });
    default:
      return initialState;
  }
}

export function fetchWeather(params) {
	const url = `http://api.openweathermap.org/data/2.5/weather?${params}&units=metric&appid=${APP_ID}`;

	return (dispatch) => {
		dispatch(requestWeather());

		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(receiveWeather(json)))
			.catch(error => dispatch(requestWeatherFailed(error.toString())));
	};
}
