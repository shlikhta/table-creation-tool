import React, { useEffect, useState } from 'react';

export const SquareTable = ({ seatsCount = 0, ...props }) => {
  const [svgProps, setSvgProps] = useState({
    seats: [],
    svgSize: 72,
    tableSize: 54,
    tableOffset: 9,
    seatWidth: 26,
    seatHeight: 18,
    seatOffsetY: 2,
    seatRx: 7,
    spaceBetweenSeats: 10, //18
    angleSpace: 14,
  });

  useEffect(() => {
    let seats = [];
    let tableProp = [];
    let tableSize = 54;
    let svgSize = 72;
    let spaceBetweenSeats = svgProps.spaceBetweenSeats;
    let seatWidth = svgProps.seatWidth;
    let seatHeight = svgProps.seatHeight;
    let tableOffset = svgProps.tableOffset;
    let seatOffsetY = svgProps.seatOffsetY;
    let angleSpace = svgProps.angleSpace;
    let maxSeatsEachBorder = Math.ceil(seatsCount / 4);
    console.log('maxSeatsEachBorder', maxSeatsEachBorder);

    if (seatsCount > 0) {
      const borderCount = 4;
      let tablePerimeter =
        borderCount * seatWidth * maxSeatsEachBorder +
        borderCount * (maxSeatsEachBorder - 1) * spaceBetweenSeats +
        angleSpace * borderCount * 2;
      tableSize = tablePerimeter / borderCount;
      svgSize = tableSize + tableOffset * 2;

      // console.log('tablePerimeter', tablePerimeter);
      // console.log('tableSize', tableSize);
      // console.log('!!!!', seatsCount % 4);
      // console.log(
      //   'check',
      //   4 * (seatWidth * test) +
      //     4 * (test - 1) * spaceBetweenSeats +
      //     angleSpace * 8
      // );
      // if (seatsCount <= 4) {
      // console.log('check <= 4', seatsCount * seatWidth + angleSpace * 8);
      // } else if (seatsCount > 4) {
      // console.log('check > 4', seatsCount * seatWidth + angleSpace * 8);
      // }

      // if (tablePerimeter - seatsCount * (seatWidth + spaceBetweenSeats) <= 0) {
      // tableSize =
      //   (seatsCount * (seatWidth + spaceBetweenSeats)) / (2 * Math.PI);
      // svgSize = (tableRadius + tableOffset) * 2;
      // }

      //
      // let centerX = svgSize / 2;
      // let centerY = svgSize / 2;

      // console.log('svgSize', svgSize / 2);
      //

      let centerX = svgSize / 2;
      let centerY = svgSize / 2;

      for (let i = 0; i < borderCount; i++) {
        let rotate = (360 / borderCount) * i + 90;
        let step = (2 * Math.PI * i) / seatsCount;
        let seatCenterX = (Math.cos(step) * tableSize) / 2 + centerX;
        let seatCenterY = (Math.sin(step) * tableSize) / 2 + centerY;

        /* let anglePositionX =
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
            : 0;*/

        tableProp.push({
          step,
          rotate,
          count: 0,
          seatCenterX,
          seatCenterY,
          seats: [],
        });
        // seats.push([]);
      }

      for (let i = 0; i < seatsCount; i++) {
        let groupIndex = i % 4;
        tableProp[groupIndex].count += 1;
        //   let rotate = (360 / 4) * i + 90;
        //   let step = (2 * Math.PI * i) / 4;
        //   let seatCenterX = (Math.cos(step) * tableSize) / 2 + centerX;
        //   let seatCenterY = (Math.sin(step) * tableSize) / 2 + centerY;
        //   let seatStartX = seatCenterX - seatWidth / 2;
        // let seatStartY = seatCenterY + seatOffsetY - seatHeight / 2;
        // if (groupIndex === 0) {
        //   groupIndex = 0;
        // } else if (groupIndex === 1) {
        //   groupIndex = 1;
        // } else if (groupIndex === 2) {
        //   groupIndex = 2;
        // } else if (groupIndex === 3) {
        //   groupIndex = 3;
        // }
        console.log(`groupIndex --- ${groupIndex} seatID === seat_${i}`);

        tableProp[groupIndex].seats.push({
          id: `seat_${i}`,
          //     step,
          // rotate: tableProp[groupIndex].rotate,
          //     seatCenterX,
          //     seatCenterY,
          // seatStartX: tableProp[groupIndex].anglePositionX,
          // seatStartY: tableProp[groupIndex].anglePositionY,
          rotate: tableProp[groupIndex].rotate,
          seatCenterX: tableProp[groupIndex].seatCenterX,
          seatCenterY: tableProp[groupIndex].seatCenterY,
          seatStartX: tableProp[groupIndex].seatCenterX,
          seatStartY: tableProp[groupIndex].seatCenterY,
        });

        // seats[groupIndex]
      }

      for (let i = 0; i < tableProp.length; i++) {
        let groupIndex = i % 4;

        let seatsLength = tableProp[i].seats.length;
        // let checkBorder =
        //   tableSize -
        //   (angleSpace * 2 +
        //     seatsLength * seatWidth +
        //     (seatsLength - 1) * spaceBetweenSeats);
        // let angleOffset =
        //   checkVal === 0
        //     ? angleSpace
        //     : (tableSize -
        //         (seatsLength * seatWidth +
        //           (seatsLength - 1) * spaceBetweenSeats)) /
        //       2;

        // console.log('check', checkVal);
        // console.log('angleOffset', angleOffset);

        // centered on each border
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

            if (j % 2) {
              // odd = 1
              if (groupIndex === 1 || groupIndex === 3) {
                tableProp[i].seats[j].seatStartX = step;
                tableProp[i].seats[j].seatStartY =
                  tableProp[i].seats[j].seatCenterY - seatHeight / 2;
              } else {
                tableProp[i].seats[j].seatStartY = step;
                tableProp[i].seats[j].seatStartX =
                  tableProp[i].seats[j].seatCenterX - seatHeight / 2;
              }
            } else {
              // event = 0
              console.log('startPoint', startPoint);
              if (groupIndex === 1 || groupIndex === 3) {
                tableProp[i].seats[j].seatStartX = step;
                tableProp[i].seats[j].seatStartY =
                  tableProp[i].seats[j].seatCenterY - seatHeight / 2;
              } else {
                tableProp[i].seats[j].seatStartY = step;
                tableProp[i].seats[j].seatStartX =
                  tableProp[i].seats[j].seatCenterX - seatHeight / 2;
              }
            }

            // console.log()
            // if (groupIndex ) {
            // tableProp[i].seats[j].seatStartX =
            //   startPoint + spaceBetweenSeats * j + seatWidth * j;
            //
            // tableProp[i].seats[j].seatStartY =
            //   tableProp[i].seats[j].seatCenterY - seatHeight / 2;
            //even 2
            // let startPoint =
            //   centerX - (seatWidth * seatsLength + spaceBetweenSeats * j) / 2;
            // tableProp[i].seats[j].seatStartX =
            //   startPoint + spaceBetweenSeats * j + seatWidth * j;
            // tableProp[i].seats[j].seatStartX =
            //   tableOffset +
            //   spaceBetweenSeats +
            //   j * seatWidth +
            //   j * angleOffset;
            // tableProp[i].seats[j].seatStartY =
            //   tableProp[i].anglePositionY - seatHeight / 2;
            // seatCenterX: tableProp[groupIndex].anglePositionX,
            // tableProp[i].seats[j].seatCenterX =
            //   tableProp[i].seats[j].seatStartX + seatWidth / 2;
            // tableProp[i].seats[j].seatCenterY =
            //   tableProp[i].anglePositionY + seatHeight / 2;
            // } else {
            //odd 1
            // tableProp[i].seats[j].seatStartY =
            //   startPoint + spaceBetweenSeats * j + seatWidth * j;
            //
            // tableProp[i].seats[j].seatStartX =
            //   tableProp[i].seats[j].seatCenterX - seatHeight / 2;
            // tableProp[i].seats[j].seatStartY =
            //   tableOffset +
            //   spaceBetweenSeats +
            //   j * seatWidth +
            //   j * angleOffset;
            // tableProp[i].seats[j].seatStartX =
            //   tableProp[i].anglePositionX - seatHeight / 2 - seatOffsetY;
            // seatCenterX: tableProp[groupIndex].anglePositionX,
            // seatCenterY: tableProp[groupIndex].anglePositionY,
            // tableProp[i].seats[j].seatCenterX =
            //   tableProp[i].anglePositionX + seatWidth / 2;
            // tableProp[i].seats[j].seatCenterY =
            //   tableProp[i].seats[j].seatStartY + seatHeight / 2;
            // }
          }
        }

        seats.push(tableProp[i].seats);
      }

      console.table(tableProp);
      // console.table(seats);
    }

    setSvgProps((prevState) => ({
      ...prevState,
      seats,
      svgSize,
      tableSize,
    }));
  }, [seatsCount]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      // width="115"
      // height="71"
      // viewBox="0 0 115 71"
      width={svgProps.svgSize}
      height={svgProps.svgSize}
      viewBox={`0 0 ${svgProps.svgSize} ${svgProps.svgSize}`}
      style={{ backgroundColor: 'grey' }}
      fill="currentColor"
      stroke="none"
      {...props}
    >
      {/* {' '}
      <defs>
        <filter
          id="b"
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
        <rect
          id="a"
          width={svgProps.svgSize}
          height={svgProps.svgSize}
          x="9"
          y="9"
          rx="12"
        />
      </defs>*/}
      {/*     <rect
        // id="a"
        width={svgProps.tableSize}
        height={svgProps.tableSize}
        x="9"
        y="9"
        rx="12"
        stroke="none"
      />*/}
      <rect
        // id="a"
        width={svgProps.tableSize}
        height={svgProps.tableSize}
        x="9"
        y="9"
        rx="12"
        stroke="none"
      />
      <g fill="#D8D8D8" stroke="none">
        {svgProps.seats &&
          svgProps.seats.length > 0 &&
          svgProps.seats.map((border, index) => {
            // console.log('border', border);
            return (
              border &&
              border.length > 0 &&
              border.map((seat) => {
                // console.log('seat', seat);
                // console.log('svgProps.seatWidth', svgProps.seatWidth);
                // console.log('svgProps.seatHeight', svgProps.seatHeight);
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
                    opacity="1"
                    // transform={`rotate(${seat.rotate} ${seat.seatCenterX} ${seat.seatCenterY})`}
                    rx="7"
                  />
                );
              })
            );
          })}
      </g>
    </svg>
  );
};
