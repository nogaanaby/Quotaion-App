import React, { Component } from 'react';
import { Container, 
  ListGroup, ListGroupItem, Button, Table, FormGroup, 
  InputGroup, Input,InputGroupAddon, FormFeedback, InputGroupText } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../../actions/itemActions'

import AppNavbar from '../helpers/appNavbar';
import AddService from './addService';
import EditService from './editService';
import SearchBox from '../helpers/searchBox';
import Spinner from '../helpers/spinner';

  class Services extends Component {
     constructor(props){
       super(props)
        this.state = {
          items: [],
          openEditMode: 'non'
        };
     }


    componentWillMount(){
      this.props.getItems()   
    }

    componentWillReceiveProps(props){
      this.setState({items: props.item.items})
    }
  
    deleteItem = (id) => {
      this.props.deleteItem(id)
    }

    toggleEdit = (id) => {
      this.setState({ openEditMode: id })
    }

    closeModal = () => {
      this.setState({ openEditMode: 'non' })
    }
  
    getNewItemsList = (list) => {
      this.setState({ items: list });
    }

    render() {
      const { items } = this.state
      return (
        <div>
          <AppNavbar/>
            <Container>
              <SearchBox
                itemsList={this.props.item.items}
                takeNewItemsList={this.getNewItemsList}>
                <Table>
                  <thead>
                    <tr>
                      <th>ערוך</th>
                      <th>מחק</th>
                      <th>מחיר</th>
                      <th>שם השירות</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    items.map((item) =>(
                      <tr key={item._id}>
                        <td>
                          <Button outline className="btn-torqiz" onClick={() => this.toggleEdit(item._id)}>
                            <i className="far fa-edit"></i>
                          </Button>
                          <EditService
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            isOpen={this.state.openEditMode === item._id}
                            closeModal={this.closeModal}/>
                        </td>
                        <td>
                          <Button outline className="btn-torqiz" onClick={() => this.deleteItem(item._id)}>
                            <i className="far fa-trash-alt"></i>
                          </Button>
                        </td>
                        <td scope="row">{item.price}₪</td>
                        <td>{item.name}</td>
                      </tr>
                    ))
                  }
                  </tbody>
                </Table>
              </SearchBox>
            <AddService/>
            <Spinner
            isOpen={this.props.item.loading}/>
          </Container>
        </div>
        
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