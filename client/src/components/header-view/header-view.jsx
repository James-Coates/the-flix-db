import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './header-view.scss';

export function HeaderView(props) {
  const { getMainView, getRegisterView, getLoginView } = props;

  return (
    <div className="header">
      <Container>
        <Navbar variant="dark" expand="md">
          <Navbar.Brand href="#home" onClick={() => getMainView()}>
            theFLIXdb
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={() => getRegisterView()}>Sign Up</Nav.Link>
              <Nav.Link onClick={() => getLoginView()}>Log In</Nav.Link>
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
