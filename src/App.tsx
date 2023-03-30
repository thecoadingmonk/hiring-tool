import React, { useState } from "react";

import Button from "./components/Button";
import InputText from "./components/InputText";
import RadioGroup from "./components/RadioGroup";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";

import useJobs from "./hooks/useJobs";

import type { RadioGroupProps } from "./types/RadioGroup";
import type { Job } from "./types/Common";

import { createJob } from "./service/mutations";

import "./index.css";

const App = () => {
  const { jobs, refetch } = useJobs();
  const [inputState, setInputState] = useState("");
  const [radioButtonState, setRadioButtonState] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setShow((prev) => !prev);

  const handleCreate = (job: Job) => {
    setIsLoading(true);
    createJob({ data: job })
      .then(() => {
        setShow(false);
        refetch();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="p-4">
        <Button onClick={handleClick} variant="contained">
          Create a job
        </Button>
      </div>

      <div className="job-card-container h-[90%] overflow-scroll bg-gray-10 p-4">
        {jobs.map((each) => (
          <JobCard info={each} />
        ))}
      </div>

      <JobForm
        show={show}
        onClose={() => setShow(false)}
        onFormSubmit={handleCreate}
        isLoading={isLoading}
        hasError={false}
      />
    </div>
  );
};

export default App;
