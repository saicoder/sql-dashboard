import React from 'react'
import { Table } from 'antd'
import Card from '../../Card'


const formatTitle = (text) => {
  if (!text || text.length <= 0) return text

  const chars = text.replace(new RegExp('_', 'g'), ' ').split('')

  return chars
    .map((c, i) => (i === 0 || chars[i-1] === ' ' ? c.toUpperCase() : c))
    .join('')
    .trim()
}

const getDynamicColums = (data) => {
  if (!data || data.length === 0) return []
  
  return Object.keys(data[0]).map((key, i) => ({
    title: formatTitle(key),
    dataIndex: key,
  }))
}


export default ({ data, widget }) => (
  <Card title={widget.name || 'Unnamed Widget'} bordered={false} bodyStyle={{ padding: 0 }}>
    <Table dataSource={data} columns={getDynamicColums(data)} pagination={data && data.length > 10}/>
  </Card>
)
