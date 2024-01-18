import React, { useState } from "react";

function WeekOne() {
  const [country, setCountry] = useState("germany");
  const [vat, setVat] = useState("");
  const [vatRate, setVatRate] = useState("19");
  const [gross, setGross] = useState("");
  const [net, setNet] = useState("");
  const [customVatRate, setCustomVatRate] = useState("");
  //const [taxRateOne, setTaxRateOne] = useState("");

  const countryVatRate = { germany: "19", poland: "23", france: "20" };

  const emptyAllFields = (e) => {
    //console.log("It works");

    setVat("");
    setVatRate(countryVatRate[country]);
    setGross("");
    setNet("");
    setCustomVatRate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); */

    calculateTax(country);
  };

  /* const calculateTax = () => {
    if (net) {
      const calculateVat = +net * vat_rate;
    }
    // const grossResult = Number(net) + Number(vat);
    const grossResult = +net + +vat;
    setGross(grossResult);
  }; */

  function calculateTax(country) {
    // check if custom VAT rate
    // if (customVatRate) {
    // /* setVatRate(customVatRate); */
    // alert(`The user entered a custom VAT rate of: ${customVatRate}`);
    // if (net && vat == "" && gross == "") {
    //   calculate vat & gross
    //   const calculateVat = +net * (+vatRate / 100);
    //   setVat(calculateVat);
    //   const grossResult = +net + calculateVat;
    //   setGross(grossResult);
    // }

    // if (vat && net == "" && gross == "") {
    //   calculate net & gross
    //   const calculateNet = +vat / (+vatRate / 100);
    //   setNet(calculateNet);
    //   const calculateGross = calculateNet + +vat;
    //   setGross(calculateGross);
    // }

    // if (gross && net == "" && vat == "") {
    //   calculate net & vat
    //   const calculateNet = +gross / (1 + +vatRate / 100);
    //   setNet(calculateNet);
    //   const calculateVat = +gross - calculateNet;
    //   setVat(calculateVat);
    // }

    // if ((vat && gross) || (vat && net && gross)) {
    //   emptyAllFields();
    //   alert("Wrong entries - please try again");
    // }

    //take a country->take a vat rate-> check the inputs
    if (net && vat == "" && gross == "") {
      const calculateVat = (+vatRate / 100) * +net;
      setVat(calculateVat.toFixed(2));
      setGross((+net + +calculateVat).toFixed(2));
    } else if (vat && net == "" && gross == "") {
      const calculateNet = (+vat * 100) / +vatRate;
      setNet(calculateNet.toFixed(2));
      setGross((+calculateNet + +vat).toFixed(2));
    } else if (gross && vat == "" && net == "") {
      const calculateNet = +gross / (1 + +vatRate / 100);
      setNet(calculateNet.toFixed(2));
      setVat(+gross - +calculateNet.toFixed(2));
    } else if (net && vat && gross == "") {
      vat == (+vatRate / 100) * +net
        ? setGross((+net + +vat).toFixed(2))
        : alert("Numbers don't add up. Please try again");
    } else if (+vat && +gross && +net == "") {
      vat == +gross - +gross / (1 + +vatRate / 100)
        ? setNet((+gross / (1 + +vatRate / 100)).toFixed(2))
        : alert("Numbers don't add up. Please try again");
    } else if (net && gross && vat == "") {
      gross == (1 + +vatRate / 100) * net
        ? setVat(((vatRate / 100) * net).toFixed(2))
        : alert("Numbers don't add up. Please try again");
    } else if (net && vat && gross) {
      vat == (vatRate / 100) * net || net + vat == gross
        ? alert("Correct calculations! Nothing left to be done")
        : alert("Numbers don't add up. Please try again");
    }
  }

  return (
    <div className="weekone_outer_container">
      <div className="weekone_inner_container">
        <div className="weekone_text">
          <h1>Country VAT Tax Calculator</h1>
          <p>Calculate your country's VAT tax here</p>
        </div>
        <div className="weekone_content">
          <form type="submit" className="submit_form" onSubmit={handleSubmit}>
            <label htmlFor="country">1. Choose a Country</label>
            <select
              name="country"
              id="country"
              defaultValue="germany"
              onChange={(e) => {
                setCountry(e.target.value);
                setNet("");
                setVat("");
                setGross("");
                setCustomVatRate("");
                setVatRate(countryVatRate[e.target.value]);
              }}
            >
              <option value="germany">Germany</option>
              <option value="poland">Poland</option>
              <option value="france">France</option>
            </select>
            <div className="weekone_checkboxes">
              <p>2. Select VAT rate:</p>
              <label htmlFor="vat_rate">
                Default rate:
                <input
                  type="radio"
                  value={countryVatRate[country]}
                  name="vat_rate"
                  onChange={() => {
                    setVatRate(countryVatRate[country]);
                  }}
                  checked={vatRate !== ""}
                />
                {countryVatRate[country]} %
              </label>

              <br></br>

              <label htmlFor="vat_rate">
                Custom rate:
                <input
                  type="radio"
                  name="vat_rate"
                  onChange={() => {
                    setVatRate(customVatRate);
                  }}
                  checked={customVatRate !== ""}
                />
                <input
                  type="text"
                  name="custom_vat_rate"
                  value={customVatRate}
                  onChange={(e) => {
                    setCustomVatRate(e.target.value);
                    setVatRate(e.target.value);
                  }}
                  placeholder="Custom VAT rate"
                />
              </label>
            </div>
            <div className="weekone_calculator">
              <p>3. Calculate values:</p>
              <label htmlFor="net">Net </label>
              <input
                type="text"
                name="net"
                value={net}
                onChange={(e) => setNet(e.target.value)}
                placeholder="Input net value here"
              />
              <label htmlFor="vat"> + VAT </label>
              <input
                type="text"
                name="vat"
                value={vat}
                onChange={(e) => setVat(e.target.value)}
                placeholder="Input VAT amount here"
              />
              <label htmlFor="gross"> = Gross </label>
              <input
                type="text"
                name="gross"
                value={gross}
                onChange={(e) => setGross(e.target.value)}
                placeholder="Input gross amount here"
              />
            </div>

            <button type="submit">Calculate</button>
            <button onClick={emptyAllFields}>Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WeekOne;

//GPT refactor:
// import React, { useState } from "react";

// function WeekOne() {
//   const [formData, setFormData] = useState({
//     country: "germany",
//     vat: "",
//     vatRate: "19",
//     gross: "",
//     net: "",
//     customVatRate: "",
//   });

//   const countryVatRate = { germany: "19", poland: "23", france: "20" };

//   const emptyAllFields = () => {
//     setFormData({
//       ...formData,
//       vat: "",
//       gross: "",
//       net: "",
//       customVatRate: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     calculateTax();
//   };

//   const calculateTax = () => {
//     const { net, vat, gross, vatRate, customVatRate } = formData;

//     if (net && vat === "" && gross === "") {
//       const calculateVat = (+vatRate / 100) * +net;
//       setFormData({
//         ...formData,
//         vat: calculateVat.toFixed(2),
//         gross: (+net + +calculateVat).toFixed(2),
//       });
//     } else if (vat && net === "" && gross === "") {
//       const calculateNet = (+vat * 100) / +vatRate;
//       setFormData({
//         ...formData,
//         net: calculateNet.toFixed(2),
//         gross: (+calculateNet + +vat).toFixed(2),
//       });
//     } else if (gross && vat === "" && net === "") {
//       const calculateNet = +gross / (1 + +vatRate / 100);
//       setFormData({
//         ...formData,
//         net: calculateNet.toFixed(2),
//         vat: (+gross - +calculateNet.toFixed(2)).toFixed(2),
//       });
//     } else if (net && vat && gross === "") {
//       vat === (+vatRate / 100) * +net
//         ? setFormData({ ...formData, gross: (+net + +vat).toFixed(2) })
//         : alert("Numbers don't add up. Please try again");
//     } else if (+vat && +gross && +net === "") {
//       vat === +gross - +gross / (1 + +vatRate / 100)
//         ? setFormData({
//             ...formData,
//             net: (+gross / (1 + +vatRate / 100)).toFixed(2),
//           })
//         : alert("Numbers don't add up. Please try again");
//     } else if (net && gross && vat === "") {
//       gross === (1 + +vatRate / 100) * net
//         ? setFormData({
//             ...formData,
//             vat: ((vatRate / 100) * net).toFixed(2),
//           })
//         : alert("Numbers don't add up. Please try again");
//     } else if (net && vat && gross) {
//       vat === (vatRate / 100) * net || +net + +vat === +gross
//         ? alert("Correct calculations! Nothing left to be done")
//         : alert("Numbers don't add up. Please try again");
//     }
//   };

//   return (
//     <div className="weekone_outer_container">
//       <div className="weekone_inner_container">
//         <div className="weekone_text">
//           <h1>Country VAT Tax Calculator</h1>
//           <p>Calculate your country's VAT tax here</p>
//         </div>
//         <div className="weekone_content">
//           <form className="submit_form" onSubmit={handleSubmit}>
//             {/* ... */}
//             {/* Existing JSX for country selection */}
//             {/* ... */}

//             {/* Existing JSX for VAT rate selection */}
//             {/* ... */}

//             <div className="weekone_calculator">
//               <p>3. Calculate values:</p>
//               {["net", "vat", "gross"].map((field) => (
//                 <React.Fragment key={field}>
//                   <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)} </label>
//                   <input
//                     type="text"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleInputChange}
//                     placeholder={`Input ${field} value here`}
//                   />
//                 </React.Fragment>
//               ))}
//             </div>

//             <button type="submit">Calculate</button>
//             <button onClick={emptyAllFields}>Reset</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WeekOne;

