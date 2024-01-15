import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import { PushSpinner } from "react-spinners-kit";

export default function CodeTest() {
  const [data, setData] = useState([]);
  const [urlCsv, setUrlCsv] = useState(
    "https://raw.githubusercontent.com/UDG-United-Digital-Group/frontend-junior-code-challenge-1/master/Artikel.csv"
  );
  const [isLoading, setIsLoading] = useState(false);

  // https://raw.githubusercontent.com/microsoft/arcticseals/master/data/raw.csv
  // https://raw.githubusercontent.com/UDG-United-Digital-Group/frontend-junior-code-challenge-1/master/Artikel.csv

  const getData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(urlCsv);

      if (!response.data) {
        console.log("could not get data!");
      }
      if (response.status == 200) {
        console.log("success downloading data!");
        console.log("Unparsed Response: ", response);
      }

      Papa.parse(response.data, {
        header: true,
        complete: (result) => {
          setData(result.data);
          console.log(result.data);
        },
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderTableHeaders = () => {
    if (data.length > 0) {
      return Object.keys(data[0]).map((key, index) => (
        <th key={index}>{key}</th>
      ));
    }
  };

  return (
    <div className="data_outer_container">
      <div className="data_inner_container">
        <div className="csv_data_input">
          <h1>CSV Data Display</h1>
          {isLoading ? <PushSpinner color="yellow" /> : ""}
          {/* {data.map((data, index) => (
        <h1 key={index}>{data.Artikelname}</h1>
      ))} */}

          <form type="submit" className="csv_form">
            <input
              className="csv_input"
              type="text"
              placeholder="Enter URL to raw CSV"
              value={urlCsv}
              onChange={(e) => {
                setUrlCsv(e.target.value);
              }}
            ></input>
            <button onClick={getData}>Get Data</button>
          </form>
        </div>
        <table>
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, valueIndex) => (
                  <td key={valueIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
