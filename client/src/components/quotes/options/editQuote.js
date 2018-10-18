import React, { Component } from 'react';
import QuoteForm from '../quoteForm/quoteForm'
import SimpleModal from '../../helpers/simpleModal'

class EditQuote extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  onSubmit = (newQuote) => {
    this.props.onDelete(this.props.quote._id)
    this.props.onSubmit(newQuote);
    
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
export default EditQuote