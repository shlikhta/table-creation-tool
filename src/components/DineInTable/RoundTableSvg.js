import React, { useEffect, useState } from 'react';

export const RoundTableSvg = ({ numSeats = 0, ...props }) => {
  const [svgProps, setSvgProps] = useState({
    seats: [],
    svgSize: 72,
    tableSize: 60,
    tableRotate: 180,
    tableOffset: 6,
    seatWidth: 26,
    seatHeight: 18,
    seatOffsetY: 3,
    seatRound: 7,
    seatOpacity: 0.7,
    spaceBetweenSeats: 18,
  });

  useEffect(() => {
    let seats = [];
    let spaceBetweenSeats = svgProps.spaceBetweenSeats;
    let seatWidth = svgProps.seatWidth;
    let seatHeight = svgProps.seatHeight;
    let tableOffset = svgProps.tableOffset;
    let seatOffsetY = svgProps.seatOffsetY;
    let tableRadius =
      numSeats <= 4
        ? svgProps.tableSize / 2
        : (numSeats * (seatWidth + spaceBetweenSeats)) / (2 * Math.PI);
    let svgSize =
      numSeats <= 4 ? svgProps.svgSize : (tableRadius + tableOffset) * 2;

    if (numSeats > 0) {
      let centerX = svgSize / 2;
      let centerY = svgSize / 2;

      for (let i = 0; i < numSeats; i++) {
        let seatsCount = numSeats !== 3 ? numSeats : 4;
        let step = (2 * Math.PI * i) / seatsCount;
        let rotate = (360 / seatsCount) * i + 90;
        let seatCenterX = Math.cos(step) * tableRadius + centerX;
        let seatCenterY = Math.sin(step) * tableRadius + centerY;
        let seatStartX = seatCenterX - seatWidth / 2;
        let seatStartY = seatCenterY + seatOffsetY - seatHeight / 2;

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
    }

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
        fill="#D8D8D8"
        stroke="none"
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
                width={svgProps.seatWidth}
                height={svgProps.seatHeight}
                x={seat.seatStartX}
                y={seat.seatStartY}
                opacity={svgProps.seatOpacity}
                transform={`rotate(${seat.rotate} ${seat.seatCenterX} ${seat.seatCenterY})`}
                rx={svgProps.seatRound}
              />
            );
          })}
      </g>

      <circle
        cx={svgProps.svgSize / 2}
        cy={svgProps.svgSize / 2}
        r={svgProps.tableSize / 2}
        stroke="none"
        fill="#000"
        filter="url(#round-shadow)"
      />
      <circle
        cx={svgProps.svgSize / 2}
        cy={svgProps.svgSize / 2}
        r={svgProps.tableSize / 2}
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
};
