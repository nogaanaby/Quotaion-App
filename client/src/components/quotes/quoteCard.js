import React, { Component } from 'react';
import {Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, ListGroup, ListGroupItem, Table
} from 'reactstrap';

class QuoteCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }

  nameFormat = (str) => {
    if(str.length > 12) {
      return '...' + str.slice(0, 12)
    }  else {
      return str
    }
  }

  intFormat = (int) => {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    const { services } = this.props.quote
    return (
      <Card className="quote-card">
        <CardHeader className="bg-torqiz">{this.props.quote.name}</CardHeader>
        <CardBody>
          <CardTitle>{this.intFormat(this.props.quote.totalPrice)}₪</CardTitle>
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
                services
                ? <tr>
                    <th scope="row"></th>
                    <td>{services[0].totalPrice}₪</td>
                    <td>{this.nameFormat(services[0].name)}</td>
                  </tr>
                : <tr><td></td></tr>
              }
              {
                services && services[1]
                ? <tr>
                    <th scope="row"></th>
                    <td>{services[1].totalPrice}₪</td>
                    <td>{this.nameFormat(services[1].name)}</td>
                  </tr>
                : <tr><td></td></tr>
              }
            </tbody>
          </Table>
          <small>...</small>
        </CardBody>
      <CardFooter className="bg-torqiz-light">
        <div className="card-buttons">
          <Button outline className="btn-torqiz">
              <i className="far fa-edit"></i>
            </Button>
            <Button outline className="btn-torqiz">
              <i className="far fa-copy"></i>
            </Button>
            <Button outline className="btn-torqiz" onClick={() => this.props.delete(this.props.quote._id)}>
              <i className="far fa-trash-alt"></i>
            </Button>
            <Button outline className="btn-torqiz" onClick={() => this.props.expand(this.props.quote._id)}>
              <i className="fas fa-expand"></i>
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default QuoteCard