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


class InputCol extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }


  render() {
    return (
        <Col>
          <Label>
            {this.props.label}
          </Label>
          <FormGroup>
            {this.props.children}
          </FormGroup>
        </Col>
    );
  }
}

export default InputCol;