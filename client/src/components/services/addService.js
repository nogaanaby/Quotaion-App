import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../../actions/itemActions';
import SimpleModal from '../helpers/simpleModal'
import ServiceForm from './serviceForm'
import PropTypes from 'prop-types'

class AddService extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  submit = (newItem) => {
    this.props.addItem(newItem);
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <div>
        <a href="#" onClick={this.toggle}>
          <i className="fas fa-plus-circle fa-3x floating-icon"></i>
        </a>
        <SimpleModal
          toggle={this.toggle}
          isOpen={this.state.isOpen}
          header='הוסף שירות חדש'>
          <ServiceForm
            onSubmit={this.submit}
            name=''
            price={0}>
          </ServiceForm>
        </SimpleModal>
      </div>
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