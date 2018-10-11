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

  onCloseModal = () => {
    this.setState({
      services: [],
      name: '',
      showNewServiceInput: false
    })
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

  removeService = (index) => {
    const servicesWithOutIt = [...this.state.services]
    servicesWithOutIt.splice(index, 1)
    this.setState({ services: servicesWithOutIt})
    this.printServices()
  }

  submitService = (chosenService) => {
    this.setState({ services: [...this.state.services, chosenService]});
    this.toggleServiceInput()
    this.printServices()
  }

  editService = (newService, index) => {
    const temp = [...this.state.services]
    temp.splice(index, 1, newService)
    this.setState({ services: temp});
    this.printServices()
  }

  printServices = () => {
    setTimeout(() => {
      console.log(this.state.services)
    }, 300)
  }

  toggleServiceInput = () => {
    this.setState({ showNewServiceInput: !this.state.showNewServiceInput })
  }

  render() {
    return (
      <AddItemModal
        onSubmit={this.onSubmit}
        header='Add Quote'
        onClose={this.onCloseModal}>
        <FormGroup>
          <Label for="item">Quote Name</Label>
          <Input
            type="text"
            name="name"
            id="QuoteName"
            placeholder="Add Quote"
            onChange={this.onChange}
            autoComplete="off"
          />
        </FormGroup>
        
        {
          this.state.services.map((service, index) => {
              return <ServiceInput key={index}
              items={this.state.items}
              onSubmitService={this.submitService}
              onRemoveService={this.removeService}
              serviceIndex={index}
              service={service}
              quantity={1}
              isActive={true}
              onEditService={this.editService}/>
            })
        }

        <ServiceInput
          items={this.state.items}
          onSubmitService={this.submitService}
          onRemoveService={this.removeService}
          serviceIndex={this.state.services.length}
          service={{name: '', price: 0}}
          quantity={0}
          isActive={this.state.showNewServiceInput}/>

        <FormGroup>
          <InputGroupAddon addonType="prepend">
            <Button color="info"
              onClick={ this.toggleServiceInput }>
              <i className="fas fa-plus"></i>
            </Button>
          </InputGroupAddon>
        </FormGroup>
        
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