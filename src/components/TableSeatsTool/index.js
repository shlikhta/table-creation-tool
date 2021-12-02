import React from 'react';
import { InfoIcon, PlusIcon, MinusIcon } from 'nexticons/solid';

export const TableSeatsTool = ({
  id,
  title,
  count,
  setSeats,
  showEnds = false,
  endsPosition,
  setEndsPosition,
  desc,
  ...props
}) => {
  return (
    <div className="table-seats-tool" {...props}>
      {title && <h2 className="table-seats-tool__title">{title}</h2>}
      <div className="table-seats-tool__counter">
        <button
          className="table-seats-tool__button"
          onClick={() => setSeats(count > 0 ? count - 1 : 0)}
        >
          <MinusIcon width={18} strokeWidth={2} />
        </button>
        <div className="table-seats-tool__count">{count}</div>
        <button
          className="table-seats-tool__button"
          onClick={() => setSeats(count < 30 ? count + 1 : 30)}
        >
          <PlusIcon width={18} strokeWidth={2} />
        </button>
      </div>
      {desc && (
        <div className="table-seats-tool__info">
          <InfoIcon className="table-seats-tool__info-icon" />
          <p>{desc}</p>
        </div>
      )}
      {showEnds && (
        <label className="table-seats-tool__ends">
          <input
            type="checkbox"
            name={`ends-status-${id}`}
            className="table-seats-tool__checkbox"
            checked={endsPosition}
            onChange={() => setEndsPosition(!endsPosition)}
          />
          <p>Seats on table ends</p>
        </label>
      )}
    </div>
  );
};
