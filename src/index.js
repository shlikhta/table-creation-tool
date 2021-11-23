import React, { useState } from 'react';
import { render } from 'react-dom';
import './styles.css';
import { TableSeatsTool } from './components/TableSeatsTool';
import { CircleTable } from './components/CircleTable';

const App = () => {
  const [circleSeats, setCircleSeats] = useState(8);

  return (
    <div className="app-wrap">
      <div className="table-tool-header">
        <TableSeatsTool
          count={5}
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
        <div className="table-area__inner"></div>
        <div className="table-area__inner">
          <CircleTable seatsCount={circleSeats} />
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
