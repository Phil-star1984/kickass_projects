import React, { useEffect, useState } from "react";
import axios from "axios";
/* import dotenv from "dotenv"; */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importieren des Leaflet-CSS
/* import { leerstandWuerzburg } from "../assets/leerstandData.js"; */
import { Icon } from "leaflet";

function WeekSeven() {
  const [leerstandArray, setLeerstandArray] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    straße: "",
    hausnummer: "",
    ort: "",
    schließungAm: "",
  });

  //Options für die Leaflet Map
  const center = [49.7942, 9.931];
  const purpleOptions = { color: "purple" };
  const redOptions = { color: "red" };
  const legalIcon = new Icon({
    iconUrl:
      "http://www.phil-splash.de/wp-content/uploads/2015/12/themillionpainter_logo.jpg",
    iconSize: [35, 18], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  //Achtung: Token nur bis 15.03.2024 gültig!
  const TOKEN = import.meta.env.VITE_GIST;
  const GIST_ID = "0f382c4b79d4fb05a574c78813bf7d7b";
  const GIST_FILENAME = "leerstandWuerzburgData.json";
  const gistURL = `https://api.github.com/gists/${GIST_ID}`;

  /* useEffect(() => {
    async function fetchGeodata(url) {
      const result = await axios.get(url);
      return [+result.data[0].lat, +result.data[0].lon];
    }

    async function fetchAllGeodata() {
      const tempArray = []; // Temporäres Array zum Sammeln der Ergebnisse
      for (const item of leerstandWuerzburg) {
        const URL = `https://nominatim.openstreetmap.org/search?format=json&limit=1&street=${encodeURIComponent(
          item.hausnummer
        )}+${encodeURIComponent(item.straße)}&city=${encodeURIComponent(
          item.ort
        )}`;
        const latLong = await fetchGeodata(URL);
        tempArray.push({ ...item, latLong });
        console.log("Zwischenstand leerstandArray:", tempArray);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Verzögerung zwischen den Anfragen
      }
      setLeerstandArray(tempArray); // Aktualisiere den State einmalig am Ende
    }

    function saveAllGeodata() {
      console.log("File Saver");
      // Speichern der Daten von leerstandArray in einer Datei "leerstandWuerzburgData.js" unter "/src/assets"
    }

    fetchAllGeodata();
    saveAllGeodata();
  }, []); */

  useEffect(() => {
    async function getGistData(url) {
      try {
        const result = await axios.get(url);
        const gist = result.data;
        const gistParsed = JSON.parse(gist.files[GIST_FILENAME].content);
        console.log("Data from Gist: ", gistParsed);
        setLeerstandArray(gistParsed);
      } catch (error) {
        console.error("Error fetching from Gist", error);
      }
    }
    getGistData(gistURL);
  }, []);

  const downloadLeerstandListe = (e) => {
    e.preventDefault();
    const blob = new Blob([JSON.stringify(leerstandArray)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leerstandListe.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addLeerstand = (e) => {
    e.preventDefault();

    //Addressdaten in Geodaten umwandeln mit nominatim API
    async function convertToGeodata() {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&street=${encodeURIComponent(
        formData.hausnummer
      )}+${encodeURIComponent(formData.straße)}&city=${encodeURIComponent(
        formData.ort
      )}`;
      try {
        const result = await axios.get(url);
        /* console.log("Geodaten von neuem Objekt: ", [
          +result.data[0].lat,
          +result.data[0].lon,
        ]); */
        const geoData = [+result.data[0].lat, +result.data[0].lon];

        // aus formData und den gefetchten Geodaten zu dem neuen Leerstandsobjekt soll ein neues Objekt entstehen, das ich an den leerstandArray anhängen möchte
        const newLeerstand = { ...formData, latLong: geoData };

        setLeerstandArray((prev) => {
          const updatedArray = [...prev, newLeerstand];
          setData(updatedArray); // Update the Gist after adding new data to leerstandArray
          return updatedArray;
        });
      } catch (error) {
        console.error("Konvertieren zu Geodaten nicht erfolgreich", error);
      }
    }

    /* async function setData(data) {
      const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          files: {
            [GIST_FILENAME]: {
              content: JSON.stringify(data),
            },
          },
        }),
      });
      console.log(req);
      if (req.status === 200) {
        alert("Leerstand erfolgreich eingetragen");
      }

      return req.json();
    } */

    async function setData(data) {
      try {
        const req = await axios.patch(
          `https://api.github.com/gists/${GIST_ID}`,
          {
            files: {
              [GIST_FILENAME]: {
                content: JSON.stringify(data),
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );

        console.log(req);
        if (req.status === 200) {
          alert("Leerstand erfolgreich eingetragen");
        }
      } catch (error) {
        console.error(
          "Fehler: Daten in Gist speichern nicht erfolgreich",
          error
        );
      }
    }

    convertToGeodata();

    /* console.log(formData); */
    console.log("Aktualisierte Daten: ", leerstandArray);
    setFormData({
      name: "",
      straße: "",
      hausnummer: "",
      ort: "",
      schließungAm: "",
    });
  };

  return (
    <div className="weekseven_container_outer">
      <h1>Leerstandsmelder Würzburg</h1>

      {/* <h1>Web Dev Map || Find-a-Job</h1> */}
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "500px", borderRadius: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={center} pathOptions={purpleOptions} radius={800} />
        <CircleMarker
          center={[51.51, -0.12]}
          pathOptions={redOptions}
          radius={20}
        ></CircleMarker>
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
          <Marker position={item.latLong} key={index} icon={legalIcon}>
            <Popup>
              Geschäft: {item.name}
              <br /> Straße: {item.straße} {item.hausnummer} <br /> Geschlossen
              am: {item.schließungAm} <br />
              Stadt: {item.ort}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="weekseven_input_container">
        <form onSubmit={addLeerstand} className="weekseven_leerstand_input">
          <label htmlFor="titel">Name/Bezeichnung</label>
          <input
            type="text"
            name="name"
            placeholder="Leerstand Name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="straße">Straße</label>
          <input
            type="text"
            name="straße"
            value={formData.straße}
            placeholder="Straßenname eingeben"
            onChange={handleChange}
          />
          <label htmlFor="hausnummer">Hausnummer</label>
          <input
            type="text"
            name="hausnummer"
            value={formData.hausnummer}
            placeholder="Hausnummer eintragen"
            onChange={handleChange}
          />
          <label htmlFor="ort">Ort</label>
          <input
            type="text"
            name="ort"
            value={formData.ort}
            placeholder="Ort eintragen"
            onChange={handleChange}
          />
          <label htmlFor="ort">Datum Schließung</label>
          <input
            type="text"
            name="schließungAm"
            value={formData.schließungAm}
            onChange={handleChange}
            placeholder="Datum Schließung eintragen (optional)"
          />
          <button>Leerstand eintragen</button>
        </form>
        <div className="weekseven_leerstand_display">
          {!!formData && (
            <div>
              <p>Neuer Leerstand:</p>
              <h2>{formData.name}</h2>
              <p>
                {formData.straße} {formData.hausnummer}
              </p>

              <p>{formData.ort}</p>
              <p>{formData.schließungAm}</p>
            </div>
          )}
        </div>
      </div>
      {leerstandArray.length > 0 && (
        <button onClick={downloadLeerstandListe}>Download list</button>
      )}
    </div>
  );
}

export default WeekSeven;
