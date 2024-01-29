import React, { useState, useEffect } from "react";
import { Chart, ArcElement, Title, CategoryScale, Colors } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";

Chart.register(ArcElement, Title, CategoryScale, Colors);

function Charts({ data }) {
  const [genderCountsdata, setGenderCountsdata] = useState("");
  const [manufacturerCountsdata, setManufacturerCountsdata] = useState("");
  const [materialCountsdata, setMaterialCountsdata] = useState("");

  /* console.log(Object.keys(materialCountsdata)); */

  // handle data for chart js package
  const productsPerGenderChart = {
    labels: genderCountsdata
      ? Object.keys(genderCountsdata)
      : ["Herren", "Damen", "Kinder"], // fallback labels
    datasets: [
      {
        data: genderCountsdata ? Object.values(genderCountsdata) : [10, 10, 10], // fallback values if no `genderCountsdata` available
        backgroundColor: [
          "#1a535c",
          "#4ecdc4",
          "#f7fff7",
          "#ff6b6b",
          "#ffe66d",
        ],
        borderColor: ["black"],
        borderWidth: 1.5,
        /* hoverBackgroundColor: ["#ffffff"], */
      },
    ],
    options: {},
  };

  const productsPerManufacturerBar = {
    labels: manufacturerCountsdata
      ? Object.keys(manufacturerCountsdata)
      : ["Brand 1", "Brand 2", "Brand 3"], // fallback labels
    datasets: [
      {
        data: manufacturerCountsdata
          ? Object.values(manufacturerCountsdata)
          : [10, 10, 10], // fallback values if no `manufacturerCountsdata` available
        backgroundColor: [
          "#1a535c",
          "#4ecdc4",
          "#f7fff7",
          "#ff6b6b",
          "#ffe66d",
        ],
        /* hoverBackgroundColor: ["#ffffff"], */
      },
    ],
    options: {},
  };

  const materialsPerProductBar = {
    labels: materialCountsdata
      ? Object.keys(materialCountsdata)
      : ["Material 1", "Material 2", "Material 3"],
    datasets: [
      {
        label: "Products per Material",
        data: materialCountsdata
          ? Object.values(materialCountsdata)
          : [10, 10, 10],
        backgroundColor: [
          "#1a535c",
          "#4ecdc4",
          "#f7fff7",
          "#ff6b6b",
          "#ffe66d",
        ],
        /* backgroundColor: [
          "#ffb2e6",
          "#d972ff",
          "#8447ff",
          "#8cffda",
          "#ffffe8",
        ], */
        /* backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ], */
      },
    ],
  };

  // create gender, manufacturer and material charts
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
    // count how many products per manufacturerl exist in csv
    const manufacturerCount = data.reduce((acc, item) => {
      const key = item.Hersteller || "Unbekannt";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // for aesthetic reasons: filter for manufacturers with count >= 20
    const filteredManufacturerCount = Object.keys(manufacturerCount)
      .filter((key) => key && manufacturerCount[key] >= 20)
      .reduce((acc, key) => {
        acc[key] = manufacturerCount[key];
        return acc;
      }, {});

    console.log("Count by manufacturer: ", filteredManufacturerCount);
    setManufacturerCountsdata(filteredManufacturerCount);
  };

  const countByMaterial = () => {
    // count how many products per material exist in csv
    const materialCount = data.reduce((acc, item) => {
      const key = item.Material || "Unbekannt";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // for aesthetic reasons: filter for materials with count >= 10
    const filteredMaterialCount = Object.keys(materialCount)
      .filter((key) => key && materialCount[key] >= 10)
      .reduce((acc, key) => {
        acc[key] = materialCount[key];
        return acc;
      }, {});

    console.log("Count by material: ", filteredMaterialCount);
    setMaterialCountsdata(filteredMaterialCount);
  };

  // update all charts on data change
  useEffect(() => {
    if (data.length > 0) {
      /* console.log("Data charts component: ", data); */
      countByGender();
      countByManufacturer();
      countByMaterial();
    }
  }, [data]);

  return (
    <div className="chart_container_mostouter">
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
        <h2 style={{ textAlign: "center" }}>Products per Material</h2>
        <Bar
          data={materialsPerProductBar}
          options={{
            indexAxis: "y",
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
