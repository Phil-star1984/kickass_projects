import React, { useState } from "react";

function WeekOneTest() {
  const [country, setCountry] = useState("germany");
  const [net, setNet] = useState("");
  const [vat, setVat] = useState("");
  const [gross, setGross] = useState("");
  const [vatRate, setVatRate] = useState("19");
  const [customVatRate, setCustomVatRate] = useState("");

  const countryVatRate = { germany: "19", poland: "23", france: "20" };

  const calculateTax = () => {
    const actualVatRate = customVatRate
      ? parseFloat(customVatRate)
      : parseFloat(vatRate);
    let calculatedNet = net ? parseFloat(net) : 0;
    let calculatedVat = vat ? parseFloat(vat) : 0;
    let calculatedGross = gross ? parseFloat(gross) : 0;

    if (net && !vat && !gross) {
      calculatedVat = (calculatedNet * actualVatRate) / 100;
      calculatedGross = calculatedNet + calculatedVat;
    } else if (!net && vat && !gross) {
      calculatedNet = calculatedVat / (actualVatRate / 100);
      calculatedGross = calculatedNet + calculatedVat;
    } else if (!net && !vat && gross) {
      calculatedNet = calculatedGross / (1 + actualVatRate / 100);
      calculatedVat = calculatedGross - calculatedNet;
    }

    setNet(calculatedNet.toFixed(2));
    setVat(calculatedVat.toFixed(2));
    setGross(calculatedGross.toFixed(2));
  };

  const clearFields = () => {
    setNet("");
    setVat("");
    setGross("");
    setCustomVatRate("");
    setVatRate(countryVatRate[country]);
  };

  return (
    <div className="weekone_outer_container">
      <div className="weekone_inner_container">
        <h1>Country Tax Calculator</h1>
        <p>Calculate your countries tax here</p>
        <form className="submit_form">
          <div>
            <label htmlFor="country">Choose a Country</label>
            <select
              name="country"
              id="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setVatRate(countryVatRate[e.target.value]);
              }}
            >
              <option value="germany">Germany</option>
              <option value="poland">Poland</option>
              <option value="france">France</option>
            </select>
          </div>

          <div>
            <label htmlFor="net">Net</label>
            <input
              type="number"
              name="net"
              value={net}
              onChange={(e) => setNet(e.target.value)}
              placeholder="Input net amount"
            />
          </div>

          <div>
            <label htmlFor="vat">VAT</label>
            <input
              type="number"
              name="vat"
              value={vat}
              onChange={(e) => setVat(e.target.value)}
              placeholder="Input VAT amount"
            />
          </div>

          <div>
            <label htmlFor="gross">Gross</label>
            <input
              type="number"
              name="gross"
              value={gross}
              onChange={(e) => setGross(e.target.value)}
              placeholder="Input gross amount"
            />
          </div>

          <div>
            <label htmlFor="vat_rate">VAT Rate</label>
            <input
              type="text"
              name="vat_rate"
              value={customVatRate}
              onChange={(e) => setCustomVatRate(e.target.value)}
              placeholder="Enter custom VAT rate"
            />
          </div>

          <button className="calculate" type="button" onClick={calculateTax}>
            Calculate
          </button>
          <button type="button" onClick={clearFields}>
            Clear
          </button>
        </form>
      </div>
    </div>
  );
}

export default WeekOneTest;
