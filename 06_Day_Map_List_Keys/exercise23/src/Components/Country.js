const Country = ({ countries: { country, population }, percent }) => {
  return (
    <div className="Country">
      <span style={{ flex: 2 }}>{country}</span>
      <div style={{ flex: 8 }}>
        <div
          style={{
            width: percent(),
            background: "red",
            padding: "20px",
            margin: "20px",
          }}
        ></div>
      </div>
      <span style={{ flex: 2 }}>{population}</span>
      <br></br>
    </div>
  );
};
export default Country;
