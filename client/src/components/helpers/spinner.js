import React, { Component } from 'react';
import {
  Modal
} from 'reactstrap';

class Spinner extends Component {

  render() {
    return (
        <div className={this.props.isOpen ? "spinner-modal" : 'hide'}>
          <i className="fas fa-circle-notch fa-spin fa-3x"></i>
        </div>
    );
  }
}

export default Spinner;