import React, { Component } from 'react';
import QuoteForm from '../quoteForm/quoteForm'
import SimpleModal from '../../helpers/simpleModal'

class AddQuote extends Component {
  constructor(props){
    super(props);
    this.state = {
      quote: {
        name: '',
        subject: '',
        address: {
          city: '',
          street: '',
          houseNumber: ''  
        },
        services: [],
        discount: 0,
        comment: ''
      },
      isOpen: false
    };
  }

  submitQuote = (newQuote) => {
    this.props.onSubmit(newQuote);
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
          quote={this.state.quote}
          items={this.props.items}
          onSubmit={this.submitQuote}>  
        </QuoteForm>
      </SimpleModal>
      </div>
    );
  }
}

export default AddQuote;