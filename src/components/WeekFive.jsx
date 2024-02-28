import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function WeekFive() {
  const [showSquare, setShowSquare] = useState(false);
  const [data, setData] = useState(null);
  const myInterval = useRef(null); // Verwendung von useRef, um den Interval-Handle zu speichern

  const handleClick = () => {
    if (myInterval.current) {
      clearInterval(myInterval.current); // Stoppt den vorherigen Intervall, falls vorhanden
    }

    window.open(
      `mailto:test@example.com?subject=hello there you&body=let's talk you crazy guy`
    );
    myInterval.current = setInterval(() => {
      setShowSquare((prevShowSquare) => !prevShowSquare);
    }, 1000); // 5000 für ein Intervall von 5 Sekunden
  };

  const stopInterval = () => {
    clearInterval(myInterval.current); // Verwendung von .current, um auf den gespeicherten Wert zuzugreifen
    myInterval.current = null; // Setzen von myInterval.current zurück auf null nach dem Stoppen des Intervals
  };

  const getData = async () => {
    try {
      const result = await axios.get("https://api.publicapis.org/entries");
      if (result.status === 200) {
        console.log("Hurray, fetching data successful!");
      }
      console.log(result.data.entries);
      console.log(result.data.entries.length);
      //.API
      setData(result.data.entries);
      const filteredResult = result.data.entries.filter((item) => {
        return item.Link.toLowerCase().includes("api");
      });
      console.log(filteredResult);
    } catch (error) {
      console.error("Fetching data not successful", error);
    }
  };

  useEffect(() => {
    return () => {
      if (myInterval.current) {
        clearInterval(myInterval.current);
      }
    };
  }, []); // Leeres Abhängigkeitsarray, um die Bereinigungsfunktion nur beim Unmount auszuführen

  return (
    <div className="weekfive_outer_container">
      <div className="weekfive_inner_container">
        <h1>WeekFive</h1>
        <button onClick={handleClick}>Start Interval</button>
        <button onClick={stopInterval}>Stop Interval</button>
        {!!showSquare && <div className="weekfive_square">DONE</div>}
        {!!data && (
          <div>
            {data.map((item, index) => (
              <Link to={item.Link} key={index} target="_blank">
                <h1>{item.Link}</h1>
              </Link>
            ))}
          </div>
        )}
        <button onClick={getData}>Fetch Data</button>
      </div>
    </div>
  );
}

export default WeekFive;
