import React, { Component } from 'react';
import {
  FormGroup, Label, Input, Collapse, Form, FormFeedback, Row, Col,
  Dropdown, DropdownMenu,  DropdownItem, DropdownToggle, Button,
  ListGroup, ListGroupItem, InputGroup, InputGroupText, InputGroupAddon} from 'reactstrap';
  
import Address from './address'

class Message extends Component {

  constructor(props){
    super(props);
    const {quote} = this.props
    this.state = {
      costumerName: quote.name,
      subject: quote.subject,
      comment: quote.comment,
      address: quote.address,
      invalidName: false
    };
  }

  onChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
    this.capsulMessage()
  };

  capsulMessage = () => {
    const message = {
      costumerName: this.state.costumerName,
      subject: this.state.subject,
      comment: this.state.comment,
      address: this.state.address,
    }
    this.props.sendMessage(message)
  }

  getAddress = (newAddress) => {
    this.setState({address: newAddress})
  }

  render() {
    return (
        <FormGroup>

          <FormGroup>
            <Label for="item">שם הלקוח</Label>
            <Input
              type="text"
              name="costumerName"
              id="costumerName"
              value={this.state.costumerName}
              placeholder="לכבוד גברת לקוח"
              onChange={this.onChange}
              autoComplete="off"
              invalid={this.state.invalidName}
            />
            <FormFeedback>נראה לי ששכחת פה משהו</FormFeedback>
          </FormGroup>

          <Address
          quote={this.props.quote}
          sendAddress={this.getAddress}></Address>

          <FormGroup>
            <Label for="item">נושא</Label>
            <Input
              type="text"
              name="subject"
              id="subject"
              value={this.state.subject}
              onChange={this.onChange}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label for="item">הערה</Label>
            <Input
              type="text"
              name="comment"
              id="comment"
              value={this.state.comment}
              onChange={this.onChange}
              autoComplete="off"
            />
          </FormGroup>

        </FormGroup>

    );
  }
}

export default Message;