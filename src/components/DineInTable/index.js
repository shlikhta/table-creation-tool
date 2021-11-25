import React from 'react';
import { SquareTableSvg } from './SquareTableSvg';
import { RectangularTableSvg } from './RectangularTableSvg';
import { RoundTableSvg } from './RoundTableSvg';

export const DineInTable = ({
  id,
  type,
  name,
  number,
  numSeats,
  positionX,
  positionY,
  orientationAngle = 0,
  scale,
  icon,
  progress,
  showProgress = true,
  tableColor,
  textTheme, // dark, light
  ...props
}) => {
  return (
    <div
      className={`dine-in-table dine-in-table--text-${textTheme}`}
      {...props}
    >
      <div className="dine-in-table__box">
        <div className="dine-in-table__inner">
          <div className="dine-in-table__number">{name ? name : number}</div>
          {showProgress && (
            <div className="dine-in-table__progress-bar">
              <div
                className="dine-in-table__progress-line"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {icon && <div className="dine-in-table__icon-box">{icon}</div>}
        </div>
      </div>
      <RenderSvg
        className="dine-in-table__svg"
        style={{
          color: tableColor,
          transform: `rotate(${orientationAngle}deg)`,
        }}
        numSeats={numSeats}
        type={type}
      />
    </div>
  );
};

function RenderSvg({ type, ...props }) {
  console.log('props', props);
  if (type === 'SquareTable') {
    return <SquareTableSvg {...props} />;
  } else if (type === 'RectangularTable') {
    return <RectangularTableSvg {...props} />;
  } else if (type === 'RoundTable') {
    return <RoundTableSvg {...props} />;
  } else {
    return null;
  }
}
