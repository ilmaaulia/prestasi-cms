import React from 'react'
import { Form } from 'react-bootstrap'

const Dropdown = ({ name, value, onChange, options = [], label  }) => {
  return (
    <Form.Group className="mt-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default Dropdown
