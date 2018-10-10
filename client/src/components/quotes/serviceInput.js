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
      price: 0,
      openList: false,
      items: this.props.items,
      showNewServiceInput: false
    };
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
      service: chosenService.name, 
      price: chosenService.price
    })
  }

  openServiceInput = () => {
    this.setState({showNewServiceInput: true})
  }

  removeService = (id) => {
    this.setState({showNewServiceInput: false})
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
                  onClick={this.removeService}><i className="fas fa-minus"></i></Button>
              </InputGroupAddon>
                
                  <Input
                    type="text"
                    name="service"
                    id="serviceName"
                    value={this.state.service}
                    placeholder="Add Service"
                    onClick={this.openList}
                    onChange={this.listSearch}
                  />

                  <InputGroupAddon addonType="append">
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