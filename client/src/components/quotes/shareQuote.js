import React, { Component } from 'react';
import {Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, ListGroup, ListGroupItem, Table, Modal, ModalBody, 
  ModalHeader, ModalFooter, InputGroupAddon, InputGroup, InputGroupText, Container
} from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sendQuote, getQuotes } from '../../actions/quoteActions'

import SingleQuote from './singleQuote'

class ShareQuote extends Component {

  constructor(props){
    super(props);
    this.state = {
      quote: {},
      id: this.props.match.params.id
    };
  }

  componentWillMount(){
    this.props.getQuotes()
    setTimeout(()=>{
      this.setState({quote: this.findTheQuote()})
    }, 2000)
  }

  findTheQuote = () => {
    const theID = this.props.match.params.id
    const rightQuote = this.props.quote.quotes.find((quote) => quote._id === theID)
    return rightQuote
  }

  render() {
    return (
      <SingleQuote
        quote={
          this.state.quote
        }>

      </SingleQuote>
    );
}
}

ShareQuote.propTypes = {
  sendQuote: PropTypes.func,
  quote: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  quote: state.quote
})

export default connect(mapStateToProps, { getQuotes, sendQuote }) (ShareQuote);