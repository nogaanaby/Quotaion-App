import React, { Component } from 'react';
import {
  FormGroup, Label, Input, Collapse, Form, FormFeedback, Row, Col,
  Dropdown, DropdownMenu,  DropdownItem, DropdownToggle, Button,
  ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon} from 'reactstrap';
  import InputRow from '../../helpers/inputRow'

class Address extends Component {

  constructor(props){
    super(props);
    const {quote} = this.props
    this.state = {
      city: quote.address.city,
      street: quote.address.street,
      houseNumber: quote.address.houseNumber
    };
  }

  onChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name] : e.target.value });
    this.capsulAddress()
  };

  capsulAddress = () => {
    const address = {
      city: this.state.city,
      street: this.state.street,
      houseNumber: this.state.houseNumber   
    }
    this.props.sendAddress(address)
  }


  render() {
    return (
      <InputRow
        labelLeft="מספר"
        labelMiddle='רחוב'
        labelRight='עיר'
        childLeft = {
          <Input 
            type="number"
            name="houseNumber"
            value={this.state.houseNumber}
            onChange={this.onChange}
          />
        }
        childMiddle = {
          <Input 
            type="text"
            name="street"
            value={this.state.street}
            onChange={this.onChange}
          />
        }
        childRight = {
          <Input 
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.onChange}
          />
        }>
      
      </InputRow>

    );
  }
}

export default Address;