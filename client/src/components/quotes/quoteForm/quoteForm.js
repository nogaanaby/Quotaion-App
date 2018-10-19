import React, { Component } from 'react';
import {
  FormGroup, Label, Input, Collapse, Form, FormFeedback,
  Dropdown, DropdownMenu,  DropdownItem, DropdownToggle, Button,
  ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon} from 'reactstrap';

import ServiceInput from './serviceInput'
import Discount from './discount'

class QuoteForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      quoteName: this.props.quoteName,
      items: this.props.items,
      services: this.props.services,
      showNewServiceInput: false,
      invalidInput: false,
      discount: this.props.discount,
      invalidDiscount: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({items: this.props.items});
    }
  }

  onChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value, invalidInput: false });
  };

  submitQuote = () => {
    const emptyName = this.state.quoteName === ''
    const invalidDiscount = this.state.invalidDiscount
    if(!emptyName && !invalidDiscount) {
      const newQuote = {
        name: this.state.quoteName,
        services: this.state.services,
        totalPrice: this.calcTotalPrice(),
        discount: this.state.discount
      };

      this.props.onSubmit(newQuote)
    } else if(emptyName) {
      this.setState({ invalidInput: true });
    }
  }

  removeService = (index) => {
    const servicesWithOutIt = [...this.state.services]
    servicesWithOutIt.splice(index, 1)
    this.setState({ services: servicesWithOutIt})
    this.toggleServiceInput()
    this.printServices()
  }

  submitService = (chosenService) => {
    this.setState({ services: [...this.state.services, chosenService]});
    this.toggleServiceInput()
    this.printServices()
  }

  editService = (newService, index) => {
    const temp = [...this.state.services]
    temp.splice(index, 1, newService)
    this.setState({ services: temp});
    this.printServices()
  }

  printServices = () => {
    setTimeout(() => {
      console.log(this.state.services)
    }, 300)
  }

  toggleServiceInput = () => {
    this.setState({ showNewServiceInput: !this.state.showNewServiceInput })
  }

  calcTotalPrice = () => {
    let count = 0
    this.state.services.forEach((service)=>{
      if(service.totalPrice) {
        count += service.totalPrice
      } else {
        count += service.price
      }
    })
    return count
  }

  addDiscount = (value) => {
    this.setState({discount: value})
  }

  validateDiscount = (direction) => {
    direction === 'invalid'
    ? this.setState({ invalidDiscount: true })
    : this.setState({ invalidDiscount: false })
  }

  intFormat = (int) => {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <Form onSubmit={this.submitQuote}>
        <FormGroup>
          <Label for="item">שם הלקוח</Label>
          <Input
            type="text"
            name="quoteName"
            id="QuoteName"
            value={this.state.quoteName}
            placeholder="לכבוד גברת לקוח"
            onChange={this.onChange}
            autoComplete="off"
            invalid={this.state.invalidInput}
          />
          <FormFeedback>נראה לי ששכחת פה משהו</FormFeedback>
        </FormGroup>
        
        {
          this.state.services.map((service, index) => {
              return <ServiceInput key={index}
              items={this.state.items}
              onSubmitService={this.submitService}
              onRemoveService={this.removeService}
              serviceIndex={index}
              service={service}
              quantity={service.quantity ? service.quantity : 1}
              onEditService={this.editService}/>
            })
        }

        <div className={!this.state.showNewServiceInput ? 'hide' : ''}>
          <ServiceInput
            items={this.state.items}
            onSubmitService={this.submitService}
            onRemoveService={this.removeService}
            serviceIndex={this.state.services.length}
            service={{name: '', price: 0}}
            quantity={0}
            onEditService={this.editService}/>
          </div>

        <FormGroup>
          <InputGroupAddon addonType="prepend">
            <Button color="info"
              onClick={ this.toggleServiceInput }>
              <i className="fas fa-plus"></i>
            </Button>
          </InputGroupAddon>
        </FormGroup>

        <Discount
          prevPrice={this.calcTotalPrice()}
          discount={this.props.discount}
          onDiscount={this.addDiscount}
          validateDiscount={ this.validateDiscount }>
        </Discount>

        <FormGroup>
          <Button color="success" style={{ marginTop: '2rem' }} block
            onClick={this.submitQuote}>
            save
          </Button>
        </FormGroup>
        
      </Form>
    );
  }
}

export default QuoteForm;