import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {fetchWeather} from '../../redux/modules/weather';

class Weather extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      zip: ''
    };
    this.handleZip = this.handleZip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidReceiveProps() {
    console.log(this.props);
  }

  handleZip(event) {
    event.preventDefault();
    this.setState({zip: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchWeather(this.state.zip);
  }

  currentWeather() {
    if (this.props.weather.current) {
      return (
        <h1>{Math.floor(this.props.weather.current.main.temp - 273)} Degrees C in {this.props.weather.current.name}</h1>
      );
    } return (<h1>Nothing yet</h1>);
  }

  render() {
    return (
      <div>
        <Helmet title="Weather"/>
        <h1>Weather</h1>
        <input type="text" value={this.state.zip} onChange={this.handleZip}/>
        <button onClick={this.handleSubmit}>Check Weather</button>
        {this.currentWeather()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({weather: state.weather});

const mapDispatchToProps = (dispatch) => ({
  fetchWeather: (zip) => dispatch(fetchWeather(zip))
});

Weather = connect(mapStateToProps, mapDispatchToProps)(Weather);
Weather.propTypes = {
  fetchWeather: React.PropTypes.func,
  weather: React.PropTypes.object
};
export default Weather;
