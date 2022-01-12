import React, { PureComponent } from 'react';
import Title from '../title/Title';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'WB Test',
    Player: 2.5,
    amt: 1,
  },
  {
    name: "300's",
    Player: 2.5,
    amt: 0,
  },
  {
    name: 'Broad',
    Player: -2.5,
    amt: 0,
  },
  {
    name: '5-10-5',
    Player: .5,
    amt: 1,
  }
];

class PerformanceRelativeToPeers extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Title>Performance Relative to Peer Average</Title>
        <ResponsiveContainer width="99%" height="99%">
          <BarChart
            // width={500}
            // height={300}
            data={data}
            stackOffset="sign"
            margin={{
              top: 0,
              right: 0,
              left: -40,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="Player" fill="#1976D2" stackId="stack" />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}

export default PerformanceRelativeToPeers;