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

import InputCol from './inputCol'

class InputRow extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <Row>
        <InputCol
          label={this.props.labelLeft}>
          {this.props.childLeft}
        </InputCol>

        <InputCol
          label={this.props.labelMiddle}>
          {this.props.childMiddle}
        </InputCol>

        <InputCol
          label={this.props.labelRight}>
          {this.props.childRight}
        </InputCol>

      </Row>
    );
  }
}

export default InputRow;