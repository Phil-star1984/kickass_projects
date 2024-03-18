import React, { useEffect, useState } from "react";
import axios from "axios";

function WeekNine() {
  const [data, setData] = useState("");
  const apiURL = "https://api.artic.edu/api/v1/artworks";

  const getData = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.get(apiURL);
      console.log("Received Data from API: ", result.data.data);
      setData(result.data.data);
    } catch (error) {
      console.error("Data from URL not available", error);
    }
  };

  const downloadData = (e) => {
    /* e.preventDefault(); */
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "download.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  console.log("API data is: ", data);

  return (
    <div>
      <h1>WeekNine</h1>
      <button onClick={getData}> Get data</button>
      {!!data &&
        data.map((item, index) => (
          <h1 key={index}>
            {item.artist_title}, id: {item.artist_id}
          </h1>
        ))}
      {!!data && <button onClick={downloadData}>Download Data</button>}
    </div>
  );
}

export default WeekNine;
