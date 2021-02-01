import React, { useEffect, useState } from "react";

function PreHeader(props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
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
