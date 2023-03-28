import React, { useState } from "react";
import Button from "./components/Button";
import InputText from "./components/InputText";
import RadioGroup from "./components/RadioGroup";
import JobForm from "./components/JobForm";

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

  return (
    <div>
      <div>
        <Button onClick={handleClick} variant="contained">
          Create a job
        </Button>
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
