const fs = require("fs");
console.log("Run Build!!!");

let svgData = {
  SquareTable: {
    defaultOptions: {
      svgSize: { width: 72, height: 72 },
      tableSize: { width: 54, height: 54 },
      spaceBetweenSeats: 8,
      seatWidth: 26,
      seatHeight: 18,
      tableOffset: 9,
      tableRotate: 180,
      seatOffset: 2,
      seatRound: 7,
      angleSpace: 14,
      borderCount: 4,
      seatColor: "#A0A0A0",
      maxSeats: 30,
    },
    seatsData: {
      ends: [],
      withoutEnds: [],
    },
  },
  RectangularTable: {
    defaultOptions: {
      svgSize: {
        width: 72,
        height: 72,
      },
      tableSize: {
        width: 54,
        height: 54,
      },
      spaceBetweenSeats: 18,
      seatWidth: 26,
      seatHeight: 18,
      tableOffset: 9,
      tableRotate: 180,
      seatOffset: 2,
      seatRound: 7,
      angleSpace: 14,
      borderCount: 4,
      seatColor: "#A0A0A0",
      maxSeats: 30,
    },
    seatsData: {
      ends: [],
      withoutEnds: [],
    },
  },
  RoundTable: {
    defaultOptions: {
      svgSize: { width: 66, height: 66 },
      tableSize: 54,
      tableRotate: 180,
      spaceBetweenSeats: 18,
      seatWidth: 26,
      seatHeight: 18,
      tableOffset: 6,
      seatOffset: 2,
      seatRound: 7,
      seatColor: "#A0A0A0",
      maxSeats: 30,
    },
    seatsData: {
      ends: [],
      withoutEnds: [],
    },
  },
};

function calcHalf(val) {
  return val / 2;
}

function getAnglePositions({
  tableWidth,
  tableHeight,
  borderCount,
  tableOffset,
}) {
  let tableProp = [];

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
}

//start calc for Round Seats
function getRoundSeats({
  numSeats,
  tableRadius,
  svgSize,
  seatWidth,
  seatHeight,
  seatOffset,
}) {
  let seats = [];
  const centerCoordinate = calcHalf(svgSize);

  for (let i = 0; i < numSeats; i++) {
    let seatsCount = numSeats !== 3 ? numSeats : 4;
    let step = (2 * Math.PI * i) / seatsCount;
    let rotate = (360 / seatsCount) * i + 90;
    let seatCenterX = Math.cos(step) * tableRadius + centerCoordinate;
    let seatCenterY = Math.sin(step) * tableRadius + centerCoordinate;
    let seatStartX = seatCenterX - calcHalf(seatWidth);
    let seatStartY = seatCenterY + seatOffset - calcHalf(seatHeight);

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
  // console.log("seats round", [seats]);
  return [seats];
}

function roundSeats() {
  const { defaultOptions } = svgData.RoundTable;
  const { seatWidth, seatHeight, seatOffset, tableOffset, maxSeats } =
    defaultOptions;

  for (let numSeats = 0; numSeats <= maxSeats; numSeats++) {
    const spaceBetweenSeats =
      numSeats <= 8
        ? defaultOptions.spaceBetweenSeats
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
        ? calcHalf(defaultOptions.tableSize)
        : (numSeats * (seatWidth + spaceBetweenSeats)) / (2 * Math.PI);

    let svgSize =
      numSeats <= 4
        ? defaultOptions.svgSize.width
        : (tableRadius + tableOffset) * 2;
    // let svgHeight =
    //   numSeats <= 4
    //     ? defaultOptions.svgSize.height
    //     : (tableRadius + tableOffset) * 2;
    const seats = getRoundSeats({
      numSeats,
      tableRadius,
      svgSize,
      seatWidth,
      seatHeight,
      seatOffset,
    });
    svgData.RoundTable.seatsData.ends[numSeats] = {
      seatsCount: numSeats,
      svgSize: {
        width: svgSize,
        height: svgSize,
      },
      svgHalfWidth: calcHalf(svgSize),
      svgHalfHeight: calcHalf(svgSize),
      tableRadius,
      tableSize: tableRadius * 2,
      tableRotate: numSeats === 5 ? 270 : 180,
      seats,
    };
  }
}
//end calc for Round Seats

//start calc for Square Seats

function fillSquareSeats({ tableProp, numSeats }) {
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
      let rectGroupIndex = groupIndex === 3 ? 0 : groupIndex + 1;

      tableProp[rectGroupIndex].count += 1;
      tableProp[rectGroupIndex].seats.push({
        id: `seat_${i}`,
      });
    }
  }

  return tableProp;
}

function getSquareSeats({
  tableProp,
  spaceBetweenSeats,
  svgSize,
  seatWidth,
  seatHeight,
  seatOffset,
}) {
  let seats = [];
  const centerCoordinate = calcHalf(svgSize);
  // const { defaultOptions } = svgData.RoundTable;
  // const {  } = defaultOptions;

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
}

