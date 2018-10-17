import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

class SimpleModal extends Component {

  render() {
    return (
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader className="bg-torqiz hebrow-header" toggle={this.props.toggle}>{this.props.header}</ModalHeader>
          <ModalBody>
              {this.props.children} 
          </ModalBody>
        </Modal>
    );
  }
}

export default SimpleModal;