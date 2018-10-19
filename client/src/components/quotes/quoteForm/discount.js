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
  InputGroupAddon, 
  Row,
  Col, Table,
  InputGroupText, FormFeedback,
  Container
} from 'reactstrap';


class Discount extends Component {
  constructor(props){
    super(props);
    this.state = {
      discountValue: this.props.discount,
      invalid: false
    };
  }

  onChange = e => {
    this.setState({ discountValue: e.target.value });
    if(e.target.value > 100) {
      this.setState({ invalid: true });
      this.props.validateDiscount('invalid')
    } else {
      this.setState({ invalid: false });
      this.props.validateDiscount('valid')
      this.props.onDiscount(e.target.value)
    }
  };

  calcFinalPrice = (price) => {
    const opositPercent = (100 - this.state.discountValue)/100
    return price * opositPercent
  }

  intFormat = (int) => {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <Row>
        <Col>
          <Label>
            <small>
              <b> מחיר סופי</b>
            </small>
          </Label>
          <FormGroup>
            <InputGroupAddon addonType="prepend" className="fullWidth">
              <InputGroupText name="finalPrice" className="fullWidth right bold-border">
                <p className="no-margin">{this.intFormat(this.calcFinalPrice(this.props.prevPrice))}₪</p>
              </InputGroupText>
            </InputGroupAddon>
          </FormGroup>
        </Col>

        <Col>
          <Label>
            <small>
              אחוז הנחה
            </small>
          </Label>
          <FormGroup>
            <InputGroup>
              <Input
                type="number"
                name="discount"
                id="discount"
                value={this.state.discountValue}
                placeholder="0"
                onChange={this.onChange}
                invalid={this.state.invalid}
              />
              
              <InputGroupAddon addonType="append">
                <InputGroupText>%</InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            <FormFeedback>אחי...</FormFeedback>

          </FormGroup>
        </Col>

        <Col>
          <Label>
            <small>
              סכום מקורי
            </small>
          </Label>
          <FormGroup>
          <InputGroupAddon addonType="prepend" className="fullWidth">
              <InputGroupText name="totalPrice" className="fullWidth right">
                <p className="no-margin">{this.intFormat(this.props.prevPrice)}₪</p>
              </InputGroupText>
            </InputGroupAddon>
          </FormGroup>
        </Col>

      </Row>
    );
  }
}

export default Discount;