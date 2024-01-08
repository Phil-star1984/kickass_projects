import React, { useState, useEffect } from "react";

function WeekOne() {
  const [vat, setVat] = useState("");
  const [gross, setGross] = useState("");
  const [net, setNet] = useState("");
  const [otherRate, setOtherRate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vat, gross, net, otherRate);

    const form = e.target;
    const formData = new FormData(form);

    /* console.log(formData); */
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  const calculateTax = () => {
    const grossResult = net + vat;
  };

  return (
    <div className="weekone_outer_container">
      <div className="weekone_inner_container">
        <div className="weekone_text">
          <h1>Country Tax Calculator</h1>
          <p>Calculate your countries tax here</p>
        </div>
        <div className="weekone_content">
          <form type="submit" className="submit_form" onSubmit={handleSubmit}>
            <label htmlFor="countries">1. Choose a Country</label>
            <select name="countries" id="countries" defaultValue="poland">
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
              <input type="checkbox" value="tax_rate_one" />
              <label htmlFor="tax_rate_one">19%</label>
              <input type="checkbox" value="tax_rate_two" />
              <label for="tax_rate_two">7%</label>
              <label for="other_rate">Custom rate</label>
              <input
                type="text"
                name="other_rate"
                value={otherRate}
                onChange={(e) => setOtherRate(e.target.value)}
                placeholder="Custom VAT rate"
              />
            </div>
            <button type="submit">Calculate</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WeekOne;
