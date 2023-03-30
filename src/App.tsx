// Library
import React, { useState } from "react";

// Components
import Button from "./components/Button";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";
import Spinner from "./components/Spinner";

// Hooks
import useJobsQuery from "./hooks/useJobsQuery";
import useJobsMutation from "./hooks/useJobsMutation";

// Types
import type { Job, OperationType } from "./types/Common";

// Style
import "./index.css";

const App = () => {
  // State variables
  const [showJobForm, setShowJobForm] = useState<boolean>(false);
  const [formDefaultValues, setFormDefaultValues] = useState<Job | undefined>();

  const handleMutationCallback = (type: OperationType) => {
    switch (type) {
      case "create":
        // Close the job form after complete
        toggleJobFormModal();
        break;
      case "edit":
        onEdit();
        break;
    }
  };

  // Job query hook to load jobs
  const { jobs, error: jobsError, isLoading: isJobsLoading } = useJobsQuery();

  const {
    isLoading,
    deletingJob,
    error,
    handleCreate,
    handleEdit,
    handleDelete,
    clearError,
  } = useJobsMutation({
    callback: handleMutationCallback,
  });

  // This function is to toggle Job form while creating and editing
  const toggleJobFormModal = () => {
    setShowJobForm((prev) => !prev);

    // If the form is opened in edit mode then clear the value after closing
    if (showJobForm && formDefaultValues) {
      setFormDefaultValues(undefined);
    }

    // Clear error on closing the modal
    if (showJobForm && error) {
      clearError();
    }
  };

  // Form can be opened in two modes `create` and `edit` trigger function accordingly
  const handleFormSubmit = (job: Job) => {
    // When we have `formDefaultValues` value set then user is trying to edit the Job
    if (formDefaultValues) {
      handleEdit(job);
    } else {
      handleCreate(job);
    }
  };

  const onEdit = (formValues?: Job) => {
    setFormDefaultValues(formValues);
    toggleJobFormModal();
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="p-4">
        <Button onClick={toggleJobFormModal} variant="contained">
          Create a job
        </Button>
      </div>

      {isJobsLoading ? (
        <div className="w-full h-[90%] bg-gray-10 flex items-center justify-center">
          <Spinner />
        </div>
      ) : jobs.length ? (
        <div className="job-card-container h-[90%] overflow-scroll bg-gray-10 p-4">
          {jobs.map((each: Job) => (
            <JobCard
              key={each.id}
              info={each}
              isDeleting={each.id === deletingJob}
              onDelete={handleDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-[90%] bg-gray-10 flex items-center justify-center text-font-placeholder">
          <p>
            <i>{jobsError || "No jobs found!"}</i>
          </p>
        </div>
      )}

      <JobForm
        show={showJobForm}
        onClose={toggleJobFormModal}
        onFormSubmit={handleFormSubmit}
        isLoading={isLoading}
        error={error}
        formDefaultValues={formDefaultValues}
      />
    </div>
  );
};

export default App;
