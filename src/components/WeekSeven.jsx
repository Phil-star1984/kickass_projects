import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importieren des Leaflet-CSS

function WeekSeven() {
  /* const jobList = [
    {
      titel: "WordPress-Entwickler",
      ort: "Gerolzhofen",
      latLong: [49.899879, 10.35085],
    },
    {
      titel: "Web Programmierer",
      ort: "Muhr am See",
      latLong: [49.152569, 10.723],
    },
    {
      titel: "Web-Frontend Entwickler Angular",
      ort: "Fürth",
      latLong: [49.477116, 10.988667],
    },
    {
      titel: "Web Dev Arnstein",
      ort: "Fürth",
      latLong: [49.976772, 9.971179],
    },
    {
      titel: "Developer Web & Frontend",
      ort: "Frankfurt am Main",
      latLong: [50.110924, 8.682127],
    },
  ]; */

  const leerstandWuerzburg = [
    {
      name: "Café Cosmo",
      ort: "Würzburg",
      straße: "Peterstraße",
      hausnummer: "12",
      latLong: [49.7931, 9.928],
      schließungAm: "14. Januar 2022",
    },
    {
      name: "Yves Rocher",
      ort: "Würzburg",
      straße: "Juliuspromenade",
      hausnummer: "64",
      latLong: [49.7975, 9.9321],
      schließungAm: "22. Januar 2022",
    },
    {
      name: "Da Claudio",
      ort: "Würzburg",
      straße: "Rottendorfer Straße",
      hausnummer: "69",
      latLong: [49.7813, 10.0186],
      schließungAm: "01. Februar 2022",
    },
    {
      name: "Unicafé",
      ort: "Würzburg",
      straße: "Neubaustraße",
      hausnummer: "2",
      latLong: [49.7942, 9.931],
      schließungAm: "Ende Februar 2022",
    },
    {
      name: "Waldschänke Dornheim",
      ort: "Würzburg",
      straße: "Talaveraplatz",
      hausnummer: "",
      latLong: [49.7947, 9.9468],
      schließungAm: "Anfang März 2022",
    },
    {
      name: "Muck",
      ort: "Würzburg",
      straße: "Sanderstraße",
      hausnummer: "29",
      latLong: [49.7911, 9.9318],
      schließungAm: "Anfang März 2022",
    },
    {
      name: "Johanniterbäck",
      ort: "Würzburg",
      straße: "Johanniterplatz",
      hausnummer: "3",
      latLong: [49.7928, 9.9356],
      schließungAm: "12. März 2022",
    },
    {
      name: "Zeitzeichen Shoes",
      ort: "Würzburg",
      straße: "Eichhornstraße",
      hausnummer: "26",
      latLong: [49.7926, 9.9343],
      schließungAm: "26. März 2022",
    },
    {
      name: "Chicken Inn",
      ort: "Würzburg",
      straße: "Theaterstraße",
      hausnummer: "4",
      latLong: [49.7952, 9.9301],
      schließungAm: "April 2022",
    },
    {
      name: "Massimo - pasta, vino, caffè",
      ort: "Würzburg",
      straße: "Zeller Straße",
      hausnummer: "10",
      latLong: [49.7917, 9.9316],
      schließungAm: "01. April 2022",
    },
    {
      name: "Café Vue",
      ort: "Würzburg",
      straße: "Felix-Freudenberger-Platz",
      hausnummer: "",
      latLong: [49.7914, 9.9291],
      schließungAm: "Anfang Mai 2022",
    },
    {
      name: "Restaurant Schiffbäuerin",
      ort: "Würzburg",
      straße: "Katzengasse",
      hausnummer: "7",
      latLong: [49.7947, 9.9264],
      schließungAm: "21. Mai 2022",
    },
    {
      name: "Martinellis „CaffèWelt“",
      ort: "Würzburg",
      straße: "Semmelstraße",
      hausnummer: "19",
      latLong: [49.7921, 9.9324],
      schließungAm: "30. Mai 2022",
    },
    {
      name: "Briefmarken & Münzen Andrea Fischer",
      ort: "Würzburg",
      straße: "Dominikanergasse",
      hausnummer: "9",
      latLong: [49.794, 9.9298],
      schließungAm: "Ende Mai 2022",
    },
    {
      name: "Die Pampelmuse",
      ort: "Würzburg",
      straße: "Augustinerstraße",
      hausnummer: "8",
      latLong: [49.7934, 9.9312],
      schließungAm: "30. Juni 2022",
    },
  ];

  return (
    <div className="weekseven_container_outer">
      <h1>Leerstand Wü || Web Dev Map || Find-a-Job</h1>
      <MapContainer
        center={[49.7942, 9.931]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "600px", width: "900px" }}
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

        {leerstandWuerzburg.map((item, index) => (
          <Marker position={item.latLong} key={index}>
            <Popup>
              Laden: {item.name}
              <br /> Straße: {item.straße} <br /> Geschlossen am:{" "}
              {item.schließungAm}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default WeekSeven;
