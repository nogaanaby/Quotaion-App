import React, { Component } from 'react';
import {Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, ListGroup, ListGroupItem, Table, Modal, ModalBody, 
  ModalHeader, ModalFooter, InputGroupAddon, InputGroup, InputGroupText
} from 'reactstrap';

class ExpandQuote extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }

  intFormat = (int) => {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader className="bg-torqiz hebrow-header" toggle={this.props.toggle}>{this.props.quote.name}</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <CardFooter className="bg-torqiz-light">
            <div className="" style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button outline className="btn-torqiz hor-gap"
                onClick={() => this.props.edit(this.props.quote._id)}>
                <i className="far fa-edit"></i>
              </Button>
              <Button outline className="btn-torqiz hor-gap"
                onClick={() => this.props.duplicate(this.props.quote)}>
                <i className="far fa-copy"></i>
              </Button>
              <Button outline className="btn-torqiz hor-gap" 
                onClick={() => this.props.delete(this.props.quote._id)}>
                <i className="far fa-trash-alt"></i>
              </Button>
            </div>
          </CardFooter>
        
      </Modal>
    );
  }
}

export default ExpandQuote