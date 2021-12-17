import * as React from 'react';
import { PureComponent } from 'react';
import Title from '../title/Title';
import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

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
    name: 'Vertical',
    Player: 1,
    amt: 1.1,
  },
  {
    name: '5-10-5',
    Player: .5,
    amt: 1,
  },
  {
    name: '40yd',
    Player: 2,
    amt: 1,
  },
];

class PerformanceRelativeToPeers extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Title>Performance Relative to Peer Average</Title>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            stackOffset="sign"
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="Player" fill="#82ca9d" stackId="stack" />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}

export default PerformanceRelativeToPeers;