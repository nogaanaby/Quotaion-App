import React, { Component } from 'react';
import QuoteForm from '../quoteForm/quoteForm'
import SimpleModal from '../../helpers/simpleModal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getItems } from '../../../actions/itemActions'
import { addQuote } from '../../../actions/quoteActions'

class AddQuote extends Component {
  constructor(props){
    super(props);
    this.state = {
      quoteName: '',
      services: [],
      isOpen: false
    };
  }
  componentWillMount = () => {
    this.props.getItems()
  }

  submitQuote = (newQuote) => {
    this.props.addQuote(newQuote);
    this.toggle()
  };

  toggle = () => {
    this.setState({
      quoteName: '',
      services: [],
      isOpen: !this.state.isOpen    
    })
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.toggle}>
          <i className="fas fa-plus-circle fa-3x floating-icon"></i>
        </a>
      <SimpleModal
        header='הוסף הצעת מחיר חדשה'
        toggle={this.toggle}
        isOpen={this.state.isOpen}>
        <QuoteForm
          quoteName={this.state.quoteName}
          items={this.props.items}
          services={this.state.services}
          onSubmit={this.submitQuote}>  
        </QuoteForm>
      </SimpleModal>
      </div>
    );
  }
}

AddQuote.propTypes = {
  addQuote: PropTypes.func,
  item: PropTypes.object
}

const mapStateToProps = state => ({
  items: state.item.items
});

export default connect(
  mapStateToProps,
  { addQuote, getItems }
)(AddQuote);