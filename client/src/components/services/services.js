import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../../actions/itemActions'

import AddService from './addService';

  class Services extends Component {
    componentDidMount(){
      this.props.getItems()
    }
  
    deleteItem = (id) => {
      this.props.deleteItem(id)
    }

    render() {
      const { items } = this.props.item
      return (
        <Container>
          <AddService/>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>שם השירות</th>
                  <th>מחיר</th>
                </tr>
              </thead>
              <tbody>
              {
                items.map((item) =>(
                  <tr key={item._id}>
                    <th scope="row">
                      <Button className="remove-btn rounded-btn"
                      color="danger"
                      size="sm"
                      onClick={() => this.deleteItem(item._id)}>
                        &times;
                      </Button>
                    </th>
                    <td>{item.name}</td>
                    <td>{item.price}₪</td>
                  </tr>
                ))            
              }
              </tbody>
            </Table>
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