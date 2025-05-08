import React from 'react'
import { Form } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const RichTextEditor = ({ label, name, value, onChange }) => {
  const handleEditorChange = (content) => {
    onChange({ target: { name, value: content } })
  }

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <ReactQuill value={value} onChange={handleEditorChange} />
    </Form.Group>
  )
}

export default RichTextEditor
