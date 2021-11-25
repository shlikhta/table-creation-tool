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
  orientationAngle,
  scale,
}) => {
  return (
    <div className="dine-in-table">
      <RenderSvg numSeats={numSeats} type={type} />
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
