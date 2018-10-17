import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class ItemModal extends Component {

  static defaultProps = {
    actionOnToggle(){

    }
  };

  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.props.actionOnToggle()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit()
    this.toggle()
  };

  render() {
    return (
      <div>
        <a href="#" onClick={this.toggle}>
          <i className="fas fa-plus-circle fa-3x floating-icon"></i>
        </a>

        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader className="bg-torqiz hebrow-header" toggle={this.toggle}>{this.props.header}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              {this.props.children}
              <FormGroup>
                <Button color="success" style={{ marginTop: '2rem' }} block>
                  save
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ItemModal;