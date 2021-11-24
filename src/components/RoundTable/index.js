import React, { useEffect, useState } from 'react';

export const RoundTable = ({ seatsCount = 0, ...props }) => {
  const [svgProps, setSvgProps] = useState({
    seats: [],
    svgSize: 120,
    tableSize: 108,
    tableOffset: 6,
    seatWidth: 26,
    seatHeight: 18,
    seatOffsetY: 3,
    seatRx: 7,
    spaceBetweenSeats: 6,
  });

  useEffect(() => {
    let seats = [];
    let tableRadius = 108 / 2;
    let svgSize = 120;
    let spaceBetweenSeats = svgProps.spaceBetweenSeats;
    let seatWidth = svgProps.seatWidth;
    let seatHeight = svgProps.seatHeight;
    let tableOffset = svgProps.tableOffset;
    let seatOffsetY = svgProps.seatOffsetY;

    if (seatsCount > 0) {
      let tablePerimeter = 2 * Math.PI * tableRadius;

      if (tablePerimeter - seatsCount * (seatWidth + spaceBetweenSeats) <= 0) {
        tableRadius =
          (seatsCount * (seatWidth + spaceBetweenSeats)) / (2 * Math.PI);
        svgSize = (tableRadius + tableOffset) * 2;
      }

      let centerX = svgSize / 2;
      let centerY = svgSize / 2;

      for (let i = 0; i < seatsCount; i++) {
        let rotate = (360 / seatsCount) * i + 90;
        let step = (2 * Math.PI * i) / seatsCount;
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
    }));
  }, [seatsCount]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={svgProps.svgSize}
      height={svgProps.svgSize}
      viewBox={`0 0 ${svgProps.svgSize} ${svgProps.svgSize}`}
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <defs>
        <filter
          id="b"
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
        <circle
          id="a"
          cx={svgProps.svgSize / 2}
          cy={svgProps.svgSize / 2}
          r={svgProps.tableSize / 2}
          stroke="none"
        />
      </defs>
      <g fill="#D8D8D8" stroke="none">
        {svgProps.seats &&
          svgProps.seats.length > 0 &&
          svgProps.seats.map((seat) => {
            // console.log('seat', seat);
            return (
              <rect
                key={seat.id}
                width={svgProps.seatWidth}
                height={svgProps.seatHeight}
                x={seat.seatStartX}
                y={seat.seatStartY}
                opacity="0.7"
                transform={`rotate(${seat.rotate} ${seat.seatCenterX} ${seat.seatCenterY})`}
                rx="7"
              />
            );
          })}
      </g>
      <use xlinkHref="#a" fill="#000" filter="url(#b)" />
      <use xlinkHref="#a" fill="currentColor" />
    </svg>
  );
};
