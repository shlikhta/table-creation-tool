const fs = require("fs").promises;
console.log("Run Build!!!");

let svgData = {
  SquareTable: {},
  RectangularTable: {},
  RoundTable: {
    defaultOptions: {
      seatWidth: 26,
      seatHeight: 18,
      tableOffset: 6,
      seatOffsetY: 2,
      seatRound: 7,
      seatColor: "#A0A0A0",
    },
    svgProps: {},
  },
};

function calcHalf(val) {
  return val / 2;
}

const svgDataJson = JSON.stringify(svgData);

console.log("svgData", svgData);

console.log("svgData JSON", svgDataJson);

console.log("Build End!!!");
