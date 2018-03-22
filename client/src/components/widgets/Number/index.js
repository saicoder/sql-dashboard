import React from 'react'

const getNumber = (data = []) => {
  const row = data[0]
  if (!row) return "Invalid Query"

  const key = Object.keys(row)[0]
  if (!row) return "Invalid Query"

  return row[key].toLocaleString()
}

export default ({ data, widget }) => (
  <div style={{ fontSize: '3em', textAlign: 'center', padding: '20px 5px 20px 5px' }}>{getNumber(data)}</div>
)
