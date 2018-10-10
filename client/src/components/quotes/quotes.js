import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table } from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getQuotes, deleteQuote } from '../../actions/quoteActions'

import AddQuote from './addQuote';

  class Quotes extends Component {
    componentDidMount(){
      this.props.getQuotes()
    }

    deleteQuote = (id) => {
      this.props.deleteQuote(id)
    }

    render() {
      const { quotes } = this.props.quote
      return (
        <Container>
          <AddQuote/>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>שם הצעת המחיר</th>
                  <th>מחיר סופי</th>
                </tr>
              </thead>
              <tbody>
              {
                quotes.map((quote) =>(
                  <tr key={quote._id}>
                    <th scope="row">
                      <Button className="remove-btn rounded-btn"
                      color="danger"
                      size="sm"
                      onClick={() => this.deleteQuote(quote._id)}>
                        &times;
                      </Button>
                    </th>
                    <td>{quote.name}</td>
                    <td>{quote.totalPrice}₪</td>
                  </tr>
                ))            
              }
              </tbody>
            </Table>
        </Container>
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