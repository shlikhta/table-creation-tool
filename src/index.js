import React, { useState } from 'react';
import { render } from 'react-dom';
import './styles.css';
import { TableSeatsTool } from './components/TableSeatsTool';
import { Shape } from './components/Shape';
import { DessertIcon } from 'nexticons/outline';

const App = () => {
  const [circleSeats, setCircleSeats] = useState(8);
  const [squareSeats, setSquareSeats] = useState(4);
  const [rectangleSeats, setRectangleSeats] = useState(5);

  return (
    <div className="app-wrap">
      <div className="table-tool-header">
        <TableSeatsTool
          count={squareSeats}
          setSeats={setSquareSeats}
          title="Seats for Square Table"
          desc="Select the number of seats"
        />

        <TableSeatsTool
          count={circleSeats}
          setSeats={setCircleSeats}
          title="Seats for Circular Table"
          desc="Select the number of seats"
        />
      </div>
      <div className="table-area">
        <div className="table-area__inner">
          <Shape
            type="SquareTable"
            numSeats={squareSeats}
            number={12}
            progress={55}
            icon={<DessertIcon className="dine-in-table__icon" />}
            status="mainCurse"
          />
        </div>
        <div className="table-area__inner">
          <Shape
            type="RoundTable"
            numSeats={circleSeats}
            number={13}
            progress={50}
            icon={<DessertIcon className="dine-in-table__icon" />}
            status="entry"
          />
        </div>
      </div>
      <div className="table-tool-header">
        <TableSeatsTool
          count={rectangleSeats}
          setSeats={setRectangleSeats}
          title="Seats for Rectangle Table"
          desc="Select the number of seats"
        />
        <div />
      </div>
      <div className="table-area">
        <div className="table-area__inner">
          <Shape
            type="RectangularTable"
            number={14}
            numSeats={rectangleSeats}
          />
        </div>
        <div className="table-area__inner" />
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
