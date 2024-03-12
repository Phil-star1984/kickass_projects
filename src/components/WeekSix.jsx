import React, { useState } from "react";
import axios from "axios";
import { ImpulseSpinner } from "react-spinners-kit";

function WeekSix() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [searchType, setSearchType] = useState("web-links");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    /* console.log("Scraping the site:", url);
    console.log("Searching for: ", searchType); */

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/scrape?url=${encodeURIComponent(url)}&searchType=${encodeURIComponent(
          searchType
        )}`
      );

      /* console.log(response.data);
      console.log(import.meta.env.VITE_BACKEND_BASE_URL); */

      /* const filteredData = response.data.filter((item) => {
        const result = item.includes("http") && item.length > 5;
        return result;
      });
      console.log(filteredData); */
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Could not scrape url", error);
    }
  };

  const downloadData = (e) => {
    e.preventDefault();
    // data soll in einer file mit name "data.json" gespeichert werden
    const jsonData = JSON.stringify(data);
    const dataArray = new Blob([jsonData], {
      type: "application/json",
    });
    const dataURL = URL.createObjectURL(dataArray);
    /* console.log("Data URL", dataURL); */
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="weeksix_container_outer">
      <h1>Web Scraper</h1>

      <form onSubmit={handleSubmit}>
        <label>Enter URL to scrape here</label>
        <input
          type="text"
          name="url_input"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <label htmlFor="searchtypes">Search for</label>
        <select
          id="searchtypes"
          name="searchtype"
          onChange={(e) => {
            setSearchType(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="web-links">href Links</option>
          <option value="h1-headlines">h1 Headlines</option>
          <option value="p-text">p Text</option>
        </select>
        <button className="scrape_button" type="submit">
          Scrape Site
        </button>
        {!!data && <button onClick={downloadData}>Download Data</button>}
      </form>

      {!!data && searchType === "web-links" ? (
        <div className="weeksix_result_container">
          {!!isLoading && <ImpulseSpinner />}
          <p>Results: {data.length}</p>
          {data.map((item, index) => (
            <a
              key={index}
              href={item}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1>{item}</h1>
            </a>
          ))}
        </div>
      ) : (
        <div className="weeksix_result_container">
          {!!isLoading && <ImpulseSpinner size={60} />}
          <p>Results: {data.length}</p>
          {data.map((item, index) => (
            <h1 key={index}>{item}</h1>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeekSix;
