import React, { useState } from "react";

import styles from "./Form.module.css";

const initialInputState = {
  currentSavings: 0,
  yearlyContribution: 0,
  expectedReturn: 0,
  duration: 0,
};

const Form = (props) => {
  const [inputs, setInputs] = useState(initialInputState);

  const inputsHandler = (identifier, value) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [identifier]: value,
      };
    });
  };

  const handleReset = () => {
    setInputs(initialInputState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData = []; // per-year results

    let currentSavings = +inputs.currentSavings; // feel free to change the shape of this input object!
    const yearlyContribution = +inputs.yearlyContribution; // as mentioned: feel free to change the shape...
    const expectedReturn = +inputs.expectedReturn / 100;
    const duration = +inputs.duration;

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
    // const allData = {
    //   inputs: inputs,
    //   yearlyData: yearlyData,
    // };
    props.onSend(inputs);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(e) => inputsHandler("currentSavings", e.target.value)}
            value={inputs["currentSavings"]}
            type="number"
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(e) =>
              inputsHandler("yearlyContribution", e.target.value)
            }
            value={inputs["yearlyContribution"]}
            type="number"
            id="yearly-contribution"
          />
        </p>
      </div>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(e) => inputsHandler("expectedReturn", e.target.value)}
            value={inputs["expectedReturn"]}
            type="number"
            id="expected-return"
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(e) => inputsHandler("duration", e.target.value)}
            value={inputs["duration"]}
            type="number"
            id="duration"
          />
        </p>
      </div>
      <p className={styles.actions}>
        <button type="reset" onClick={handleReset} className={styles.buttonAlt}>
          Reset
        </button>
        <button type="submit" className={styles.button}>
          Calculate
        </button>
      </p>
    </form>
  );
};
export default Form;
