import React, { useEffect, useState } from 'react';
import tableData from './data.json';

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
  allowTableEndsPosition = true,
  ...props
}) => {
  const [endsKey, setEndsKey] = useState('ends');

  useEffect(() => {
    if (allowTableEndsPosition && endsKey !== 'ends') {
      setEndsKey('ends');
    } else if (!allowTableEndsPosition && endsKey === 'ends') {
      setEndsKey('withoutEnds');
    }
  }, [allowTableEndsPosition]);

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
        // tableEnds={tableEnds}
        numSeats={numSeats}
        type={type}
        endsKey={endsKey}
      />
    </div>
  );
};

function RenderSvg({ type, numSeats, endsKey, ...props }) {
  const { defaultOptions, seatsData } = tableData[type];
  console.log('seatsData', seatsData[endsKey]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={seatsData[endsKey][numSeats].svgSize.width}
      height={seatsData[endsKey][numSeats].svgSize.height}
      viewBox={`0 0 ${seatsData[endsKey][numSeats].svgSize.width} ${seatsData[endsKey][numSeats].svgSize.height}`}
      {...props}
    >
      <defs>
        <filter
          id="shape-shadow"
          width="118.6%"
          height="118.6%"
          x="-9.3%"
          y="-9.3%"
          filterUnits="objectBoundingBox"
        >
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius=".5"
            result="shadowSpreadOuter1"
          />
          <feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="2.5"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
        </filter>
      </defs>

      <g
        fill={defaultOptions.seatColor}
        transform={`rotate(${defaultOptions.tableRotate} ${seatsData[endsKey][numSeats].svgHalfWidth} ${seatsData[endsKey][numSeats].svgHalfHeight})`}
        stroke="none"
      >
        {seatsData[endsKey][numSeats].seats &&
          seatsData[endsKey][numSeats].seats.length > 0 &&
          seatsData[endsKey][numSeats].seats.map((border, index) => {
            return (
              border &&
              border.map((seat) => {
                return (
                  <rect
                    key={seat.id}
                    data-key={seat.id}
                    width={
                      type === 'RoundTable' || index % 2 === 1
                        ? defaultOptions.seatWidth
                        : defaultOptions.seatHeight
                    }
                    height={
                      type === 'RoundTable' || index % 2 === 1
                        ? defaultOptions.seatHeight
                        : defaultOptions.seatWidth
                    }
                    x={seat.seatStartX}
                    y={seat.seatStartY}
                    transform={
                      type === 'RoundTable'
                        ? `rotate(${seat.rotate} ${seat.seatCenterX} ${seat.seatCenterY})`
                        : ''
                    }
                    rx={defaultOptions.seatRound}
                  />
                );
              })
            );
          })}
      </g>

      {type === 'RoundTable' ? (
        <>
          <circle
            cx={seatsData[endsKey][numSeats].svgHalfWidth}
            cy={seatsData[endsKey][numSeats].svgHalfWidth}
            r={seatsData[endsKey][numSeats].tableRadius}
            stroke="none"
            fill="#000"
            filter="url(#shape-shadow)"
          />
          <circle
            cx={seatsData[endsKey][numSeats].svgHalfWidth}
            cy={seatsData[endsKey][numSeats].svgHalfWidth}
            r={seatsData[endsKey][numSeats].tableRadius}
            fill="currentColor"
            stroke="none"
          />
        </>
      ) : (
        <>
          <rect
            width={seatsData[endsKey][numSeats].tableSize.width}
            height={seatsData[endsKey][numSeats].tableSize.height}
            x={defaultOptions.tableOffset}
            y={defaultOptions.tableOffset}
            rx="12"
            stroke="none"
            fill="#000"
            filter="url(#shape-shadow)"
          />
          <rect
            width={seatsData[endsKey][numSeats].tableSize.width}
            height={seatsData[endsKey][numSeats].tableSize.height}
            x={defaultOptions.tableOffset}
            y={defaultOptions.tableOffset}
            rx="12"
            fill="currentColor"
            stroke="none"
          />
        </>
      )}
    </svg>
  );
}
