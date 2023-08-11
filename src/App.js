import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Table from "./components/Table";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (data) => {
    setUserInput(data);
  };

  const yearlyData = []; // per-year results

  if (userInput) {
    let currentSavings = +userInput.currentSavings;
    const yearlyContribution = +userInput.yearlyContribution;
    const expectedReturn = +userInput.expectedReturn / 100;
    const duration = +userInput.duration;

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <Form onSend={calculateHandler} />
      {!userInput && (
        <p style={{ textAlign: "center" }}>No investments calcualted yet</p>
      )}
      {userInput && (
        <Table
          data={yearlyData}
          initialInvestment={userInput["currentSavings"]}
        />
      )}
    </div>
  );
}

export default App;
