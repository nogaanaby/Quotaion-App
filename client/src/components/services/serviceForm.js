import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input, FormFeedback,
  Form, Button
} from 'reactstrap';

class ServiceForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      price: this.props.price,
      invalidInput: false
    };
  }

  onChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value, invalidInput: false });
  };

  submitService = () => {
    if(this.state.name !== '') {
      const newItem = {
        name: this.state.name,
        price: this.state.price
      };
  
      // Add item via addItem action
      this.props.onSubmit(newItem);
    } else {
      this.setState({ invalidInput: true });
    }
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="item">שם השירות</Label>
          <Input
            type="text"
            name="name"
            id="serviceName"
            value={this.state.name}
            placeholder="תיקון מנורות בחושך"
            onChange={this.onChange}
            invalid={this.state.invalidInput}
          />
          <FormFeedback>נראה לי ששכחת פה משהו</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="item">מחיר</Label>
          <Input
            type="number"
            name="price"
            id="servicePrice"
            placeholder="100$"
            onChange={this.onChange}
            value={this.state.price}
          />
        </FormGroup>
        <FormGroup>
          <Button color="success" style={{ marginTop: '2rem' }} block
            onClick={this.submitService}>
            save
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default ServiceForm