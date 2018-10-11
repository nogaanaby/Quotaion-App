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


class ServiceInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      quantity: 1
    };
  }

  editInput = () => {

  }

  handleIncament = (direction) => {
    // if(direction === 'decreace') {
    //   if(this.state.price === this.state.basicPrice) {
    //     this.removeService()
    //   } else {
    //     this.setState({
    //       price: this.state.price - this.state.basicPrice,
    //       quantity: this.state.quantity - 1
    //     })
    //   }
    // } else {
    //   this.setState({ 
    //     price: this.state.price + this.state.basicPrice,
    //     quantity: this.state.quantity + 1
    //   })
    // }
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
            
              <Input
                type="text"
                name="service"
                id="serviceName"
                value={this.props.serviceName}
                placeholder="Add Service"
                onClick={this.editInput}
                onChange={this.editInput}
              />

              <InputGroupAddon addonType="append">
                <InputGroupText>{this.state.quantity}</InputGroupText>
                <InputGroupText>{this.props.price}₪</InputGroupText>
              </InputGroupAddon>
            
          </InputGroup>
      </FormGroup>
    );
  }
}

export default ServiceInput