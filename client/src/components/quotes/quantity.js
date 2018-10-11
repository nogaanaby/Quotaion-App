import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Collapse,
  Dropdown,
  DropdownMenu, 
  DropdownItem,
  DropdownToggle,
  Button,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon, 
  Row,
  Col,
  InputGroupText
} from 'reactstrap';

class Quantity extends Component {
  constructor(props){
    super(props);
    this.state = {
      price: this.props.basicPrice
    };
  }

  handleIncament = (direction) => {
    let newQuantity;
    if(direction === 'decreace') {
      if(this.props.quantity <= 1 ) {
        this.props.unMount()
      } else {
        newQuantity = this.props.quantity - 1
      }
    } else {
      newQuantity = this.props.quantity + 1
    }
    this.setState({
      price: this.props.basicPrice * newQuantity
    })
    this.props.updateQuantity(newQuantity)
  }

  render() {
    return (
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button color="danger"
              onClick={() => this.handleIncament('decreace')}><i className="fas fa-minus"></i></Button>
          </InputGroupAddon>
          <InputGroupAddon addonType="prepend">
            <Button color="info"
              onClick={() => this.handleIncament('increace')}><i className="fas fa-plus"></i></Button>
          </InputGroupAddon>
            
          {this.props.children}

          <InputGroupAddon addonType="append">
            <InputGroupText>{this.props.quantity}</InputGroupText>
            <InputGroupText>{this.props.price}₪</InputGroupText>
          </InputGroupAddon>
            
          </InputGroup>
      </FormGroup>
    );
  }
}

export default Quantity