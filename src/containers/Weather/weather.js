import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: ''
    };
    this.handleZip = this.handleZip.bind(this);
  }

  handleZip(event) {
    event.preventDefault();
    this.setState({zip: event.target.value});
  }

  render() {
    return (
      <div>
        <Helmet title="Weather"/>
        <h1>Weather</h1>
        <input type="text" value={this.state.zip} onChange={this.handleZip}/>
        <button>Check Weather</button>
      </div>
    );
  }
}
