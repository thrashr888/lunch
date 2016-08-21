import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import getSpot from './spots'
import SpotDetail from './SpotDetail'


class App extends Component {

  constructor() {
    super();
    this.state = {
      spot: null,
      filters: {
        maxDistance: localStorage.getItem('maxDistance') || 2,
        maxTime: localStorage.getItem('maxTime') || 1
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.distanceChange = this.distanceChange.bind(this);
  }

  getNewSpot() {
    getSpot(this.state.filters).then(function (spot) {

      this.setState({
        spot: spot
      })

    }.bind(this)).catch(function (err) {
      console.log(err);
    });
  }

  componentWillMount() {
    this.getNewSpot()
  }

  handleClick() {
    this.getNewSpot()
  }

  timeChange(e) {
    let curFilters = this.state.filters;
    curFilters.maxTime = parseFloat(e.target.value);
    console.log('time', curFilters.maxTime);
    localStorage.setItem('maxTime', curFilters.maxTime);
    this.setState({
      filters: curFilters
    });
    this.getNewSpot()
  }

  distanceChange(e) {
    let curFilters = this.state.filters;
    curFilters.maxDistance = parseFloat(e.target.value);
    console.log('dist', curFilters.maxDistance);
    localStorage.setItem('maxDistance', curFilters.maxDistance);
    this.setState({
      filters: curFilters
    });
    this.getNewSpot()
  }

  render() {
    // console.log('App.state', this.state);

    return (
      <div className="App">

        <div className="App-intro">
          <SpotDetail spot={this.state.spot} />
        </div>

        <div className="App-tool">
          <p>
            <label>Max Distance Tier</label><br />
            <select onChange={this.distanceChange} defaultValue={this.state.filters.maxDistance}>
              <option value="0">On this block</option>
              <option value="1">Within a few blocks</option>
              <option value="2">A short walk</option>
              <option value="3">A long walk</option>
              <option value="4">Need to drive, but close.</option>
              <option value="5">Super far!</option>
            </select>
          </p>

          <p>
            <label>Max Time</label><br />
            <select onChange={this.timeChange} defaultValue={this.state.filters.maxTime}>
              <option value="0.5">30 minutes</option>
              <option value="1">1 hour</option>
              <option value="1.5">1 hour 30 minutes</option>
              <option value="2">2 hours</option>
              <option value="99">2+ hours</option>
            </select>
          </p>
        </div>

        <div className="App-action">
          <button className="App-button" onClick={this.handleClick}>LUNCH?</button>
        </div>

      </div>
    );
  }
}

export default App;
