import React, { Component } from 'react';
import { Container, 
  ListGroup, ListGroupItem, Button, Table, FormGroup, 
  InputGroup, Input,InputGroupAddon, FormFeedback, InputGroupText } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../../actions/itemActions'

import AddService from './addService';

  class Services extends Component {
     constructor(props){
       super(props)
        this.state = {
          items: [],
          filter: ''
        };
     }


    componentWillMount(){
      this.props.getItems()   
    }

    componentWillReceiveProps(props){
      const temp = props.item.items
      temp.sort()
      this.setState({items: temp})
    }
  
    deleteItem = (id) => {
      this.props.deleteItem(id)
    }

    onChange = e => {
      this.setState({ filter: e.target.value });
      this.listSearch(e.target.value)
    };
  
    listSearch = (value) => {
      let temp = [...this.props.item.items]
      temp = temp.filter((item) => item.name.includes(value))
      this.setState({ items: temp });
    }

    render() {
      const { items } = this.state
      return (
        <Container>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fas fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="sesrch"
                onChange={this.onChange} />
            </InputGroup>
          </FormGroup>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>מחיר</th>
                  <th>שם השירות</th>
                </tr>
              </thead>
              <tbody>
              {
                items.map((item) =>(
                  <tr key={item._id}>
                    <th scope="row">
                    </th>
                    <td>{item.price}₪</td>
                    <td>{item.name}</td>
                    <td className="card-buttons">
                      <Button outline className="btn-torqiz" onClick={() => this.deleteItem(item._id)}>
                        <i className="far fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
            
            <AddService/>
        </Container>
      );
    }
  }

  Services.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func,
    item: PropTypes.object.isRequired
  }

  const mapStateToProps = (state) => ({
    item: state.item
  })

  export default connect(mapStateToProps, { getItems, deleteItem }) (Services);