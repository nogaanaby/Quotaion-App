import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem, deleteItem } from '../../actions/itemActions';
import SimpleModal from '../helpers/simpleModal'
import ServiceForm from './serviceForm'
import PropTypes from 'prop-types'

class EditService extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  submit = (newItem) => {
    this.props.deleteItem(this.props.id)
    this.props.addItem(newItem);
    this.props.closeModal();
  };

  render() {
    return (
        <SimpleModal
          toggle={this.props.closeModal}
          isOpen={this.props.isOpen}
          header='ערוך שירות קיים'>
          <ServiceForm
            onSubmit={this.submit}
            name={this.props.name}
            price={this.props.price}>
          </ServiceForm>
        </SimpleModal>
    );
  }
}

EditService.propTypes = {
  addItem: PropTypes.func,
  item: PropTypes.object
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addItem, deleteItem }
)(EditService);