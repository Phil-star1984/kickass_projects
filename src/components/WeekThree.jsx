import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import { PushSpinner } from "react-spinners-kit";
import Charts from "./Charts.jsx";
import Footer from "./Footer.jsx";

export default function WeekThree() {
  const [data, setData] = useState([]);
  const [urlCsv, setUrlCsv] = useState(
    "https://raw.githubusercontent.com/UDG-United-Digital-Group/frontend-junior-code-challenge-1/master/Artikel.csv"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [articleName, setArticleName] = useState("");
  const [mainArticleNo, setMainArticleNo] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [description, setDescription] = useState("");
  const [materialInformation, setMaterialInformation] = useState("");
  const [gender, setGender] = useState("");
  const [productType, setProductType] = useState("");
  const [sleeves, setSleeves] = useState("");
  const [leg, setLeg] = useState("");
  const [collar, setCollar] = useState("");
  const [manufacturing, setManufacturing] = useState("");
  const [pocketStyle, setPocketStyle] = useState("");
  const [grammar, setGrammar] = useState("");
  const [material, setMaterial] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [imageName, setImageName] = useState("");

  // https://raw.githubusercontent.com/microsoft/arcticseals/master/data/raw.csv
  // https://raw.githubusercontent.com/UDG-United-Digital-Group/frontend-junior-code-challenge-1/master/Artikel.csv
  // Example: https://gist.githubusercontent.com/rnirmal/e01acfdaf54a6f9b24e91ba4cae63518/raw/6b589a5c5a851711e20c5eb28f9d54742d1fe2dc/datasets.csv
  // Example Titanic Data: https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv

  const getData = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.get(urlCsv);

      if (!response.data) {
        throw new Error("could not get data!");
      }
      /* if (response.status == 200) {
        console.log("success downloading data!");
        console.log("Unparsed Response: ", response);
      } */

      Papa.parse(response.data, {
        header: true,
        complete: (result) => {
          setData(result.data);

          /* console.log(result.data); */
        },
        error: (error) => {
          throw new Error("error parsing the csv data", error);
        },
      });

      setSuccessMessage("loading data successfully");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("error parsing the data: ", error);
      setErrorMessage(error.message || "unknown error loading data");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const addData = (e) => {
    e.preventDefault();
    setData((prev) => [
      ...prev,
      {
        Hauptartikelnr: mainArticleNo,
        Artikelname: articleName,
        Hersteller: manufacturer,
        Beschreibung: description,
        Materialangaben: materialInformation,
        Geschlecht: gender,
        Produktart: productType,
        Ärmel: sleeves,
        Bein: leg,
        Kragen: collar,
        Herstellung: manufacturing,
        Taschenart: pocketStyle,
        Grammatur: grammar,
        Material: material,
        Ursprungsland: countryOfOrigin,
        Bildname: imageName,
      },
    ]);
  };

  /* if there is data in local storage use it, 
  if not get data from public csv/github raw */

  useEffect(() => {
    const savedData = localStorage.getItem("csv_data");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      getData();
    }
  }, []);

  // save (manipulated) data in local storage
  useEffect(() => {
    localStorage.setItem("csv_data", JSON.stringify(data));
    /* console.log("actual data: ", data); */
  }, [data]);

  const renderMessage = () => {
    if (successMessage) {
      return <div className="csv_display_message">{successMessage}</div>;
    } else if (errorMessage) {
      return <div className="csv_display_message">{errorMessage}</div>;
    }

    return null;
  };

  //create table out of headers and table body
  const renderTableHeaders = () => {
    /* console.log(Object.keys(data[0])); */
    if (data.length > 0) {
      return Object.keys(data[0]).map((key, index) => (
        <th key={index}>{key}</th>
      ));
    }
  };

  // make rows editable with edit button on row end
  const handleEditChange = (e, rowIndex, columnName) => {
    const newData = [...data];
    newData[rowIndex][columnName] = e.target.value;
    setData(newData);
  };

  const toggleEdit = (rowIndex) => {
    const newData = [...data];
    newData[rowIndex].isEditing = !newData[rowIndex].isEditing;
    setData(newData);
  };

  /* const exportCSV = (e) => {
    e.preventDefault();
    const csv = Papa.unparse(data); // 'data' ist Ihr Array von Objekten
    console.log(csv); // Zeigt die CSV-String-Representation Ihrer Daten
  }; */

  // make data downloadable
  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (navigator.msSaveBlob) {
      // Für IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = filename;
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadCSV = (e) => {
    e.preventDefault();
    /* console.log("Before parsing data: ", data); */
    const csv = Papa.unparse(data);
    downloadCSV(csv, "exported-data.csv");
  };

  return (
    <div className="data_outer_container">
      <div className="data_inner_container">
        <div className="csv_data_input">
          <h1>CSV Data Display</h1>
          {isLoading ? <PushSpinner color="yellow" /> : ""}

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
          {/* <button onClick={countByGender}>Count by gender</button> */}
          <button onClick={handleDownloadCSV}>Download CSV</button>
          {renderMessage()}
        </div>

        <div className="newinput_and_table">
          <div className="newinput_form_outer">
            <form onSubmit={addData} className="newinput_form">
              <label htmlFor="mainArticleNo">Main article No.</label>
              <input
                type="text"
                name="mainArticleNo"
                id="mainArticleNo"
                placeholder="enter main article no here"
                value={mainArticleNo}
                onChange={(e) => {
                  setMainArticleNo(e.target.value);
                }}
              ></input>
              <label htmlFor="articleName">Article name</label>
              <input
                type="text"
                name="articleName"
                id="articleName"
                placeholder="enter article name here"
                value={articleName}
                onChange={(e) => {
                  setArticleName(e.target.value);
                }}
              ></input>

              <label htmlFor="manufacturer">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                id="manufacturer"
                placeholder="Enter manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />

              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label htmlFor="materialInformation">Material Information</label>
              <input
                type="text"
                name="materialInformation"
                id="materialInformation"
                placeholder="Enter material information"
                value={materialInformation}
                onChange={(e) => setMaterialInformation(e.target.value)}
              />

              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                name="gender"
                id="gender"
                placeholder="Enter gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />

              <label htmlFor="productType">Product Type</label>
              <input
                type="text"
                name="productType"
                id="productType"
                placeholder="Enter product type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              />

              <label htmlFor="sleeves">Sleeves</label>
              <input
                type="text"
                name="sleeves"
                id="sleeves"
                placeholder="Enter sleeves type"
                value={sleeves}
                onChange={(e) => setSleeves(e.target.value)}
              />

              <label htmlFor="leg">Leg</label>
              <input
                type="text"
                name="leg"
                id="leg"
                placeholder="Enter leg type"
                value={leg}
                onChange={(e) => setLeg(e.target.value)}
              />

              <label htmlFor="collar">Collar</label>
              <input
                type="text"
                name="collar"
                id="collar"
                placeholder="Enter collar type"
                value={collar}
                onChange={(e) => setCollar(e.target.value)}
              />

              <label htmlFor="manufacturing">Manufacturing</label>
              <input
                type="text"
                name="manufacturing"
                id="manufacturing"
                placeholder="Enter manufacturing details"
                value={manufacturing}
                onChange={(e) => setManufacturing(e.target.value)}
              />

              <label htmlFor="pocketStyle">Pocket Style</label>
              <input
                type="text"
                name="pocketStyle"
                id="pocketStyle"
                placeholder="Enter pocket style"
                value={pocketStyle}
                onChange={(e) => setPocketStyle(e.target.value)}
              />

              <label htmlFor="grammar">Grammar</label>
              <input
                type="text"
                name="grammar"
                id="grammar"
                placeholder="Enter grammar details"
                value={grammar}
                onChange={(e) => setGrammar(e.target.value)}
              />

              <label htmlFor="material">Material</label>
              <input
                type="text"
                name="material"
                id="material"
                placeholder="Enter material details"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />

              <label htmlFor="countryOfOrigin">Country of Origin</label>
              <input
                type="text"
                name="countryOfOrigin"
                id="countryOfOrigin"
                placeholder="Enter country of origin"
                value={countryOfOrigin}
                onChange={(e) => setCountryOfOrigin(e.target.value)}
              />

              <label htmlFor="imageName">Image Name</label>
              <input
                type="text"
                name="imageName"
                id="imageName"
                placeholder="Enter image name"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
              />

              <button>Add Data</button>
            </form>
          </div>

          <div className="table_container">
            <table>
              <thead>
                <tr>{renderTableHeaders()}</tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(row).map((key, keyIndex) => {
                      if (key === "isEditing") return null; // 'isEditing' auslassen

                      return (
                        <td key={keyIndex}>
                          {row.isEditing ? (
                            <input
                              type="text"
                              value={row[key]}
                              onChange={(e) =>
                                handleEditChange(e, rowIndex, key)
                              }
                            />
                          ) : (
                            row[key]
                          )}
                        </td>
                      );
                    })}
                    <td>
                      <button onClick={() => toggleEdit(rowIndex)}>
                        {row.isEditing ? "Save" : "Edit"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Charts data={data} />
      </div>
    </div>
  );
}
