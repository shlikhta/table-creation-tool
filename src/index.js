import React, { useState } from 'react';
import { render } from 'react-dom';
import './styles.css';
import { TableSeatsTool } from './components/TableSeatsTool';
import { RoundTable } from './components/RoundTable';
import { SquareTable } from './components/SquareTable';

const App = () => {
  const [circleSeats, setCircleSeats] = useState(8);
  const [squareSeats, setSquareSeats] = useState(4);

  return (
    <div className="app-wrap">
      <div className="table-tool-header">
        <TableSeatsTool
          count={squareSeats}
          setSeats={setSquareSeats}
          title="Seats for Rectangle Table"
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
          <SquareTable width={320} height={320} seatsCount={squareSeats} />
        </div>
        <div className="table-area__inner">
          <RoundTable seatsCount={circleSeats} />
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
