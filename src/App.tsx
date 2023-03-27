import React, { useState } from "react";
import Button from "./components/Button";
import InputText from "./components/InputText";
import RadioGroup from "./components/RadioGroup";
import Modal from "./components/Modal";

import type { RadioGroupProps } from "./types/RadioGroup";

import "./index.css";

const App = () => {
  const [inputState, setInputState] = useState("");
  const [radioButtonState, setRadioButtonState] = useState("");
  const [show, setShow] = useState(false);

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
          Apply Now
        </Button>
        <Button onClick={handleClick} variant="outlined">
          External Apply
        </Button>
        <Button onClick={handleClick} variant="contained">
          Next
        </Button>
        <Button onClick={handleClick} variant="contained">
          Save
        </Button>
      </div>

      <div>
        <InputText
          label="Job title"
          placeholder="ex. UX UI Designer"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
          // errorMessage="This field is required"
          required
        />
      </div>

      <div>
        <RadioGroup legend="Apply type" items={radioGroupItems} />
      </div>

      <div>
        <RadioGroup
          flow="horizontal"
          legend="Apply type"
          items={radioGroupItems}
        />
      </div>

      <Modal show={show} onClose={() => setShow((prev) => !prev)}>
        This is modal
      </Modal>
    </div>
  );
};

export default App;
