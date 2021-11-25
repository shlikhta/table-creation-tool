import React, { useState } from 'react';
import { render } from 'react-dom';
import './styles.css';
import { TableSeatsTool } from './components/TableSeatsTool';
import { DineInTable } from './components/DineInTable';

const App = () => {
  const [circleSeats, setCircleSeats] = useState(8);
  const [squareSeats, setSquareSeats] = useState(4);
  const [rectangleSeats, setRectangleSeats] = useState(4);

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
            style={{ color: '#0a56f1' }}
          />
        </div>
        <div className="table-area__inner">
          <DineInTable
            type="RoundTable"
            numSeats={circleSeats}
            style={{ color: '#b620e0' }}
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
            numSeats={rectangleSeats}
            style={{ color: '#ffffff' }}
          />
        </div>
        <div className="table-area__inner"></div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
