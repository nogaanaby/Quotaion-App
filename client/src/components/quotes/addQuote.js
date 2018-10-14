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
  InputGroupText,
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
      showNewServiceInput: false
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
      name: this.state.name,
      services: this.state.services,
      totalPrice: this.calcTotalPrice()
    };
    this.props.addQuote(newQuote);
  };

  removeService = (index) => {
    const servicesWithOutIt = [...this.state.services]
    servicesWithOutIt.splice(index, 1)
    this.setState({ services: servicesWithOutIt})
    this.toggleServiceInput()
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

  calcTotalPrice = () => {
    let count = 0
    this.state.services.forEach((service)=>{
      if(service.totalPrice) {
        count += service.totalPrice
      } else {
        count += service.price
      }
    })
    return count
  }

  intFormat = (int) => {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <AddItemModal
        onSubmit={this.onSubmit}
        header='הצעת מחיר'
        onClose={this.onCloseModal}>
        <FormGroup>
          <Label for="item">שם הלקוח</Label>
          <Input
            type="text"
            name="name"
            id="QuoteName"
            placeholder="לכבוד גברת לקוח"
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
              onEditService={this.editService}/>
            })
        }

        <div className={!this.state.showNewServiceInput ? 'hide' : ''}>
          <ServiceInput
            items={this.state.items}
            onSubmitService={this.submitService}
            onRemoveService={this.removeService}
            serviceIndex={this.state.services.length}
            service={{name: '', price: 0}}
            quantity={0}
            onEditService={this.editService}/>
          </div>

        <FormGroup>
          <InputGroupAddon addonType="prepend">
            <Button color="info"
              onClick={ this.toggleServiceInput }>
              <i className="fas fa-plus"></i>
            </Button>
          </InputGroupAddon>
        </FormGroup>
        <FormGroup>

          <InputGroupAddon addonType="prepend">
            <InputGroupText name="totalPrice">{this.intFormat(this.calcTotalPrice())}₪</InputGroupText>
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