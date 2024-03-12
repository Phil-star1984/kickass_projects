import React, { useEffect, useState } from "react";
import axios from "axios";
import iconMarker from "leaflet/dist/images/marker-icon.png";
/* import iconRetina from "leaflet/dist/images/marker-icon-2x.png"; */
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importieren des Leaflet-CSS



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
  const icon = L.icon({
    iconRetinaUrl: iconMarker,
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
  });

  //Achtung: Token nur bis 15.03.2024 gültig!
  const TOKEN = import.meta.env.VITE_GIST;
  const GIST_ID = "0f382c4b79d4fb05a574c78813bf7d7b";
  const GIST_FILENAME = "leerstandWuerzburgData.json";
  const gistURL = `https://api.github.com/gists/${GIST_ID}`;

  useEffect(() => {
    async function getGistData(url) {
      try {
        const result = await axios.get(url);
        const gist = result.data;
        const gistParsed = JSON.parse(gist.files[GIST_FILENAME].content);
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
        <Circle center={center} radius={800} />
        {/* <CircleMarker
          center={[51.51, -0.12]}
          pathOptions={redOptions}
          radius={20}
        ></CircleMarker> */}

        {leerstandArray.map((item, index) => (
          <Marker position={item.latLong} key={index} icon={icon}>
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
