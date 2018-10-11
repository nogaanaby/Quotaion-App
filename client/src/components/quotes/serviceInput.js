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
      service: this.props.service,
      serviceName: this.props.service.name,
      price: this.props.service.price,
      basicPrice: this.props.service.price,
      quantity: this.props.quantity,
      openList: false,
      items: this.props.items,
      isActive: this.props.isActive
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.service !== prevProps.service) {
      this.setState({service: this.props.service});      
    }
  }

  onChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  };

  listSearch = e => {
    this.setState({ service: e.target.value });
    let temp = [...this.props.items]
    temp = temp.filter((item) => item.name.includes(e.target.value))
    this.setState({ items: temp });
  }

  openList = () => {
    this.setState({ openList: !this.state.openList})
  }

  chooseService = (id) => {
    //not empty service
    const chosenService = this.props.items.find((item) => item._id === id )
    if(this.state.serviceName !== '') {
      this.props.onEditService(chosenService, this.props.serviceIndex)
    } else {
      this.props.onSubmitService(chosenService)
    }
    this.setState({
      openList: false
    })
  }

  removeService = () => {
    //not empty service
    if(this.state.serviceName !== '') {
      this.props.onRemoveService(this.props.serviceIndex)
    }
    this.setState({isActive: false})
  }

  handleIncament = (direction) => {
    if(direction === 'decreace') {
      if(this.state.price === this.state.basicPrice) {
        this.removeService()
      } else {
        this.setState({
          price: this.state.price - this.state.basicPrice,
          quantity: this.state.quantity - 1
        })
      }
    } else {
      this.setState({ 
        price: this.state.price + this.state.basicPrice,
        quantity: this.state.quantity + 1
      })
    }
  }

  render() {
    return (
      <FormGroup>

        <Collapse direction="right" isOpen={this.props.isActive}>
          
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
                    value={this.state.service.name}
                    placeholder="Add Service"
                    onClick={this.openList}
                    onChange={this.listSearch}
                  />

                  <InputGroupAddon addonType="append">
                    <InputGroupText>{this.state.quantity}</InputGroupText>
                    <InputGroupText>{this.state.price}₪</InputGroupText>
                  </InputGroupAddon>
                
              </InputGroup>
            
              <Collapse isOpen={this.state.openList}>
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
              </Collapse>
        </Collapse>
      </FormGroup>
    );
  }
}

export default ServiceInput