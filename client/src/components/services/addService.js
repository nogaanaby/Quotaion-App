import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../../actions/itemActions';
import AddItemModal from '../addItemModal'
import PropTypes from 'prop-types'

class AddService extends Component {
  state = {
    name: '',
    price: 0
  };

  onChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {

    const newItem = {
      name: this.state.name,
      price: this.state.price
    };

    // Add item via addItem action
    this.props.addItem(newItem);
  };

  render() {
    return (
      <AddItemModal
        onSubmit={this.onSubmit}
        header='הוסף שירות חדש'>
        <FormGroup>
          <Label for="item">שם השירות</Label>
          <Input
            type="text"
            name="name"
            id="serviceName"
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
          />
        </FormGroup>
      </AddItemModal>
    );
  }
}

AddService.propTypes = {
  addItem: PropTypes.func,
  item: PropTypes.object
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addItem }
)(AddService);