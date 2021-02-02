import React, { useEffect, useState } from "react";

function PreHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
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
