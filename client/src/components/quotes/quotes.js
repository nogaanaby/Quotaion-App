import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table,
  Card, CardImg, CardImgOverlay, CardTitle, CardText, ButtonGroup, CardDeck } from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getQuotes, deleteQuote, addQuote } from '../../actions/quoteActions'
import { getItems } from '../../actions/itemActions'

import AppNavbar from '../helpers/appNavbar';
import AddQuote from './options/addQuote';
import QuoteCard from './quoteCard'
import EditQuote from './options/editQuote'
import Spinner from '../helpers/spinner';

  class Quotes extends Component {

    constructor(props){
      super(props)
       this.state = {
        modalIsOpen: 'non'
      }
    }
    
    componentWillMount(){
      this.props.getQuotes()
      this.props.getItems()
    }

    deleteQuote = (id) => {
      this.props.deleteQuote(id)
    }

    submitChange = (newQuote) => {
      this.props.addQuote(newQuote)
    }

    duplicateQuote = (quote) => {
      const copied = {
        name: 'copy of ' + quote.name,
        services: quote.services,
        totalPrice: quote.totalPrice,
        discount: quote.discount
      }
      this.props.addQuote(copied)
      this.setState({modalIsOpen: 'non'})
    }

    toggleEdit = (id) => {
      this.setState({modalIsOpen: id + "_edit"})
    }

    render() {
      return (
        <div>
        <AppNavbar></AppNavbar>
        <div className="quotes-container">
          <AddQuote
            items={this.props.item.items}
            onSubmit={this.submitChange}/>
            
              {
                this.props.quote.quotes.map((quote, index) =>(
                  <div key={index}>
                    <QuoteCard
                      quote={quote}
                      delete={this.deleteQuote}
                      expand={this.expand}
                      edit={this.toggleEdit}
                      duplicate={this.duplicateQuote}/>
                    <EditQuote
                      quote={quote}
                      quoteIndex={index}
                      isOpen={this.state.modalIsOpen === `${quote._id}_edit`}
                      toggle={() => this.setState({modalIsOpen: 'non'})}
                      onDelete={this.deleteQuote}
                      items={this.props.item.items}
                      onSubmit={this.submitChange}/>
                  </div>
                ))
              }
              <Spinner
                isOpen={this.props.item.itemsLoading || this.props.quote.quotesLoading}/>
          </div>
        </div>
      );
    }
  }

  Quotes.propTypes = {
    getQuotes: PropTypes.func,
    deleteQuote: PropTypes.func,
    addQuote: PropTypes.func,
    getItems: PropTypes.func,
    quote: PropTypes.object
  }

  const mapStateToProps = (state) => ({
    quote: state.quote,
    item: state.item
  })

  export default connect(mapStateToProps, { getQuotes, deleteQuote, addQuote, getItems }) (Quotes);