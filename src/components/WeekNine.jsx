import React, { useEffect, useState } from "react";
import axios from "axios";

function WeekNine() {
  const [data, setData] = useState("");
  const apiURL = "http://localhost:8000/scrapelinkedin";

  const getData = async () => {
    /* e.preventDefault(); */

    const newData = {
      name: "Phil",
      ort: "Würzburg",
      straße: "Wiesenweg",
    };

    try {
      const result = await axios.post(apiURL, newData);
      console.log("Received Data from API: ", result);
      /* setData(result.data.data); */
    } catch (error) {
      console.error("Data from URL not available", error);
    }
  };

  const downloadData = () => {
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
