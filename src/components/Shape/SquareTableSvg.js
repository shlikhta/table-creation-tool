import React, { useEffect, useState } from 'react';

const defaultOptions = {
  seatWidth: 26,
  seatHeight: 18,
  tableOffset: 9,
  tableRotate: 180,
  seatOffset: 2,
  seatRound: 7,
  angleSpace: 14,
  borderCount: 4,
  seatColor: '#A0A0A0',
  minSpaceBetweenSeats: 4,
  maxSpaceBetweenSeats: 18,
};

export const SquareTableSvg = ({ numSeats = 0, ...props }) => {
  const [svgProps, setSvgProps] = useState({
    seats: [],
    svgSize: 72,
    tableSize: 54,
    spaceBetweenSeats: 8, //18
  });

  const calcHalf = (val) => {
    return val / 2;
  };

  const getAnglePositions = ({ tableSize, tableOffset }) => {
    let tableProp = [];
    const { borderCount } = defaultOptions;

    for (let i = 0; i < borderCount; i++) {
      let rotate = (360 / borderCount) * i;

      let anglePositionX =
        i % 4 === 0 || i % 4 === 3
          ? tableOffset + tableSize
          : i % 4 === 1 || i % 4 === 2
          ? tableOffset
          : 0;
      let anglePositionY =
        i % 4 === 0 || i % 4 === 1
          ? tableOffset + tableSize
          : i % 4 === 2 || i % 4 === 3
          ? tableOffset
          : 0;

      tableProp.push({
        count: 0,
        rotate,
        anglePositionX,
        anglePositionY,
        seats: [],
      });
    }

    return tableProp;
  };

  const fillSeats = ({ tableProp, numSeats }) => {
    for (let i = 0; i < numSeats; i++) {
      let groupIndex = i % 4;

      if (numSeats === 2 && i === 1) {
        let rectGroupIndex = groupIndex % 2 === 0 ? 0 : 2;

        tableProp[rectGroupIndex].count += 1;
        tableProp[rectGroupIndex].seats.push({
          id: `seat_${i}`,
          // anglePositionX: tableProp[rectGroupIndex].anglePositionX,
          // anglePositionY: tableProp[rectGroupIndex].anglePositionY,
        });
      } else if (i < 4) {
        tableProp[groupIndex].count += 1;
        tableProp[groupIndex].seats.push({
          id: `seat_${i}`,
          // anglePositionX: tableProp[groupIndex].anglePositionX,
          // anglePositionY: tableProp[groupIndex].anglePositionY,
        });
      } else {
        let rectGroupIndex = groupIndex === 3 ? 0 : groupIndex + 1;

        tableProp[rectGroupIndex].count += 1;
        tableProp[rectGroupIndex].seats.push({
          id: `seat_${i}`,
          // anglePositionX: tableProp[rectGroupIndex].anglePositionX,
          // anglePositionY: tableProp[rectGroupIndex].anglePositionY,
        });
      }
    }

    return tableProp;
  };

  const getSeats = ({
    tableProp,
    seatWidth,
    spaceBetweenSeats,
    seatOffset,
    seatHeight,
    svgSize,
  }) => {
    let seats = [];
    const centerCoordinate = calcHalf(svgSize);

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
          startPoint = centerCoordinate + seatsTotalHalfWidth - seatWidth;
          direction = -1;
        } else if (groupIndex === 1) {
          startPoint = centerCoordinate - seatsTotalHalfWidth;
          direction = 1;
        } else if (groupIndex === 2) {
          startPoint = centerCoordinate - seatsTotalHalfWidth;
          direction = 1;
        } else if (groupIndex === 3) {
          startPoint = centerCoordinate + seatsTotalHalfWidth - seatWidth;
          direction = -1;
        }

        for (let j = 0; j < seatsLength; j++) {
          let step =
            startPoint + direction * (spaceBetweenSeats * j + seatWidth * j);

          if (groupIndex === 1 || groupIndex === 3) {
            tableProp[i].seats[j].seatStartX = step;
            tableProp[i].seats[j].seatStartY =
              tableProp[i].anglePositionY -
              seatHeight / 2 +
              (groupIndex === 3 ? seatOffset : -seatOffset);
          } else {
            tableProp[i].seats[j].seatStartY = step;
            tableProp[i].seats[j].seatStartX =
              tableProp[i].anglePositionX -
              seatHeight / 2 +
              (groupIndex === 2 ? seatOffset : -seatOffset);
          }
        }
      }

      seats.push(tableProp[i].seats);
    }

    return seats;
  };

  useEffect(() => {
    const maxSeatsEachBorder = Math.ceil(numSeats / 4);
    const {
      borderCount,
      seatWidth,
      seatHeight,
      tableOffset,
      seatOffset,
      angleSpace,
    } = defaultOptions;

    let spaceBetweenSeats =
      numSeats <= 12
        ? svgProps.spaceBetweenSeats
        : numSeats > 12 && numSeats <= 20
        ? 6
        : 4;

    const tablePerimeter =
      borderCount * seatWidth * maxSeatsEachBorder +
      borderCount * (maxSeatsEachBorder - 1) * spaceBetweenSeats +
      angleSpace * borderCount * 2;
    const tableWidth = tablePerimeter / borderCount;
    const tableSize = tableWidth > seatWidth ? tableWidth : svgProps.tableSize;
    const svgSize = tableSize + tableOffset * 2;

    // if (numSeats > 0) {
    let tableProp = [];
    tableProp = getAnglePositions({ tableSize, tableOffset });
    tableProp = fillSeats({ tableProp, numSeats });
    let seats = getSeats({
      tableProp,
      seatWidth,
      spaceBetweenSeats,
      seatOffset,
      seatHeight,
      svgSize,
    });
    console.table(tableProp);

    // }

    setSvgProps((prevState) => ({
      ...prevState,
      seats,
      svgSize,
      tableSize,
      spaceBetweenSeats,
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

      <g
        fill={defaultOptions.seatColor}
        transform={`rotate(${defaultOptions.tableRotate} ${
          svgProps.svgSize / 2
        } ${svgProps.svgSize / 2})`}
        stroke="none"
      >
        {svgProps.seats &&
          svgProps.seats.length > 0 &&
          svgProps.seats.map((border, index) => {
            return (
              border &&
              border.map((seat) => {
                return (
                  <rect
                    key={seat.id}
                    data-key={seat.id}
                    width={
                      index % 2 === 1
                        ? defaultOptions.seatWidth
                        : defaultOptions.seatHeight
                    }
                    height={
                      index % 2 === 1
                        ? defaultOptions.seatHeight
                        : defaultOptions.seatWidth
                    }
                    x={seat.seatStartX}
                    y={seat.seatStartY}
                    rx={defaultOptions.seatRound}
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
