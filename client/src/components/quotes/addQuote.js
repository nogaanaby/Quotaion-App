import React, { Component } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Collapse,
  DropdownMenu, 
  DropdownItem,
  Button,
  Dropdown,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { addQuote } from '../../actions/quoteActions';
import { getItems} from '../../actions/itemActions';
import AddItemModal from '../addItemModal'
import PropTypes from 'prop-types'

class AddQuote extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      service: '',
      openList: false,
      items: this.props.items
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

  listSearch = e => {
    this.setState({ service: e.target.value });
    const temp = [...this.state.items]
    temp.filter((item) => item.name.includes(e.target.value))
    console.log(temp)
    this.setState({ items: temp });
  }

  toggleList = () => {
    this.setState({ openList: !this.state.openList })
  }

  onSubmit = () => {

    const newQuote = {
      name: this.state.name
    };

    this.props.addQuote(newQuote);
  };

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
        <FormGroup>
          <Label for="item">Add Service</Label>
          <Input
            type="text"
            name="service"
            id="serviceName"
            placeholder="Add Service"
            onClick={this.toggleList}
            onChange={this.listSearch}
          />
          <Collapse isOpen={this.state.openList}>
            <ListGroup>
            {
              this.state.items.map((item) =>(
                <ListGroupItem key={item._id} tag="a" href="#" action>
                  <small className="hor-gap">{item.name}</small>
                  <small className="hor-gap">{item.price}₪</small>
                </ListGroupItem>
              ))            
            }
            </ListGroup>
          </Collapse>
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