import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './header-view.scss';

export function HeaderView(props) {
  const { logout } = props;


  return (
    <div className="header">
      <Container>
        <Navbar variant="dark" expand="md">
          <Link to={'/'}>
            <Navbar.Brand>
              theFLIXdb
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            {/* {!user ? ( */}
              <Nav>
                <Link to='/register'>
                  <Nav.Item>Sign Up</Nav.Item>
                </Link>
                <Link to='/login'>
                  <Nav.Item>Log In</Nav.Item>
                </Link>
              </Nav>
            {/* ) : (
              <Nav>
                <Link to={`/users/${user}`}><NavItem>Welcome Back {user}</NavItem></Link>
                <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
              </Nav>
            )} */}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

HeaderView.propTypes = {
  getRegisterView: PropTypes.func.isRequired,
  getLoginView: PropTypes.func.isRequired,
};
