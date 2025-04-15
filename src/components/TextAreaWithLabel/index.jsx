import React from 'react'
import { Form } from 'react-bootstrap'

const TextAreaWithLabel = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
}) => {
  return (
    <Form.Group className='mb-2'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows || 5}
      />
    </Form.Group>
  )
}

export default TextAreaWithLabel
