import React from 'react'

import { LineChart, Tooltip, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

export default class SLineChart extends React.Component{
  state = { width: false }
  
  componentDidMount(){
    console.log(this.cArea.offsetWidth)
    this.setState({ width: this.cArea.offsetWidth - 20 })
  }
  
  render() {
    return (
      <div style={{ padding: '10px 10px 10px 0' }} ref={input => this.cArea = input}>
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
    )
  }
}
