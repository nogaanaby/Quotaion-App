import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Collapse,
  Dropdown,
  DropdownMenu, 
  DropdownItem,
  DropdownToggle,
  Button,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { connect } from 'react-redux';
import { addQuote } from '../../actions/quoteActions';
import { getItems} from '../../actions/itemActions';
import AddItemModal from '../addItemModal'
import ServiceInput from './serviceInput'
import PropTypes from 'prop-types'

class AddQuote extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      items: this.props.items,
      services: [],
      showNewServiceInput: false,
    };
  }

  componentDidMount(){
    this.props.getItems()
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({items: this.props.items});      
    }
  }

  onChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {

    const newQuote = {
      name: this.state.name
    };

    this.props.addQuote(newQuote);
  };


  submitService = (chosenService, prevService) => {
    const checkIfExist = this.state.services.find((service) => service === chosenService)
    if(!checkIfExist) {
      if(prevService === ''){
        this.setState({ services: [...this.state.services, chosenService]});
      } else {
        //debugger
        const replaceIndex = this.state.services.findIndex((service) => service === prevService)
        const temp = [...this.state.services].splice(replaceIndex, 1, chosenService)
        this.setState({ services: temp});
      }
    }
  }

  render() {
    return (
      <AddItemModal
        onSubmit={this.onSubmit}
        header='Add Quote'>
        <FormGroup>
          <Label for="item">Quote Name</Label>
          <Input
            type="text"
            name="name"
            id="QuoteName"
            placeholder="Add Quote"
            onChange={this.onChange}
          />
        </FormGroup>

        <ServiceInput
          items={this.props.items}
          onSubmitService={this.submitService}/>
        
        {
          this.state.services.length > 0 
            ? this.state.services.map((service) => {
              return <ServiceInput key={service._id}
              items={this.props.items}
              onSubmitService={this.submitService}/>
            })
            : ''
        }
        
      </AddItemModal>
    );
  }
}

AddQuote.propTypes = {
  addQuote: PropTypes.func,
  quote: PropTypes.object,
  item: PropTypes.object
}

const mapStateToProps = state => ({
  quote: state.quote,
  items: state.item.items
});

export default connect(
  mapStateToProps,
  { addQuote, getItems }
)(AddQuote);