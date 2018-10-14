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
      price: this.intFormat(this.props.service.price),
      quantity: this.props.quantity
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.service !== prevProps.service) {
      this.setState({
        price: this.intFormat(this.props.service.price), 
        quantity: this.props.quantity
      });
    }
  }

  handleIncament = (direction) => {
    let newQuantity;
    if(direction === 'decreace') {
      if(this.state.quantity <= 1 ) {
        this.props.unMount()
        return
      } else {
        newQuantity = this.state.quantity - 1
      }
    } else {
      newQuantity = this.state.quantity + 1
    }

      this.setState({
        price: this.intFormat(this.props.service.price * newQuantity),
        quantity: newQuantity
      })
      this.props.updateQuantity(newQuantity)
  }

  intFormat = (int) => {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            <InputGroupText>{this.state.quantity}</InputGroupText>
            <InputGroupText>{this.state.price}₪</InputGroupText>
          </InputGroupAddon>
            
          </InputGroup>
      </FormGroup>
    );
  }
}

export default Quantity