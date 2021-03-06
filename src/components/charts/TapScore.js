import React, { PureComponent } from 'react';
import Title from '../title/Title';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class TapScore extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Title>TAP Score Relative to Team</Title>
        <ResponsiveContainer width="100%" aspect={1}>
          <BarChart 
            width={500}
            height={300}
            data={data}
            layout='vertical'
          >
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name" />
            <Bar dataKey="uv" fill="#1976D2" />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}