import { Fragment } from 'react';


interface LabelListProps {
  list: {label: string, data: string | number | React.ReactElement}[];
}

export const LabelList = ({list}: LabelListProps) => {
  return (
    <div className={'grid grid-cols-[auto,1fr]'}>
      {list.map(({label, data}, i) => {
        return (
          <Fragment key={`${label}_${i}`}>
            <div className={'text-right pr-3 text-gray-500'}>{label}</div>
            <div className={'pl-3'}>{data}</div>
          </Fragment>
        )
      })}
    </div>
  )
}


LabelList.displayName = "LabelList";
