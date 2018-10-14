import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table,
  Card, CardImg, CardImgOverlay, CardTitle, CardText, ButtonGroup, CardDeck } from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getQuotes, deleteQuote } from '../../actions/quoteActions'

import AddQuote from './addQuote';
import QuoteCard from './quoteCard'
import ExpandQuote from './expandQuote'

  class Quotes extends Component {

    state = {
      openExpandMode: 'non'
    }

    componentWillMount(){
      this.props.getQuotes()
    }

    deleteQuote = (id) => {
      this.props.deleteQuote(id)
    }

    toggleExpand = (id) => {
      console.log(id)
      this.setState({openExpandMode: id})
    }

    render() {
      return (
        <div className="quotes-container">
          <AddQuote/>
            
              {
                this.props.quote.quotes.map((quote) =>(
                  <div key={quote._id}>
                    <QuoteCard
                      quote={quote}
                      delete={this.deleteQuote}
                      expand={this.toggleExpand}/>
                    <ExpandQuote 
                        quote={quote}
                        isOpen={this.state.openExpandMode === quote._id}
                        toggle={() => this.setState({openExpandMode: 'non'})}
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
    Quote: PropTypes.object
  }

  const mapStateToProps = (state) => ({
    quote: state.quote
  })

  export default connect(mapStateToProps, { getQuotes, deleteQuote }) (Quotes);