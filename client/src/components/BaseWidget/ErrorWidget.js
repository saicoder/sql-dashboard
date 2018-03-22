import React from 'react'


const style = {
  height: '100%',
  background: '#e74c3c',
  borderRadius: '3px',
  color: '#fff',
  padding: '15px',
  minHeight: '160px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export default ({ error }) => (
  <div style={style}>
    {error.message}
  </div>
)
