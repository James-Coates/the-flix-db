import React from 'react';
import { connect } from 'react-redux';

import './visibility-filter.scss';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput({setFilter, visibilityFilter}) {
  return (
    <div className="visibility-filter__container">
      <Form.Control
        onChange={e => setFilter(e.target.value)}
        value={visibilityFilter}
        placeholder="Search"
      />
    </div>
  )
}

export default connect(({visibilityFilter}) => ({visibilityFilter}), {setFilter})(VisibilityFilterInput);