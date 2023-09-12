import React, { useState, useEffect } from "react";
import Home from "../home";
import { io } from "socket.io-client";
const URL = "http://localhost:8000";
export const socket = io(URL);
const RideList = () => {
  const [rideRequests, setRideRequest] = useState([]);
  const [activeRide, setActiveRide] = useState(null);

  function handleSetActive(i) {
    // if we click on currently active ride again, do nothing! just return.
    if (activeRide === i) return;
    setActiveRide(i);
  }

  useEffect(() => {
    socket.on("rideRequests", (rideRequests) => {
      setRideRequest(rideRequests);
    });
  });
  return (
    <>
      <input placeholder="search" />
      {rideRequests.length > 0 ? (
        <div>
          {rideRequests.map((item, i) => {
            return (
              <div
                key={i}
                style={{
                  backgroundColor: activeRide === i ? "whitesmoke" : "aqua",
                  padding: "10px",
                  margin: "7px",
                  cursor: "pointer",
                }}
                onClick={() => handleSetActive(i)}
              >
                Price: {item.price}
                Distance: {item.distance}
                {item.pickUpAddress}-----{item.destinationAddress}
              </div>
            );
          })}
        </div>
      ) : (
        "No rides available"
      )}
    </>
  );
};
function index() {
  return (
    <div style={{ display: "flex" }}>
      <RideList />
      <Home isRider={true} />
    </div>
  );
}

export default index;
