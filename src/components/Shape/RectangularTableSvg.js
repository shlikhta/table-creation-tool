import React, { useEffect, useState } from 'react';

const defaultOptions = {
  seatWidth: 26,
  seatHeight: 18,
  tableOffset: 9,
  tableRotate: 180, //180
  seatOffset: 2,
  seatRound: 7,
  angleSpace: 14,
  borderCount: 4,
  seatColor: '#A0A0A0',
};

export const RectangularTableSvg = ({ numSeats = 0, tableEnds, ...props }) => {
  const [svgProps, setSvgProps] = useState({
    seats: [],
    svgSize: {
      width: 72,
      height: 72,
    },
    tableSize: {
      width: 54,
      height: 54,
    },
    spaceBetweenSeats: 18,
  });

  const calcHalf = (val) => {
    return val / 2;
  };

  const getAnglePositions = ({ tableWidth, tableHeight, tableOffset }) => {
    let tableProp = [];
    const { borderCount } = defaultOptions;

    for (let i = 0; i < borderCount; i++) {
      let rotate = (360 / borderCount) * i;

      let anglePositionX =
        i % 4 === 0 || i % 4 === 3
          ? tableOffset + tableWidth
          : i % 4 === 1 || i % 4 === 2
          ? tableOffset
          : 0;
      let anglePositionY =
        i % 4 === 0 || i % 4 === 1
          ? tableOffset + tableHeight
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
        });
      } else if (i < 4) {
        tableProp[groupIndex].count += 1;
        tableProp[groupIndex].seats.push({
          id: `seat_${i}`,
        });
      } else {
        let rectGroupIndex = groupIndex % 2 === 0 ? 1 : 3;

        tableProp[rectGroupIndex].count += 1;
        tableProp[rectGroupIndex].seats.push({
          id: `seat_${i}`,
        });
      }
    }

    return tableProp;
  };

  const getSeats = ({
    maxSeatsEachBorder,
    tableProp,
    seatWidth,
    spaceBetweenSeats,
    seatOffset,
    seatHeight,
    svgWidth,
    svgHeight,
  }) => {
    let seats = [];
    const centerX = calcHalf(svgWidth);
    const centerY = calcHalf(svgHeight);

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
          if (maxSeatsEachBorder > seatsLength) {
            seatsTotalHalfWidth =
              (seatWidth * maxSeatsEachBorder +
                spaceBetweenSeats *
                  (maxSeatsEachBorder - 1 > 0 ? maxSeatsEachBorder - 1 : 0)) /
              2;
          }

          startPoint = centerX - seatsTotalHalfWidth;
          direction = 1;
        }

        for (let j = 0; j < seatsLength; j++) {
          let step =
            startPoint + direction * (spaceBetweenSeats * j + seatWidth * j);

          if (groupIndex === 1 || groupIndex === 3) {
            // let offsetDirection = groupIndex === 3 ? -1 : 1;
            tableProp[i].seats[j].seatStartX = step;
            tableProp[i].seats[j].seatStartY =
              tableProp[i].anglePositionY -
              calcHalf(seatHeight) +
              (groupIndex === 3 ? seatOffset : -seatOffset);
          } else {
            tableProp[i].seats[j].seatStartY = step;
            tableProp[i].seats[j].seatStartX =
              tableProp[i].anglePositionX -
              calcHalf(seatHeight) +
              (groupIndex === 2 ? seatOffset : -seatOffset);
          }
        }
      }

      seats.push(tableProp[i].seats);
    }

    return seats;
  };

  useEffect(() => {
    const {
      borderCount,
      seatWidth,
      seatHeight,
      tableOffset,
      seatOffset,
      angleSpace,
    } = defaultOptions;

    let spaceBetweenSeats =
      numSeats <= 8
        ? svgProps.spaceBetweenSeats
        : numSeats > 8 && numSeats <= 12
        ? 14
        : numSeats > 12 && numSeats <= 16
        ? 10
        : numSeats > 16 && numSeats <= 20
        ? 8
        : 4;

    let maxSeatsEachBorder = Math.ceil(calcHalf(numSeats - 2));
    let tableHeight = svgProps.tableSize.height;
    let tablePerimeter =
      calcHalf(borderCount) * tableHeight +
      calcHalf(borderCount) *
        (seatWidth * maxSeatsEachBorder +
          spaceBetweenSeats * (maxSeatsEachBorder - 1) +
          angleSpace * calcHalf(borderCount));
    let newTableWidth =
      (tablePerimeter - calcHalf(borderCount) * tableHeight) /
      calcHalf(borderCount);
    let tableWidth =
      seatWidth > newTableWidth ? svgProps.tableSize.width : newTableWidth;
    let svgWidth = tableWidth + tableOffset * 2;
    let svgHeight = svgProps.svgSize.height;

    // if (numSeats > 0) {
    let tableProp = [];
    tableProp = getAnglePositions({ tableWidth, tableHeight, tableOffset });
    tableProp = fillSeats({ tableProp, numSeats });
    let seats = getSeats({
      maxSeatsEachBorder,
      tableProp,
      seatWidth,
      spaceBetweenSeats,
      seatOffset,
      seatHeight,
      svgWidth,
      svgHeight,
    });
    // }

    setSvgProps((prevState) => ({
      ...prevState,
      seats,
      svgSize: {
        ...prevState.svgSize,
        width: svgWidth,
      },
      tableSize: {
        ...prevState.tableSize,
        width: tableWidth,
      },
    }));
  }, [numSeats]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={svgProps.svgSize.width}
      height={svgProps.svgSize.height}
      viewBox={`0 0 ${svgProps.svgSize.width} ${svgProps.svgSize.height}`}
      {...props}
    >
      <defs>
        <filter
          id="rectangular-shadow"
          width="118.6%"
          height="134%"
          x="-9.3%"
          y="-17%"
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
          svgProps.svgSize.width / 2
        } ${svgProps.svgSize.height / 2})`}
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
        width={svgProps.tableSize.width}
        height={svgProps.tableSize.height}
        x={defaultOptions.tableOffset}
        y={defaultOptions.tableOffset}
        rx="12"
        stroke="none"
        fill="#000"
        filter="url(#rectangular-shadow)"
      />
      <rect
        width={svgProps.tableSize.width}
        height={svgProps.tableSize.height}
        x={defaultOptions.tableOffset}
        y={defaultOptions.tableOffset}
        rx="12"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
};
