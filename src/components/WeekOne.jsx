import React, { useState, useEffect } from "react";

function WeekOne() {
  const [country, setCountry] = useState("germany");
  const [vat, setVat] = useState("");
  const [gross, setGross] = useState("");
  const [net, setNet] = useState("");
  const [customVatRate, setCustomVatRate] = useState("");
  const [taxRateOne, setTaxRateOne] = useState("");

  const countryVatRate = { germany: "19", poland: "23", france: "20" };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check country
    // console.log(countryVatRate.germany);
    // check if there is a custom VAT rate input (other than default)
    // calculate missing input fields

    /* console.log(vat, gross, net, customVatRate, taxRateOne); */

    const form = e.target;
    const formData = new FormData(form);
    /* console.log(formData); */

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

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
    if (customVatRate) {
      console.log("The user entered a custom VAT rate");
      const calculateVat = +net * (+customVatRate / 100);
      setVat(calculateVat);
      const grossResult = +net + calculateVat;
      setGross(grossResult);
    } else {
      // get VAT rate from country
      const getCountryVatRate = +countryVatRate[country];
      console.log("VAT RATE: ", getCountryVatRate);

      // calculate missing fields
    }
  }

  return (
    <div className="weekone_outer_container">
      <div className="weekone_inner_container">
        <div className="weekone_text">
          <h1>Country Tax Calculator</h1>
          <p>Calculate your countries tax here</p>
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
              }}
            >
              <option value="germany">Germany</option>
              <option value="poland">Poland</option>
              <option value="france">France</option>
            </select>
            <div className="weekone_calculator">
              <p>2. Calculate tax:</p>
              <label htmlFor="net">Net</label>
              <input
                type="text"
                name="net"
                value={net}
                onChange={(e) => setNet(e.target.value)}
                placeholder="Input net here"
              />
              <label htmlFor="vat">Vat</label>
              <input
                type="text"
                name="vat"
                value={vat}
                onChange={(e) => setVat(e.target.value)}
                placeholder="Input vat here"
              />
              <label htmlFor="gross">Gross</label>
              <input
                type="text"
                name="gross"
                value={gross}
                onChange={(e) => setGross(e.target.value)}
                placeholder="Input Gross here"
              />
            </div>
            <div className="weekone_checkboxes">
              <p>3. Select VAT rate:</p>
              <input
                type="radio"
                value={countryVatRate[country]}
                name="vat_rate"
                onChange={() => setCustomVatRate("")}
                checked={
                  customVatRate === "" ||
                  customVatRate === countryVatRate[country]
                }
              />
              <label htmlFor="vat_rate">{countryVatRate[country]} %</label>

              <label htmlFor="vat_rate"> Custom rate</label>
              <input
                type="radio"
                name="vat_rate"
                checked={
                  customVatRate !== "" &&
                  customVatRate !== countryVatRate[country]
                }
              />
              <input
                type="text"
                name="vat_rate"
                value={customVatRate}
                onChange={(e) => setCustomVatRate(e.target.value)}
                placeholder="Custom VAT rate"
              />
            </div>
            <button type="submit">Calculate</button>
            <button type="reset" value="reset">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WeekOne;
