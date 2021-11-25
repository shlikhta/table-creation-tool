import React, {useEffect, useState} from 'react';

export const RectangleTable = ({
  seatsCount = 0,
  ...props
}) => {
  const [svgProps, setSvgProps] = useState({
    seats: [],
    svgSize: {
      width: 72,
      height: 72
    },
    tableSize: {
      width: 54,
      height: 54
    },
    tableOffset: 9,
    seatWidth: 26,
    seatHeight: 18,
    seatOffset: 2,
    seatRx: 7,
    spaceBetweenSeats: 18, //18
    angleSpace: 14,
  });

  useEffect(() => {
    let seats = [];
    let tableProp = [];
    // let tableSize = 54;
    let tableWidth = 54;
    let tableHeight = 54;
    // let svgSize = 72;
    let svgWidth = 72;
    let svgHeight = 72;
    let spaceBetweenSeats = svgProps.spaceBetweenSeats;
    let seatWidth = svgProps.seatWidth;
    let seatHeight = svgProps.seatHeight;
    let tableOffset = svgProps.tableOffset;
    let seatOffset = svgProps.seatOffset;
    let angleSpace = svgProps.angleSpace;
    let maxSeatsEachBorder = Math.ceil((seatsCount - 2) / 2);

// console.log('maxSeatsEachBorder',maxSeatsEachBorder)
    if (seatsCount > 0) {
      const borderCount = 4;
      let tablePerimeter = 2 * tableHeight + 2 * (seatWidth * maxSeatsEachBorder + spaceBetweenSeats * (maxSeatsEachBorder - 1) + angleSpace * 2);
      tableWidth = (tablePerimeter - 2 * tableHeight) / 2;
      svgWidth = tableWidth + tableOffset * 2;

      // console.log('tablePerimeter',2 * tableHeight + 2 * (seatWidth * maxSeatsEachBorder + spaceBetweenSeats * (maxSeatsEachBorder - 1) + (angleSpace * 2)))
      // console.log('svgWidth',svgWidth)
      // console.log('tableWidth',tableWidth)

      let centerX = svgWidth / 2;
      let centerY = svgHeight / 2;

      for (let i = 0; i < borderCount; i++) {
        let rotate = (360 / borderCount) * i + 90;

        let anglePositionX =
          i % 4 === 0 || i % 4 === 3
            ? tableOffset
            : i % 4 === 1 || i % 4 === 2
              ? tableOffset + tableWidth
              : 0;
        let anglePositionY =
          i % 4 === 0 || i % 4 === 1
            ? tableOffset
            : i % 4 === 2 || i % 4 === 3
              ? tableOffset + tableHeight
              : 0;

        tableProp.push({
          count: 0,
          rotate,
          anglePositionX,
          anglePositionY,
          seats: [],
        });
      }

      for (let i = 0; i < seatsCount; i++) {
        let groupIndex = i % 4;
        let rectGroupIndex = groupIndex % 2 === 0 ? 1 : 3


        if (i < 4) {
          tableProp[groupIndex].count += 1;
          tableProp[groupIndex].seats.push({
            id: `seat_${i}`,
            anglePositionX: tableProp[groupIndex].anglePositionX,
            anglePositionY: tableProp[groupIndex].anglePositionY,
          });
        } else {
          tableProp[rectGroupIndex].count += 1;
          tableProp[rectGroupIndex].seats.push({
            id: `seat_${i}`,
            anglePositionX: tableProp[rectGroupIndex].anglePositionX,
            anglePositionY: tableProp[rectGroupIndex].anglePositionY,
          });
        }

      }

      console.table(tableProp)

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
                  spaceBetweenSeats * (maxSeatsEachBorder - 1 > 0 ? maxSeatsEachBorder - 1 : 0)) /
                2;
            }

            startPoint = centerX - seatsTotalHalfWidth;
            direction = 1;
          }

          for (let j = 0; j < seatsLength; j++) {
            // let step = startPoint + direction * (spaceBetweenSeats * j + seatWidth * j);
            let step =
              startPoint + direction * (spaceBetweenSeats * j + seatWidth * j);

            if (groupIndex === 1 || groupIndex === 3) {
              tableProp[i].seats[j].seatStartX = step;
              tableProp[i].seats[j].seatStartY =
                tableProp[i].seats[j].anglePositionY - seatHeight / 2 + direction * seatOffset;
            } else {
              tableProp[i].seats[j].seatStartY = step;
              tableProp[i].seats[j].seatStartX =
                tableProp[i].seats[j].anglePositionX - seatHeight / 2 - direction * seatOffset;
            }
          }
        }

        seats.push(tableProp[i].seats);
      }
    }

    setSvgProps((prevState) => ({
      ...prevState,
      seats,
      svgSize: {
        ...prevState.svgSize,
        width: svgWidth
      },
      tableSize: {
        ...prevState.tableSize,
        width: tableWidth
      },
    }));
  }, [seatsCount]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      // width="115"
      // height="71"
      // viewBox="0 0 115 71"
      width={svgProps.svgSize.width}
      height={svgProps.svgSize.height}
      viewBox={`0 0 ${svgProps.svgSize.width} ${svgProps.svgSize.height}`}
      {...props}
    >
      <defs>
        <filter
          // id="b"
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
                    index === 0 || index === 2 ? svgProps.seatHeight : svgProps.seatWidth
                  }
                  height={
                    index === 0 || index === 2 ? svgProps.seatWidth : svgProps.seatHeight
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
        id="a"
        width={svgProps.tableSize.width}
        height={svgProps.tableSize.height}
        x="9"
        y="9"
        rx="12"
        stroke="none"
        fill="#000"
        filter="url(#b)"
      />
      <rect
        id="a"
        width={svgProps.tableSize.width}
        height={svgProps.tableSize.height}
        x="9"
        y="9"
        rx="12"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
};
