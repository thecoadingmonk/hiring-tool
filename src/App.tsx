import React, { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";

import "./index.css";

const App = () => {
  const [state, setState] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    console.log(e);

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
        <Input
          label="Job title"
          placeholder="ex. UX UI Designer"
          value={state}
          onChange={(e) => setState(e.target.value)}
          // errorMessage="This field is required"
          required
        />
      </div>
    </div>
  );
};

export default App;
