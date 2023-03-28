import React, { useState } from "react";
import Button from "./components/Button";
import InputText from "./components/InputText";
import RadioGroup from "./components/RadioGroup";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";

import type { RadioGroupProps } from "./types/RadioGroup";

import "./index.css";

const App = () => {
  const [inputState, setInputState] = useState("");
  const [radioButtonState, setRadioButtonState] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setShow((prev) => !prev);

  const radioGroupItems: RadioGroupProps["items"] = [
    {
      checked: radioButtonState === "quick-apply",
      id: "quick-apply",
      name: "apply-type",
      value: "quick-apply",
      label: "Quick apply",
      onChange: (e) => setRadioButtonState(e.target.value),
    },
    {
      checked: radioButtonState === "external-apply",
      id: "external-apply",
      name: "apply-type",
      value: "external-apply",
      label: "External apply",
      onChange: (e) => setRadioButtonState(e.target.value),
    },
  ];

  const defaultJobCards = Array(11).fill({
    jobTitle: "UX UI Designer",
    companyName: "Great Vibes",
    industry: "Information Technology",
    location: "Chennai, Tamilnadu, India",
    minExperience: 1,
    maxExperience: 2,
    minSalary: 30000,
    maxSalary: 60000,
    totalEmployee: "51-200",
    remoteType: "In-office",
    applyType: "external-apply",
  });

  return (
    <div className="h-screen overflow-hidden">
      <div className="p-4">
        <Button onClick={handleClick} variant="contained">
          Create a job
        </Button>
      </div>

      <div className="job-card-container h-[90%] overflow-scroll bg-gray-10 p-4">
        {defaultJobCards.map((each) => (
          <JobCard info={each} />
        ))}
      </div>

      <JobForm
        show={show}
        onClose={() => setShow(false)}
        onFormSubmit={(v) => {
          console.log(v);
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            setShow(false);
          }, 5000);
        }}
        isLoading={isLoading}
        hasError={false}
      />
    </div>
  );
};

export default App;
