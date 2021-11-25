import React, { useEffect, useState } from 'react';

export const SquareTableSvg = ({ numSeats = 0, ...props }) => {
  const [svgProps, setSvgProps] = useState({
    seats: [],
    svgSize: 72,
    tableSize: 54,
    tableOffset: 9,
    seatWidth: 26,
    seatHeight: 18,
    seatOffset: 2,
    seatRx: 7,
    spaceBetweenSeats: 18,
    angleSpace: 14,
  });

  useEffect(() => {
    const borderCount = 4;
    let seats = [];
    let tableProp = [];
    let spaceBetweenSeats = svgProps.spaceBetweenSeats;
    let seatWidth = svgProps.seatWidth;
    let seatHeight = svgProps.seatHeight;
    let tableOffset = svgProps.tableOffset;
    let seatOffset = svgProps.seatOffset;
    let angleSpace = svgProps.angleSpace;
    let maxSeatsEachBorder = Math.ceil(numSeats / 4);
    let tablePerimeter =
      borderCount * seatWidth * maxSeatsEachBorder +
      borderCount * (maxSeatsEachBorder - 1) * spaceBetweenSeats +
      angleSpace * borderCount * 2;
    let tableWidth = tablePerimeter / borderCount;
    let tableSize = tableWidth > seatWidth ? tableWidth : svgProps.tableSize;
    let svgSize = tableSize + tableOffset * 2;

    if (numSeats > 0) {
      const borderCount = 4;

      let centerX = svgSize / 2;
      let centerY = svgSize / 2;

      for (let i = 0; i < borderCount; i++) {
        let rotate = (360 / borderCount) * i + 90;

        let anglePositionX =
          i % 4 === 0 || i % 4 === 3
            ? tableOffset
            : i % 4 === 1 || i % 4 === 2
            ? tableOffset + tableSize
            : 0;
        let anglePositionY =
          i % 4 === 0 || i % 4 === 1
            ? tableOffset
            : i % 4 === 2 || i % 4 === 3
            ? tableOffset + tableSize
            : 0;

        tableProp.push({
          count: 0,
          rotate,
          anglePositionX,
          anglePositionY,
          seats: [],
        });
      }

      for (let i = 0; i < numSeats; i++) {
        let groupIndex = i % 4;

        if (numSeats === 2 && i === 1) {
          let rectGroupIndex = groupIndex % 2 === 0 ? 0 : 2;

          tableProp[rectGroupIndex].count += 1;
          tableProp[rectGroupIndex].seats.push({
            id: `seat_${i}`,
            anglePositionX: tableProp[rectGroupIndex].anglePositionX,
            anglePositionY: tableProp[rectGroupIndex].anglePositionY,
          });
        } else if (i < 4) {
          tableProp[groupIndex].count += 1;
          tableProp[groupIndex].seats.push({
            id: `seat_${i}`,
            anglePositionX: tableProp[groupIndex].anglePositionX,
            anglePositionY: tableProp[groupIndex].anglePositionY,
          });
        } else {
          let rectGroupIndex = groupIndex === 3 ? 0 : groupIndex + 1;

          tableProp[rectGroupIndex].count += 1;
          tableProp[rectGroupIndex].seats.push({
            id: `seat_${i}`,
            anglePositionX: tableProp[rectGroupIndex].anglePositionX,
            anglePositionY: tableProp[rectGroupIndex].anglePositionY,
          });
        }
      }

      for (let i = 0; i < tableProp.length; i++) {
        let groupIndex = i % 4;

        let seatsLength = tableProp[i].seats.length;

        if (seatsLength > 0) {
          let seatsTotalHalfWidth =
            (seatWidth * seatsLength +
              spaceBetweenSeats * (seatsLength - 1 > 0 ? seatsLength - 1 : 0)) /
            2;
          let startPoint = 0;
          let direction = 1;

          if (groupIndex === 0) {
            startPoint = centerY + seatsTotalHalfWidth - seatWidth;
            direction = -1;
          } else if (groupIndex === 1) {
            startPoint = centerX - seatsTotalHalfWidth;
            direction = 1;
          } else if (groupIndex === 2) {
            startPoint = centerY - seatsTotalHalfWidth;
            direction = 1;
          } else if (groupIndex === 3) {
            startPoint = centerX + seatsTotalHalfWidth - seatWidth;
            direction = -1;
          }

          for (let j = 0; j < seatsLength; j++) {
            let step =
              startPoint + direction * (spaceBetweenSeats * j + seatWidth * j);

            if (groupIndex === 1 || groupIndex === 3) {
              tableProp[i].seats[j].seatStartX = step;
              tableProp[i].seats[j].seatStartY =
                tableProp[i].seats[j].anglePositionY -
                seatHeight / 2 +
                direction * seatOffset;
            } else {
              tableProp[i].seats[j].seatStartY = step;
              tableProp[i].seats[j].seatStartX =
                tableProp[i].seats[j].anglePositionX -
                seatHeight / 2 -
                direction * seatOffset;
            }
          }
        }

        seats.push(tableProp[i].seats);
      }
    }

    setSvgProps((prevState) => ({
      ...prevState,
      seats,
      svgSize,
      tableSize,
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
          id="square-shadow"
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

      <g fill="#D8D8D8" stroke="none">
        {svgProps.seats &&
          svgProps.seats.length > 0 &&
          svgProps.seats.map((border, index) => {
            return (
              border &&
              border.length > 0 &&
              border.map((seat) => {
                return (
                  <rect
                    key={seat.id}
                    data-key={seat.id}
                    width={
                      index % 2 === 1 ? svgProps.seatWidth : svgProps.seatHeight
                    }
                    height={
                      index % 2 === 1 ? svgProps.seatHeight : svgProps.seatWidth
                    }
                    x={seat.seatStartX}
                    y={seat.seatStartY}
                    opacity="0.7"
                    rx="7"
                  />
                );
              })
            );
          })}
      </g>
      <rect
        width={svgProps.tableSize}
        height={svgProps.tableSize}
        x="9"
        y="9"
        rx="12"
        stroke="none"
        fill="#000"
        filter="url(#square-shadow)"
      />
      <rect
        width={svgProps.tableSize}
        height={svgProps.tableSize}
        x="9"
        y="9"
        rx="12"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
};