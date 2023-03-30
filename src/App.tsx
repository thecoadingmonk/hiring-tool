import React, { useState } from "react";

import Button from "./components/Button";
import InputText from "./components/InputText";
import RadioGroup from "./components/RadioGroup";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";

import useJobs from "./hooks/useJobs";

import type { RadioGroupProps } from "./types/RadioGroup";
import type { Job } from "./types/Common";

import { createJob, deleteJob, editJob } from "./service/mutations";

import "./index.css";

const App = () => {
  const { jobs, refetch } = useJobs();
  const [inputState, setInputState] = useState("");
  const [radioButtonState, setRadioButtonState] = useState("");
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingJob, setDeletingJob] = useState<string>();
  const [error, setError] = useState("");
  const [formDefaultValues, setFormDefaultValues] = useState<Job | undefined>();

  const toggleCreateJobModal = () => setShowCreateJobForm((prev) => !prev);

  const handleFormSubmit = (job: Job) => {
    if (formDefaultValues) {
      handleEdit(job);
    } else {
      handleCreate(job);
    }
  };

  const handleCreate = (job: Job) => {
    setIsLoading(true);
    createJob({ data: job })
      .then(() => {
        toggleCreateJobModal();
        refetch();
      })
      .catch((e: string) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEdit = (job: Job) => {
    setIsLoading(true);
    editJob({ data: job })
      .then(() => {
        onEdit();
        refetch();
      })
      .catch((e: string) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (id: string) => {
    setDeletingJob(id);
    deleteJob({ id })
      .then(() => {
        refetch();
      })
      .finally(() => {
        setDeletingJob(undefined);
      });
  };

  const onEdit = (formValues?: Job) => {
    setFormDefaultValues(formValues);
    toggleCreateJobModal();
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="p-4">
        <Button onClick={toggleCreateJobModal} variant="contained">
          Create a job
        </Button>
      </div>

      <div className="job-card-container h-[90%] overflow-scroll bg-gray-10 p-4">
        {jobs.map((each) => (
          <JobCard
            info={each}
            isDeleting={each.id === deletingJob}
            onDelete={handleDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      <JobForm
        show={showCreateJobForm}
        onClose={toggleCreateJobModal}
        onFormSubmit={handleFormSubmit}
        isLoading={isLoading}
        error={error}
        formDefaultValues={formDefaultValues}
      />
    </div>
  );
};

export default App;
