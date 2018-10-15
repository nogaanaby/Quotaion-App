import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table,
  Card, CardImg, CardImgOverlay, CardTitle, CardText, ButtonGroup, CardDeck } from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getQuotes, deleteQuote, addQuote } from '../../actions/quoteActions'

import AddQuote from './addQuote';
import QuoteCard from './quoteCard'
import ExpandQuote from './expandQuote'
import EditQuote from './editQuote'

  class Quotes extends Component {

    state = {
      modalIsOpen: 'non'
    }
    
    componentWillMount(){
      this.props.getQuotes()
    }

    deleteQuote = (id) => {
      this.props.deleteQuote(id)
    }

    duplicateQuote = (quote) => {
      const copied = {
        name: 'copy of ' + quote.name,
        services: quote.services,
        totalPrice: quote.totalPrice
      }
      this.props.addQuote(copied)
    }

    toggleExpand = (id) => {
      this.setState({modalIsOpen: id + "_expand"})
    }

    toggleEdit = (id) => {
      this.setState({modalIsOpen: id + "_edit"})
    }

    render() {
      return (
        <div className="quotes-container">
          <AddQuote/>
            
              {
                this.props.quote.quotes.map((quote, index) =>(
                  <div key={index}>
                    <QuoteCard
                      quote={quote}
                      delete={this.deleteQuote}
                      expand={this.toggleExpand}
                      edit={this.toggleEdit}
                      duplicate={this.duplicateQuote}/>
                    <ExpandQuote
                        quote={quote}
                        isOpen={this.state.modalIsOpen === `${quote._id}_expand`}
                        toggle={() => this.setState({modalIsOpen: 'non'})}
                        delete={this.deleteQuote}
                        edit={this.toggleEdit}
                        duplicate={this.duplicateQuote}/>
                    <EditQuote
                        quote={quote}
                        quoteIndex={index}
                        isOpen={this.state.modalIsOpen === `${quote._id}_edit`}
                        toggle={() => this.setState({modalIsOpen: 'non'})}
                        delete={this.deleteQuote}/>
                  </div>
                ))         
              }
              
        </div>
      );
    }
  }

  Quotes.propTypes = {
    getQuotes: PropTypes.func,
    deleteQuote: PropTypes.func,
    addQuote: PropTypes.func,
    Quote: PropTypes.object
  }

  const mapStateToProps = (state) => ({
    quote: state.quote
  })

  export default connect(mapStateToProps, { getQuotes, deleteQuote, addQuote }) (Quotes);