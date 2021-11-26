import React, { useState } from 'react';
import { render } from 'react-dom';
import './styles.css';
import { TableSeatsTool } from './components/TableSeatsTool';
import { DineInTable } from './components/DineInTable';
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
          <DineInTable
            type="SquareTable"
            numSeats={squareSeats}
            number="test test test test"
            progress={55}
            icon={<DessertIcon className="dine-in-table__icon" />}
            tableColor="#0a56f1"
          />
        </div>
        <div className="table-area__inner">
          <DineInTable
            type="RoundTable"
            numSeats={circleSeats}
            number="test test test test"
            progress={50}
            icon={<DessertIcon className="dine-in-table__icon" />}
            tableColor="#b620e0"
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
          <DineInTable
            type="RectangularTable"
            number="test test test test"
            showProgress={false}
            numSeats={rectangleSeats}
            textTheme="dark"
            tableColor="#ffffff"
          />
        </div>
        <div className="table-area__inner" />
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
