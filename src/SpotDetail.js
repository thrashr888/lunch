import React, { Component } from 'react';
import './SpotDetail.css';


class SpotDetail extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  // componentWillMount() {

  // }

  render() {
    // console.log('SpotDetail.props', this.props);
    // console.log('SpotDetail.state', this.state);
    return (
      <h2 className="SpotDetail">
        {this.props.spot ? this.props.spot.name : null}
      </h2>
    );
  }
}

export default SpotDetail;
