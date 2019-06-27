import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

import { setSortColumn } from '../../actions/actions';

import './sort-column-input.scss';

function SortColumnInput({setSortColumn, sortColumn}) {

  return(
    <div className="sort-column">
      <Form.Label className="sort-column__label">Sort:</Form.Label>
      <Form.Control className="sort-column__select" onChange={e => {setSortColumn(e.target.value)}} value={sortColumn} as="select">
        <option value="title">Title</option>
        <option value="genre">Genre</option>
        <option value="director">Director</option>
      </Form.Control>
    </div>
  )

}

export default connect(({sortColumn}) => ({sortColumn}), {setSortColumn})(SortColumnInput)