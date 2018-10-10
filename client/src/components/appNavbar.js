import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  Container,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import { Link } from 'react-router-dom'

  class AppNavbar extends Component {
    constructor(props){
      super(props)
      this.state={
        isOpen: false
      }
    }

    toggle = () => {
      this.setState({isOpen: !this.state.isOpen})
    }

    render() {
      return (
        <div className="Navbar">
          <Navbar color="info" dark expand="sm" className="mb-5">
            <Container>
              <NavbarBrand href="/">ShoppingList</NavbarBrand>
              <NavbarToggler onClick={this.toggle}/>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link className="nav-link" to='/'>
                      הצעות מחיר
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to='/services'>
                      שירות
                    </Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
        </div>
      );
    }
  }

  export default AppNavbar;