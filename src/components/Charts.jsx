import React, { useState, useEffect } from "react";
import { Chart, ArcElement, Title, CategoryScale, Colors } from "chart.js";

import { Doughnut, Bar, PolarArea } from "react-chartjs-2";
import "chart.js/auto";

Chart.register(ArcElement, Title, CategoryScale, Colors);

function Charts({ data }) {
  const [genderCountsdata, setGenderCountsdata] = useState("");
  const [manufacturerCountsdata, setManufacturerCountsdata] = useState("");
  const [materialCountsdata, setMaterialCountsdata] = useState("");

  /* console.log(Object.keys(materialCountsdata)); */

  const productsPerGenderChart = {
    labels: genderCountsdata
      ? Object.keys(genderCountsdata || {})
      : ["Herren", "Damen", "Kinder"], // Feste Labels
    datasets: [
      {
        data: genderCountsdata
          ? Object.keys(genderCountsdata).map(
              (key) => genderCountsdata[key] || 10
            )
          : [10, 10, 10], // Standardwerte, wenn `genderCountsdata` nicht vorhanden ist
        backgroundColor: ["#00d5ff", "#ff61e5", "#fff200", "#ff00ae"],
        borderColor: ["black"],
        borderWidth: 1.5,
        hoverBackgroundColor: ["#ffffff"],
      },
    ],
    options: {},
  };

  const productsPerManufacturerBar = {
    labels: manufacturerCountsdata
      ? Object.keys(manufacturerCountsdata || {})
      : ["Brand 1", "Brand 2", "Brand 3"], // Feste Labels
    datasets: [
      {
        data: manufacturerCountsdata
          ? Object.keys(manufacturerCountsdata).map(
              (key) => manufacturerCountsdata[key] || 10
            )
          : [10, 10, 10], // Standardwerte, wenn `genderCountsdata` nicht vorhanden ist
        backgroundColor: ["#00d5ff", "#ff61e5", "#fff200", "#ff00ae"],
        hoverBackgroundColor: ["#ffffff"],
      },
    ],
    options: {},
  };

  const materialPolarArea = {
    labels: Object.keys(materialCountsdata),
    datasets: [
      {
        label: "My First Dataset",
        data: Object.values(materialCountsdata),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  const countByGender = () => {
    const genderCount = data.reduce((acc, item) => {
      acc[item.Geschlecht] = (acc[item.Geschlecht] || 0) + 1;
      /* console.log(acc); */
      return acc;
    }, {});
    console.log("Count by gender: ", genderCount);
    setGenderCountsdata(genderCount);
  };



  const countByManufacturer = () => {
    // Zählen Sie, wie oft jedes Material vorkommt
    const manufacturerCount = data.reduce((acc, item) => {
      const key = item.Hersteller || 'Unbekannt'; // Behandeln Sie fehlende Materialien als 'Unbekannt'
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  
    // Filtern Sie die Ergebnisse, um nur Materialien mit mehr als 5 Vorkommen zu behalten
    const filteredManufacturerCount = Object.keys(manufacturerCount)
      .filter(key => key && manufacturerCount[key] >= 20) // Nicht-leere Schlüssel und Werte über 10
      .reduce((acc, key) => {
        acc[key] = manufacturerCount[key];
        return acc;
      }, {});
  
    console.log("Count by manufacturer: ", filteredManufacturerCount);
    setManufacturerCountsdata(filteredManufacturerCount);
  };


  const countByMaterial = () => {
    // Zählen Sie, wie oft jedes Material vorkommt
    const materialCount = data.reduce((acc, item) => {
      const key = item.Material || 'Unbekannt'; // Behandeln Sie fehlende Materialien als 'Unbekannt'
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  
    // Filtern Sie die Ergebnisse, um nur Materialien mit mehr als 5 Vorkommen zu behalten
    const filteredMaterialCount = Object.keys(materialCount)
      .filter(key => key && materialCount[key] >= 10) // Nicht-leere Schlüssel und Werte über 10
      .reduce((acc, key) => {
        acc[key] = materialCount[key];
        return acc;
      }, {});
  
    console.log("Count by material: ", filteredMaterialCount);
    setMaterialCountsdata(filteredMaterialCount);
  };

 

  useEffect(() => {
    if (data.length > 0) {
      /* console.log("Data Charts Component: ", data); */
      countByGender();
      countByManufacturer();
      countByMaterial();
    }
  }, [data]);

  return (
    <div>
      <div className="chart_container_outer">
        <div className="chart_container">
          <h2 style={{ textAlign: "center" }}>Products per Gender</h2>
          <Doughnut
            data={productsPerGenderChart}
            options={{
              layout: {
                padding: 0,
              },
              plugins: {
                responsive: true,
                title: {
                  display: false,
                  text: "PRODUCTS PER GENDER",
                },

                legend: {
                  display: true,
                  /* position: "bottom", */

                  labels: {
                    padding: 8,
                  },
                },
              },
            }}
          />
          {/* <p>
          {genderCountsdata &&
            Object.keys(genderCountsdata)[0] +
              ": " +
              Object.values(genderCountsdata)[0]}
        </p>
        <p>
          {genderCountsdata &&
            Object.keys(genderCountsdata)[1] +
              ": " +
              Object.values(genderCountsdata)[1]}
        </p> */}
        </div>

        {/* <div className="polararea_container">
          <h2 style={{ textAlign: "center" }}>Material Used</h2>
          <PolarArea
            data={materialPolarArea}
            options={{
              layout: {
                padding: 0,
              },
              plugins: {
                colors: {
                  forceOverride: true,
                },
                responsive: true,
                title: {
                  display: false,
                  text: "PRODUCTS PER GENDER",
                },
                legend: {
                  display: true,
                  labels: {
                    padding: 0,
                  },
                },
              },
            }}
          />
        </div> */}
        <div className="bar_horizontal_container">
        <h2 style={{ textAlign: "center" }}>Products per Manufacturer</h2>
        <Bar
          data={materialPolarArea}
          options={{
            indexAxis: 'y',
            plugins: {
              responsive: true,
              title: {
                display: false,
                text: "Products per Manufacturer",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
      </div>
      <div className="bar_container">
        <h2 style={{ textAlign: "center" }}>Products per Manufacturer</h2>
        <Bar
          data={productsPerManufacturerBar}
          options={{
            plugins: {
              responsive: true,
              title: {
                display: false,
                text: "Products per Manufacturer",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Charts;
