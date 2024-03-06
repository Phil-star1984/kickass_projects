import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importieren des Leaflet-CSS
import { leerstandWuerzburg } from "../assets/leerstandData.js";

function WeekSeven() {
  const [leerstandArray, setLeerstandArray] = useState([]);

  useEffect(() => {
    async function fetchGeodata(url) {
      const result = await axios.get(url);
      /* console.log(result); */
      return [+result.data[0].lat, +result.data[0].lon];
    }

    async function fetchAllGeodata() {
      for (const item of leerstandWuerzburg) {
        const URL = `https://nominatim.openstreetmap.org/search?format=json&limit=1&street=${encodeURIComponent(
          item.hausnummer
        )}+${encodeURIComponent(item.straße)}&city=${encodeURIComponent(
          item.ort
        )}`;
        const latLong = await fetchGeodata(URL);
        setLeerstandArray((prev) => {
          const newArray = [...prev, { ...item, latLong }];
          console.log(newArray);
          return newArray;
        });

        await new Promise((resolve) => setTimeout(resolve, 1000)); // 2 Sekunden Verzögerung, um Rate Limiting zu respektieren
      }
    }

    fetchAllGeodata();
  }, []);

  return (
    <div className="weekseven_container_outer">
      <h1>Leerstand Wü || Web Dev Map || Find-a-Job</h1>
      <MapContainer
        center={[49.7942, 9.931]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "600px", width: "900px", borderRadius: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[49.791306, 9.953355]}>
          <Popup>
            New Job: Web Developer <br /> Würzburg
          </Popup>
        </Marker> */}
        {/* {jobList.map((item, index) => (
          <Marker position={item.latLong} key={index}>
            <Popup>
              Job: {item.titel}
              <br /> {item.ort}
            </Popup>
          </Marker>
        ))} */}

        {leerstandArray.map((item, index) => (
          <Marker position={item.latLong} key={index}>
            <Popup>
              Laden: {item.name}
              <br /> Straße: {item.straße} {item.hausnummer} <br /> Geschlossen
              am: {item.schließungAm}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default WeekSeven;
