import React from 'react'

const Thead = ({ text }) => {
  return (
    <thead className="text-center align-middle mb-5" style={{ borderBottom: '2px solid #ddd' }}>
      <tr>
        {text.map((text, index) => {
          return (
            <th key={index}>{text}</th>
          )
        })}
      </tr>
    </thead>
  )
}

export default Thead
