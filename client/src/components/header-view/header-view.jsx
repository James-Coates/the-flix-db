import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './header-view.scss';

export function HeaderView(props) {
  const { getMainView, getRegisterView, getLoginView } = props;

  return (
    // <div className="header">
    //   <button type="button" onClick={() => getMainView()}>
    //     Home
    //   </button>
    //   <button type="button" onClick={() => getRegisterView()}>
    //     Register
    //   </button>
    //   <button type="button" onClick={() => getLoginView()}>
    //     Login
    //   </button>
    // </div>
    <div className="header">
      <Container>
        <Navbar variant="dark" expand="md">
          <Navbar.Brand href="#home" onClick={() => getMainView()}>
            theFLIXdb
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => getMainView()}>Home</Nav.Link>
              <Nav.Link onClick={() => getRegisterView()}>Register</Nav.Link>
              <Nav.Link onClick={() => getLoginView()}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

HeaderView.propTypes = {
  getMainView: PropTypes.func.isRequired,
  getRegisterView: PropTypes.func.isRequired,
  getLoginView: PropTypes.func.isRequired,
};
