'use client'


import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { TimeChartData } from '~/app/sites/[siteId]/pings/controller/getPingRequestTimeChartData';
import { Fragment } from 'react';
import { format } from 'date-fns';


// Supress fucking webpack spamming shit around as Errors
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};




const colors = [
  '#3498db',
  '#8e44ad',
  '#2c3e50',
  '#2980b9',
  '#9b59b6',
  '#34495e',
]

export const TimelineChart = ({data}: { data: TimeChartData[] }) => {

  const chartMap = data.map((graph) => {
    return graph.data.map(({pingId, requestTime, createdAt}) => {
      return {[pingId]: requestTime, createdAt: format(createdAt, 'HH:mm')}
    })
  });

  const chartKeys = data.map((graph) => {
    return graph.data[0]!.pingId;
  });

  const pingNames = data.reduce((acc, graph) => {
    return {...acc, [graph.data[0]!.pingId]: graph.data[0]!.pingUrl};
  }, {}) as Record<string, string>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart>
        <CartesianGrid strokeDasharray="3 3"/>
        <YAxis/>
        {chartKeys.map((chartKey, idx) => {
          return (
            <Fragment key={chartKey}>
              <XAxis allowDuplicatedCategory={true} dataKey={'createdAt'} xAxisId={chartKey} hide={idx > 0}/>
              <Line
                xAxisId={chartKey}
                label={false}
                data={chartMap[idx]}
                type="monotone"
                dataKey={chartKey}
                stroke={colors[idx]}
                dot={false}/>
            </Fragment>
          )
        })}
        <Legend margin={{bottom: 200}} height={40} verticalAlign={'top'} formatter={(value) => pingNames[value]} />
      </LineChart>
    </ResponsiveContainer>
  )
}
