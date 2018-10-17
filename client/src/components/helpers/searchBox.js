import React, { Component } from 'react';
import { Container, 
  ListGroup, ListGroupItem, Button, Table, FormGroup, 
  InputGroup, Input,InputGroupAddon, FormFeedback, InputGroupText } from 'reactstrap';

  class SearchBox extends Component {
     constructor(props){
       super(props)
        this.state = {
          filterInput: ''
        };
     }

    onChange = e => {
      this.setState({ filterInput: e.target.value });
      this.listSearch(e.target.value)
    };
  
    listSearch = (value) => {
      let temp = [...this.props.itemsList]
      temp = temp.filter((item) => item.name.includes(value))
      this.props.takeNewItemsList(temp)
    }

    render() {
      return (
        <div>
        <Container style={{margin: '1rem'}}>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fas fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="sesrch"
                onChange={this.onChange} />
            </InputGroup>
          </FormGroup>
        </Container>
        {this.props.children}
        </div>
      );
    }
  }

  export default SearchBox;