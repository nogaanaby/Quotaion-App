import React, { Component } from 'react';
import {Card, Button, CardHeader, CardFooter, CardBody, Row, Col,
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

  calcFinalPrice = (price) => {
    const opositPercent = (100 - this.props.quote.discount)/100
    return price * opositPercent
  }

  render() {
  if(this.props.quote.name){
   return (
      <div>
        <ModalHeader className="bg-torqiz hebrow-header" >{this.props.quote.name}</ModalHeader>
          
          <Container style={{marginTop: '20px'}}>
            {
              this.props.quote.subject !== ''
                ? <h4>
                    <b> הנידון: </b>
                    {this.props.quote.subject}
                  </h4>
                : ''
            }
            {
              this.props.quote.address.street !== ''
                ? <span>
                    <p className="no-margin"> 
                    
                    {`
                       ${this.props.quote.address.city},   
                       ${this.props.quote.address.street}  
                       ${this.props.quote.address.houseNumber}  
                    `} 
                    
                    </p>
                  </span>
                : ''
            }
            
          </Container>

          <Container>
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
                        <td>{this.intFormat(service.totalPrice)}₪</td>
                        <td>{service.quantity}</td>
                        <td>{this.intFormat(service.price)}₪</td>
                        <td>{service.name}</td>
                      </tr>
            })
          }   
          </tbody>
        </Table>
        <InputGroup style={{display: 'flex', justifyContent: 'flex-end'}}>
          {
            this.props.quote.discount > 0
            ? <InputGroupAddon addonType="prepend">
                    <InputGroupText name="totalPrice">
                      <b> {this.intFormat(this.calcFinalPrice(this.props.quote.totalPrice))} </b>
                      <strike>{this.intFormat(this.props.quote.totalPrice)}₪</strike>
                    </InputGroupText>
                </InputGroupAddon>
            

            : <InputGroupAddon addonType="prepend">
                  <InputGroupText name="totalPrice">{this.intFormat(this.props.quote.totalPrice)}₪</InputGroupText>
              </InputGroupAddon>
          }

          <InputGroupAddon addonType="prepend">
              <InputGroupText name="title"> <b> מחיר סופי לא כולל מע"מ </b></InputGroupText>
          </InputGroupAddon>
          </InputGroup>

          <Container style={{marginTop: '20px'}}>
          {
              this.props.quote.comment !== ''
                ? <span>
                  
                    <p className="no-margin">
                    <b> הערה </b>
                      {this.props.quote.comment}

                    </p>
                  </span>
                : ''
            }
            </Container>
          
            <Container style={{marginTop: '20px'}}>
              <p>,בכבוד רב
                <br />
                ישראל צירלין
              </p>
            </Container>
        </Container>
      </div>
    )} else {
    return <Spinner
        isOpen={true}></Spinner>
    }
}
}

export default SingleQuote;