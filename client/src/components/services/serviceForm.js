import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Form, Button
} from 'reactstrap';


class ServiceForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      price: this.props.price
    };
  }

  onChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  };

  submitService = () => {

    const newItem = {
      name: this.state.name,
      price: this.state.price
    };

    // Add item via addItem action
    this.props.onSubmit(newItem);
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
          />
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