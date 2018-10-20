import React, { Component } from 'react';
import {
  FormGroup, Label, Input, Collapse, Form, FormFeedback,
  Dropdown, DropdownMenu,  DropdownItem, DropdownToggle, Button,
  ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon} from 'reactstrap';

import ServiceInput from './serviceInput'
import Discount from './discount'
import Message from './message'

class QuoteForm extends Component {

  constructor(props){
    super(props);
    const {quote} = this.props
    this.state = {
      quoteName: quote.name,
      subject: quote.subject,
      address: quote.address,
      comment: quote.comment,
      items: this.props.items,
      services: quote.services,
      showNewServiceInput: false,
      invalidInput: false,
      discount: quote.discount,
      invalidDiscount: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({items: this.props.items});
    }
  }

  submitQuote = () => {
    const emptyName = this.state.quoteName === ''
    const invalidDiscount = this.state.invalidDiscount
    if(!emptyName && !invalidDiscount) {

      const newQuote = {
        name: this.state.quoteName,
        subject: this.state.subject,
        address: this.state.address,
        comment: this.state.comment,
        services: this.state.services,
        totalPrice: this.calcTotalPrice(),
        discount: this.state.discount
      };

      this.props.onSubmit(newQuote)
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

  getMessage = (newMessage) => {
    this.setState({
      quoteName: newMessage.costumerName,
      subject: newMessage.subject,
      address: newMessage.address,
      comment: newMessage.comment,
    })
  }

  intFormat = (int) => {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <Form onSubmit={this.submitQuote}>
        <Message
          quote={this.props.quote}
          sendMessage={this.getMessage}></Message>
        
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
          discount={this.state.discount}
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