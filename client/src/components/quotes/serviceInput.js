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
  InputGroupText,
  Container
} from 'reactstrap';

import Quantity from "./quantity";

class ServiceInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      service: this.props.service,
      serviceName: this.props.service.name,
      openList: false,
      items: this.props.items
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.service !== prevProps.service) {
      this.setState({
        service: this.props.service,
        serviceName: this.props.service.name
      });      
    }
  }

  onChange = e => {
    this.setState({ serviceName: e.target.value });
    this.listSearch(e.target.value)
  };

  listSearch = (value) => {
    let temp = [...this.props.items]
    temp = temp.filter((item) => item.name.includes(value))
    this.setState({ items: temp });
  }

  toggleList = () => {
    this.setState({ openList: !this.state.openList})
  }

  chooseService = (id) => {
    //not empty service
    const chosenService = this.props.items.find((item) => item._id === id )
    if(this.props.service.name !== '') {
      this.props.onEditService(chosenService, this.props.serviceIndex)
    } else {
      chosenService.quantity = 1
      chosenService.totalPrice = chosenService.price
      this.props.onSubmitService(chosenService)
    }
    this.setState({
      openList: false
    })
  }

  removeService = () => {
    this.props.onRemoveService(this.props.serviceIndex)
  }

  updateQuantity = (quantity) => {
    const { service, serviceIndex } = this.props
    service.quantity = quantity
    service.totalPrice = service.price * quantity
    this.props.onEditService(service, serviceIndex)
  }

  render() {
    return (
      <FormGroup>
          <Quantity
            quantity={this.props.quantity}
            service={this.props.service}
            updateQuantity={this.updateQuantity}
            unMount={this.removeService}>
            <Input
              type="text"
              name="service"
              id="serviceName"
              value={this.state.serviceName}
              placeholder="Add Service"
              onClick={this.toggleList}
              onChange={this.onChange}
              autoComplete="off"
            />
          </Quantity>
            <Collapse isOpen={this.state.openList}>
            <Container style={{maxHeight: '20vh', overflow: 'auto'}}>
                <ListGroup>
                {
                  this.state.items.map((item) =>(
                    <ListGroupItem key={item._id} tag="a" href="#" action
                        onClick={() => this.chooseService(item._id)}>
                        <small className="hor-gap">{item.name}</small>
                        <small className="hor-gap">{item.price}₪</small>
                    </ListGroupItem>
                  ))
                }
                </ListGroup>
              </Container>
            </Collapse>
      </FormGroup>
    );
  }
}

export default ServiceInput