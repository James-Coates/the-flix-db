import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

export function DirectorView( {director} ) {

  console.log(director);

  return(
    <div className="director-view">
      <Container>
        <div>{director.name}</div>
        <div>{director.bio}</div>
      </Container>
    </div>
  );
}