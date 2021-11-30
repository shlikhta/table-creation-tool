import React, { useEffect, useState } from 'react';

const defaultOptions = {
  seatWidth: 26,
  seatHeight: 18,
  tableOffset: 6,
  seatOffsetY: 2,
  seatRound: 7,
  seatColor: '#A0A0A0',
};

export const RoundTableSvg = ({ numSeats = 0, tableEnds, ...props }) => {
  const [svgProps, setSvgProps] = useState({
    seats: [],
    svgSize: 66,
    tableSize: 54,
    tableRotate: 180,
    spaceBetweenSeats: 18,
  });

  const calcHalf = (val) => {
    return val / 2;
  };

  const getSeats = ({ numSeats, tableRadius, svgSize }) => {
    let seats = [];
    const centerCoordinate = calcHalf(svgSize);
    const { seatWidth, seatHeight, seatOffsetY } = defaultOptions;

    for (let i = 0; i < numSeats; i++) {
      let seatsCount = numSeats !== 3 ? numSeats : 4;
      let step = (2 * Math.PI * i) / seatsCount;
      let rotate = (360 / seatsCount) * i + 90;
      let seatCenterX = Math.cos(step) * tableRadius + centerCoordinate;
      let seatCenterY = Math.sin(step) * tableRadius + centerCoordinate;
      let seatStartX = seatCenterX - calcHalf(seatWidth);
      let seatStartY = seatCenterY + seatOffsetY - calcHalf(seatHeight);

      seats.push({
        id: `seat_${i}`,
        step,
        rotate,
        seatCenterX,
        seatCenterY,
        seatStartX,
        seatStartY,
      });
    }

    return seats;
  };

  useEffect(() => {
    const { seatWidth, tableOffset } = defaultOptions;

    let spaceBetweenSeats =
      numSeats <= 8
        ? svgProps.spaceBetweenSeats
        : numSeats > 8 && numSeats <= 12
        ? 14
        : numSeats > 12 && numSeats <= 16
        ? 10
        : numSeats > 16 && numSeats <= 20
        ? 8
        : numSeats > 20 && numSeats <= 23
        ? 6
        : 4;

    let tableRadius =
      numSeats <= 4
        ? calcHalf(svgProps.tableSize)
        : (numSeats * (seatWidth + spaceBetweenSeats)) / (2 * Math.PI);

    let svgSize =
      numSeats <= 4 ? svgProps.svgSize : (tableRadius + tableOffset) * 2;
    const seats = getSeats({ numSeats, tableRadius, svgSize });

    setSvgProps((prevState) => ({
      ...prevState,
      seats,
      svgSize,
      tableSize: tableRadius * 2,
      tableRotate: numSeats === 5 ? 270 : 180,
    }));
  }, [numSeats]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={svgProps.svgSize}
      height={svgProps.svgSize}
      viewBox={`0 0 ${svgProps.svgSize} ${svgProps.svgSize}`}
      {...props}
    >
      <defs>
        <filter
          id="round-shadow"
          width="116.7%"
          height="116.7%"
          x="-8.3%"
          y="-8.3%"
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
        stroke="none"
        fill={defaultOptions.seatColor}
        transform={`rotate(${svgProps.tableRotate} ${svgProps.svgSize / 2} ${
          svgProps.svgSize / 2
        })`}
      >
        {svgProps.seats &&
          svgProps.seats.length > 0 &&
          svgProps.seats.map((seat) => {
            return (
              <rect
                key={seat.id}
                width={defaultOptions.seatWidth}
                height={defaultOptions.seatHeight}
                x={seat.seatStartX}
                y={seat.seatStartY}
                transform={`rotate(${seat.rotate} ${seat.seatCenterX} ${seat.seatCenterY})`}
                rx={defaultOptions.seatRound}
              />
            );
          })}
      </g>

      <circle
        cx={calcHalf(svgProps.svgSize)}
        cy={calcHalf(svgProps.svgSize)}
        r={calcHalf(svgProps.tableSize)}
        stroke="none"
        fill="#000"
        filter="url(#round-shadow)"
      />
      <circle
        cx={calcHalf(svgProps.svgSize)}
        cy={calcHalf(svgProps.svgSize)}
        r={calcHalf(svgProps.tableSize)}
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
};
