import React, { useState, useEffect } from "react";
import "./SeatMap.css";
const HALL1ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const HALL1COLS = 10;
const HALL2ROWS = ["A", "B", "C", "D", "E", "F"];
const HALL2COLS = 8;
const halls = {
  1: {
    row: ["A", "B", "C", "D", "E", "F", "G", "H"],
    col: 10,
    label: "Hall 1",
  },
  2: { row: ["A", "B", "C", "D", "E", "F"], col: 8, label: "Hall 2" },
};

const SeatMap = ({
  bSeats = [],
  price = 0,
  hallNum = 1,
  maxSeats = 8,
  onSelChange,
}) => {
  const [sSeats, setSSeats] = useState([]);
  const Hall = halls[hallNum] || halls[1];

  useEffect(() => {
    onSelChange?.(sSeats, sSeats.length * price);
  }, [sSeats]);

  // selc seats
  const toggleSeat = (seatId) => {
    //lw seat da mahgooz mat3ml4 haga
    if (bSeats.includes(seatId)) return;
    //p 4ayla el seats elly 2o5terat mn el user
    setSSeats((p) => {
      const isSelc = p.includes(seatId); //el chair da ana a5tarto
      if (isSelc) {
        return p.filter((s) => s !== seatId);
        // falter b2 w seb elly m4 2o5ter btrag3 arr b kol el seats m3ada el seat elly m4 dosna 3leh
      }
      if (p.length >= maxSeats) return p;
      return [...p, seatId]; // rag3 kolo
    });
  };

  const getSeatState = (seatId) => {
    if (bSeats.includes(seatId)) return "booked";
    if (sSeats.includes(seatId)) return "selected";
    else return "free";
  };

  return (
    <>
      <div className="seat-map">
        <div className="seat-map__screen-wrap">
          <div className="seat-map__screen"></div>
          <span className="seat-map__screen-label">SCREEN - {Hall.label}</span>
        </div>

        <div className="seat-map__rows">
          {Hall.row.map((r) => (
            <div className="seat-map__row" key={r}>
              <span className="seat-map__row-label">{r}</span>
              <div className="seat-map__seats">
                {Array.from({ length: Hall.col }, (_, i) => {
                  const seatId = `${r}${i + 1}`;
                  const state = getSeatState(seatId);
                  return (
                    <button
                      key={seatId}
                      type="button"
                      className={`seat seat--${state}`}
                      disabled={state === "booked"}
                      onClick={() => toggleSeat(seatId)}
                      aria-label={`Seat ${seatId} — ${state}`}
                      title={seatId}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <span className="seat-map__row-label">{r}</span>
            </div>
          ))}
        </div>
        <div className="seat-map__legend">
          <span>
            <i className="seat seat--available seat--mini"></i> Available
          </span>
          <span>
            <i className="seat seat--selected seat--mini"></i> Selected
          </span>
          <span>
            <i className="seat seat--booked seat--mini"></i> Booked
          </span>
        </div>

        {
          sSeats.length >= maxSeats && (
            <p className="seat-map__limit-note">
              You can select up to {maxSeats} seats per booking.
            </p>
              )
        }
      </div>
    </>
  );
};

export default SeatMap;
