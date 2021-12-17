import React, { PureComponent } from 'react';
import Title from '../title/Title';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: "The 50's Wall Ball Test",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "300's",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Broad Jump",
    A: 86,
    B: 130,
    fullMark: 150,
  },
];

class StrengthsAssessment extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Title>Strengths Assessment</Title>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Player" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Average" dataKey="B" stroke="#383838" fill="#383838" fillOpacity={0.3} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}

export default StrengthsAssessment;