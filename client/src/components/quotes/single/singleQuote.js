import React, { Component } from 'react';
import {Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, ListGroup, ListGroupItem, Table, Modal, ModalBody, 
  ModalHeader, ModalFooter, InputGroupAddon, InputGroup, InputGroupText, Container
} from 'reactstrap';

import Spinner from '../../helpers/spinner'

class SingleQuote extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  intFormat = (int) => {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
  if(this.props.quote.name){
   return (
      <Container>
        <ModalHeader className="bg-torqiz hebrow-header" >{this.props.quote.name}</ModalHeader>
          <Table>
          <thead>
            <tr>
              <th></th>
              <th>מחיר סה"כ לשירות</th>
              <th>כמות</th>
              <th>מחיר</th>
              <th>שם השירות</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.quote.services.map((service)=>{
              return <tr key={service._id}>
                        <th scope="row"></th>
                        <td>{service.totalPrice}₪</td>
                        <td>{service.quantity}</td>
                        <td>{service.price}₪</td>
                        <td>{service.name}</td>
                      </tr>
            })
          }   
          </tbody>
        </Table>
        <InputGroup style={{display: 'flex', justifyContent: 'flex-end'}}>
        <InputGroupAddon addonType="prepend">
            <InputGroupText name="totalPrice">{this.intFormat(this.props.quote.totalPrice)}₪</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon addonType="prepend">
            <InputGroupText name="title"> <b> מחיר סופי </b></InputGroupText>
        </InputGroupAddon>
        </InputGroup>
        
      </Container>
    )} else {
    return <Spinner
        isOpen={true}></Spinner>
    }
}
}

export default SingleQuote;