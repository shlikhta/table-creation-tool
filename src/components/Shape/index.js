import React from 'react';
import { SquareTableSvg } from './SquareTableSvg';
import { RectangularTableSvg } from './RectangularTableSvg';
import { RoundTableSvg } from './RoundTableSvg';

const tableColors = {
  free: {
    shapeColor: '#ffffff',
    textColor: '#646464',
  },
  partiallySeated: {
    shapeColor: '#fd6c00',
    textColor: '#ffffff',
  },
  seated: {
    shapeColor: '#fd6c00',
    textColor: '#ffffff',
  },
  entry: {
    shapeColor: '#b620e0',
    textColor: '#ffffff',
  },
  mainCurse: {
    shapeColor: '#0a56f1',
    textColor: '#ffffff',
  },
  dessert: {
    shapeColor: '#eb4469',
    textColor: '#ffffff',
  },
  cleared: {
    shapeColor: '#f7b500',
    textColor: '#ffffff',
  },
  checkDropped: {
    shapeColor: '#5eb602',
    textColor: '#ffffff',
  },
  paid: {
    shapeColor: '#5eb602',
    textColor: '#ffffff',
  },
  bussingNeeded: {
    shapeColor: '#6d7278',
    textColor: '#ffffff',
  },
  Finished: {
    shapeColor: '#0686f6',
    textColor: '#ffffff',
  },
};

export const Shape = ({
  id,
  type,
  name,
  number,
  numSeats,
  positionX,
  positionY,
  orientationAngle = 0,
  scale = 1,
  icon,
  progress,
  status = 'free',
  ...props
}) => {
  return (
    <div
      className={`dine-in-table`}
      style={{ color: tableColors[status].textColor }}
      {...props}
    >
      <div className="dine-in-table__box">
        <div className="dine-in-table__inner">
          <div className="dine-in-table__number">{name ? name : number}</div>
          {status !== 'free' && (
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
          color: tableColors[status].shapeColor,
          transform: `rotate(${orientationAngle}deg) scale(${scale})`,
        }}
        numSeats={numSeats}
        type={type}
      />
    </div>
  );
};

function RenderSvg({ type, ...props }) {
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