function squareSeats() {
  const { defaultOptions } = svgData.SquareTable;
  const {
    borderCount,
    seatWidth,
    seatHeight,
    seatOffset,
    tableOffset,
    angleSpace,
    maxSeats,
  } = defaultOptions;

  for (let numSeats = 0; numSeats <= maxSeats; numSeats++) {
    const maxSeatsEachBorder = Math.ceil(numSeats / 4);

    let spaceBetweenSeats =
      numSeats <= 12
        ? defaultOptions.spaceBetweenSeats
        : numSeats > 12 && numSeats <= 20
        ? 6
        : 4;

    const tablePerimeter =
      borderCount * seatWidth * maxSeatsEachBorder +
      borderCount * (maxSeatsEachBorder - 1) * spaceBetweenSeats +
      angleSpace * borderCount * 2;
    const tableWidth = tablePerimeter / borderCount;
    // const tableHeight = tablePerimeter / borderCount;
    const tableSize =
      tableWidth > seatWidth ? tableWidth : defaultOptions.tableSize.width;
    const svgSize = tableSize + tableOffset * 2;
    // const svgHeight = tableSize + tableOffset * 2;

    let tableProp = [];
    tableProp = getAnglePositions({
      tableWidth: tableSize,
      tableHeight: tableSize,
      borderCount,
      tableOffset,
    });
    tableProp = fillSquareSeats({ tableProp, numSeats });
    let seats = getSquareSeats({
      tableProp,
      spaceBetweenSeats,
      svgSize,
      seatWidth,
      seatHeight,
      seatOffset,
    });

    svgData.SquareTable.seatsData.ends[numSeats] = {
      seatsCount: numSeats,
      svgSize: { width: svgSize, height: svgSize },
      tableSize: { width: tableSize, height: tableSize },
      svgHalfHeight: calcHalf(svgSize),
      svgHalfWidth: calcHalf(svgSize),
      seats,
    };
  }
}
//end calc for Square Seats

//start calc for Rectangular Seats

function fillRectangularSeats({ tableProp, numSeats, ends = true }) {
  for (let i = 0; i < numSeats; i++) {
    let groupIndex = i % 4;

    if (numSeats === 2 && i === 1) {
      let rectGroupIndex = groupIndex % 2 === 0 ? 0 : 2;
      if (!ends) {
        rectGroupIndex = groupIndex % 2 === 0 ? 1 : 3;
      }

      tableProp[rectGroupIndex].count += 1;
      tableProp[rectGroupIndex].seats.push({
        id: `seat_${i}`,
      });
    } else if (i < 4 && ends) {
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
}

function getRectangularSeats({
  maxSeatsEachBorder,
  tableProp,
  spaceBetweenSeats,
  seatWidth,
  seatHeight,
  seatOffset,
  svgWidth,
  svgHeight,
  ends = true,
}) {
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

        startPoint = centerX + seatsTotalHalfWidth - seatWidth;
        direction = -1;
      }

      for (let j = 0; j < seatsLength; j++) {
        let step =
          startPoint + direction * (spaceBetweenSeats * j + seatWidth * j);

        if (groupIndex === 1 || groupIndex === 3 || !ends) {
          // console.log(
          //   "startPoint",
          //   startPoint + direction * (spaceBetweenSeats * j + seatWidth * j)
          // );
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
}
function rectangularSeats(ends = true, endsKey) {
  const { defaultOptions } = svgData.RectangularTable;
  const {
    borderCount,
    seatWidth,
    seatHeight,
    seatOffset,
    tableOffset,
    angleSpace,
    maxSeats,
  } = defaultOptions;

  for (let numSeats = 0; numSeats <= maxSeats; numSeats++) {
    let spaceBetweenSeats =
      numSeats <= 8
        ? defaultOptions.spaceBetweenSeats
        : numSeats > 8 && numSeats <= 12
        ? 14
        : numSeats > 12 && numSeats <= 16
        ? 10
        : numSeats > 16 && numSeats <= 20
        ? 8
        : 4;

    let maxSeatsEachBorder = Math.ceil(
      calcHalf(ends ? numSeats - 2 : numSeats)
    );
    let tableHeight = defaultOptions.tableSize.height;
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
      seatWidth > newTableWidth
        ? defaultOptions.tableSize.width
        : newTableWidth;
    let svgWidth = tableWidth + tableOffset * 2;
    let svgHeight = defaultOptions.svgSize.height;

    let tableProp = [];
    tableProp = getAnglePositions({
      tableWidth,
      tableHeight,
      borderCount,
      tableOffset,
    });
    // console.log("tableProp", tableProp);
    tableProp = fillRectangularSeats({ tableProp, numSeats, ends });
    let seats = getRectangularSeats({
      maxSeatsEachBorder,
      tableProp,
      spaceBetweenSeats,
      seatWidth,
      seatHeight,
      seatOffset,
      svgWidth,
      svgHeight,
      ends,
    });

    svgData.RectangularTable.seatsData[endsKey][numSeats] = {
      seatsCount: numSeats,
      svgSize: { width: svgWidth, height: svgHeight },
      tableSize: { width: tableWidth, height: tableHeight },
      svgHalfHeight: calcHalf(svgHeight),
      svgHalfWidth: calcHalf(svgWidth),
      seats,
    };
  }
}
//end calc for Rectangular Seats

roundSeats();
squareSeats();
rectangularSeats(true, "ends");
rectangularSeats(false, "withoutEnds");

const outDir = "./src/components/Shape/data.json";
console.log("Write to file", outDir);
fs.writeFileSync(outDir, JSON.stringify(svgData));

console.log("Build End!!!");
