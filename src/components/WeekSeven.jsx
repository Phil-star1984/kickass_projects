import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importieren des Leaflet-CSS
import { leerstandWuerzburg } from "../assets/leerstandData.js";

function WeekSeven() {
  const [leerstandArray, setLeerstandArray] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    straße: "",
    hausnummer: "",
    ort: "",
  });
  const gistURL =
    "https://gist.githubusercontent.com/Phil-star1984/0f382c4b79d4fb05a574c78813bf7d7b/raw/48e5c6343d932e03257b39c90f525cd03faaa59a/leerstandWuerzburgData.json";

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
        const result = await axios(url);
        /* const parsedData = JSON.parse(result.data);
        console.log(parsedData); */
        console.log("Data from Gist: ", result.data);
        setLeerstandArray(result.data);
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

        setLeerstandArray((prev) => [...prev, newLeerstand]);
      } catch (error) {
        console.error("Konvertieren zu Geodaten nicht erfolgreich", error);
      }
    }
    convertToGeodata();

    /* console.log(formData); */
    console.log("Aktualisierte Daten: ", leerstandArray);
    setFormData({ name: "", straße: "", hausnummer: "", ort: "" });
  };

  return (
    <div className="weekseven_container_outer">
      <h1>Leerstandsmelder Würzburg</h1>

      {/* <h1>Web Dev Map || Find-a-Job</h1> */}
      <MapContainer
        center={[49.7942, 9.931]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "500px", borderRadius: "10px" }}
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
      <form onSubmit={addLeerstand}>
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
        <button>Leerstand eintragen</button>
      </form>
      {!!formData && (
        <div>
          <p>{formData.name}</p>
          <p>{formData.straße}</p>
          <p>{formData.hausnummer}</p>
        </div>
      )}
      {leerstandArray.length > 0 && (
        <button onClick={downloadLeerstandListe}>Download list</button>
      )}
    </div>
  );
}

export default WeekSeven;
