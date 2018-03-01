import React from 'react'
import Card from '../../Card'

import { LineChart, Tooltip, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'

export default class SLineChart extends React.Component{
  state = { width: false }
  
  componentDidMount(){
    console.log(this.cArea.offsetWidth)
    this.setState({ width: this.cArea.offsetWidth - 20 })
  }
  
  render() {
    return (
      <Card title={this.props.widget.name || 'Unnamed Widget'} bodyStyle={{ padding: 0 }}>
        <div style={{ padding: '10px' }} ref={input => this.cArea = input}>
          {this.state.width ? 
          <LineChart data={this.props.data} style={{ width: '100%' }} height={200} width={this.state.width}>
            <XAxis dataKey="date" />
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#ff7300" yAxisId={0} />
          </LineChart>
          : null }
        </div>
      </Card>
    )
  }
}
