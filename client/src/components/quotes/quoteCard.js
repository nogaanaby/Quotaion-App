import React, { Component } from 'react';
import {Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, ListGroup, ListGroupItem, Table
} from 'reactstrap';
import { Link } from 'react-router-dom'
import {
  WhatsappShareButton,
  EmailShareButton
} from 'react-share';

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

  calcFinalPrice = (price) => {
    const opositPercent = (100 - this.props.quote.discount)/100
    return price * opositPercent
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
          <CardTitle>
            {this.intFormat(this.calcFinalPrice(this.props.quote.totalPrice))}₪
            <small> <strike> {this.intFormat(this.props.quote.totalPrice)}₪ </strike></small>
          </CardTitle>
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
                services && services[0]
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
          <Button outline className="btn-torqiz" onClick={() => this.props.edit(this.props.quote._id)}>
              <i className="far fa-edit"></i>
            </Button>
            <Button outline className="btn-torqiz" onClick={() => this.props.duplicate(this.props.quote)}>
              <i className="far fa-copy"></i>
            </Button>
            <Button outline className="btn-torqiz" onClick={() => this.props.delete(this.props.quote._id)}>
              <i className="far fa-trash-alt"></i>
            </Button>
            <Link to={`/shareQuote/${this.props.quote._id}`}>
              <Button outline className="btn-torqiz">
                <i className="fas fa-expand"></i>
              </Button>
            </Link>

            <WhatsappShareButton 
              url={`https://fierce-bayou-46253.herokuapp.com/shareQuote/${this.props.quote._id}`}
              title={this.props.quote.name}
              separator=" "
              >
              <Button outline className="btn-torqiz">
                <i className="fab fa-whatsapp"></i>
              </Button>  
            </WhatsappShareButton>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default QuoteCard