import React, { useState, useEffect } from "react";

function WeekOne() {
  const [country, setCountry] = useState("germany");
  const [vat, setVat] = useState("");
  const [vatRate, setVatRate] = useState("19");
  const [gross, setGross] = useState("");
  const [net, setNet] = useState("");
  const [customVatRate, setCustomVatRate] = useState("");
  const [taxRateOne, setTaxRateOne] = useState("");

  const countryVatRate = { germany: "19", poland: "23", france: "20" };

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
    if (customVatRate) {
      /* setVatRate(customVatRate); */
      console.log(`The user entered a custom VAT rate of: ${customVatRate}`);

      if (net && vat == "" && gross == "") {
        // calculate vat & gross
        const calculateVat = +net * (+customVatRate / 100);
        setVat(calculateVat);
        const grossResult = +net + calculateVat;
        setGross(grossResult);
      }

      if (vat && net == "" && gross == "") {
        // calculate net & gross
        const calculateNet = +vat / (+customVatRate / 100);
        setNet(calculateNet);
        const calculateGross = calculateNet + +vat;
        setGross(calculateGross);
      }

      if (gross && net == "" && vat == "") {
        // calculate net & vat
        const calculateNet = +gross / (1 + +customVatRate / 100);
        setNet(calculateNet);
        const calculateVat = +gross - calculateNet;
        setVat(calculateVat);
      }

      if ((vat && gross) || (vat && net && gross)) {
        console.log("Wrong entries", emptyAllFields());
      }
    } else {
      // get VAT rate from country
      /* setVatRate(countryVatRate[country]); */
      console.log(
        `Take countries standard VAT rate: ${countryVatRate[country]}`
      );

      const calculateVat = +net * (+vatRate / 100);
      setVat(calculateVat);
      const grossResult = +net + calculateVat;
      setGross(grossResult);
    }
    // calculate missing fields
  }

  const emptyAllFields = (e) => {
    console.log("It works");
    setVat("");
    setVatRate("");
    setGross("");
    setNet("");
  };

  return (
    <div className="weekone_outer_container">
      <div className="weekone_inner_container">
        <div className="weekone_text">
          <h1>Country Tax Calculator Phil</h1>
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
              <label htmlFor="vat"> + Vat</label>
              <input
                type="text"
                name="vat"
                value={vat}
                onChange={(e) => setVat(e.target.value)}
                placeholder="Input vat here"
              />
              <label htmlFor="gross">= Gross</label>
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
              <label htmlFor="vat_rate">
                Default rate:
                <input
                  type="radio"
                  value={countryVatRate[country]}
                  name="vat_rate"
                  onChange={(e) => {
                    setVatRate(e.target.value);
                    setCustomVatRate("");
                  }}
                  checked={customVatRate === "" || customVatRate === vatRate}
                />
                {vatRate} %
              </label>

              <br></br>

              <label htmlFor="vat_rate">
                Custom rate:
                <input
                  type="radio"
                  name="vat_rate"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCustomVatRate("");
                    }
                  }}
                  checked={
                    customVatRate !== "" &&
                    customVatRate !== countryVatRate[country]
                  }
                />
                <input
                  type="text"
                  name="custom_vat_rate"
                  value={customVatRate}
                  onChange={(e) => setCustomVatRate(e.target.value)}
                  placeholder="Custom VAT rate"
                />
              </label>
            </div>
            <button type="submit">Calculate</button>
            <button onChange={emptyAllFields}>Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WeekOne;
