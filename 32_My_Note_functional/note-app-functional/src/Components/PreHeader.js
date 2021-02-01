import React, { useEffect, useState } from "react";

function PreHeader(props) {
  const [time, setTime] = useState(new Date());
  let tick = () => setTime(new Date());

  useEffect(() => {
    setInterval(() => tick(), 1000);
    return () => {
      console.log("Component cleanup");
      clearInterval(tick);
    };
  }, []);
  return (
    <div className="note-pre-header">
      <b>
        <p>{time.toLocaleTimeString()}</p>
      </b>
    </div>
  );
}

export default PreHeader;
