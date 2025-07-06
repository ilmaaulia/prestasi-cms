import React from 'react'
import { Form } from 'react-bootstrap'

const SearchInput = ({ handleChange, query, disabled, className }) => (
  <Form.Group className={className}>
    <Form.Control
      disabled={disabled}
      type='text'
      placeholder='Masukkan kata kunci...'
      value={query}
      name='query'
      onChange={handleChange}
    />
  </Form.Group>
)

export default SearchInput
