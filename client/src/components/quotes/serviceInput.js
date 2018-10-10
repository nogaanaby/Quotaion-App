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
      service: '',
      serviceName: '',
      price: 0,
      basicPrice: 0,
      quantity: 0,
      openList: false,
      items: this.props.items,
      showNewServiceInput: false,
      index: this.props.serviceIndexOnQuote
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({items: this.props.items});      
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
    this.setState({ openList: true})
  }

  chooseService = (id) => {
    const chosenService = this.props.items.find((item) => item._id === id )
    this.props.onSubmitService(chosenService, this.state.service)

    this.setState({
      openList: false,
      service: chosenService,
      serviceName: chosenService.name,
      price: chosenService.price,
      basicPrice: chosenService.price,
      quantity: 1
    })
  }

  openServiceInput = () => {
    this.setState({showNewServiceInput: true})
  }

  removeService = () => {
    if(this.state.service !== '') {
      this.props.onRemoveService(this.state.index)
    }
    this.setState({showNewServiceInput: false})
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
        <FormGroup className={this.state.showNewServiceInput ? 'hide' : ''}>
          <InputGroupAddon addonType="prepend">
            <Button color="info"
              onClick={this.openServiceInput}>
              <i className="fas fa-plus"></i>
            </Button>
          </InputGroupAddon>
        </FormGroup>

        <Collapse direction="right" isOpen={this.state.showNewServiceInput}>
          
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
                    value={this.state.serviceName}
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