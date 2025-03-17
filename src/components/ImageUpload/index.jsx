import React from 'react'
import { Form } from 'react-bootstrap'

const ImageUpload = ({ label, name, onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    console.log('Selected file:', file)
    
    if (file) {
      onChange(file)
    }
  }

  return (
    <Form.Group controlId={name} className="my-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        name={name}
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
    </Form.Group>
  )
}


export default ImageUpload
