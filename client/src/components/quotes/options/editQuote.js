import React, { Component } from 'react';
import QuoteForm from '../quoteForm/quoteForm'
import SimpleModal from '../../helpers/simpleModal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getItems } from '../../../actions/itemActions'
import { editQuote } from '../../../actions/quoteActions'

class EditQuote extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentWillMount = () => {
    this.props.getItems()
  }

  onSubmit = (newQuote) => {
    this.props.editQuote({
      quote: newQuote, 
      index: this.props.quoteIndex});
    
    this.props.toggle()
  };

  render() {
    return (
      <SimpleModal
        header='ערוך הצעת מחיר'
        toggle={this.props.toggle}
        isOpen={this.props.isOpen}>      
      <QuoteForm
        onSubmit={this.onSubmit}
        quoteName={this.props.quote.name}
        items={this.props.items}
        services={this.props.quote.services}>
        
      </QuoteForm>
      </SimpleModal>
    );
  }
}

EditQuote.propTypes = {
  editQuote: PropTypes.func,
  item: PropTypes.object
}

const mapStateToProps = state => ({
  items: state.item.items
});

export default connect(
  mapStateToProps,
  { editQuote, getItems }
)(EditQuote);