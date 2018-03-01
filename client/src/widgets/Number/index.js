import React from 'react'
import Card from '../../Card'

const getNumber = (data = []) => {
  const row = data[0]
  if (!row) return "Invalid Query"

  const key = Object.keys(row)[0]
  if (!row) return "Invalid Query"

  return row[key].toLocaleString()
}

export default ({ data, widget }) => (
  <Card title={widget.name || 'Unnamed Widget'}>
    <div style={{ fontSize: '3em', textAlign: 'center' }}>{getNumber(data)}</div>
  </Card>
)
