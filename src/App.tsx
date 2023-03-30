import React, { useState } from "react";

import Button from "./components/Button";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";
import Spinner from "./components/Spinner";

import useJobs from "./hooks/useJobs";

import type { Job } from "./types/Common";

import { createJob, deleteJob, editJob } from "./service/mutations";

import "./index.css";

const App = () => {
  const {
    jobs,
    refetch,
    immediateUpdate,
    error: jobsError,
    isLoading: isJobsLoading,
  } = useJobs();
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingJob, setDeletingJob] = useState<string>();
  const [error, setError] = useState("");
  const [formDefaultValues, setFormDefaultValues] = useState<Job | undefined>();

  const toggleJobFormModal = () => {
    setShowCreateJobForm((prev) => !prev);
    if (formDefaultValues) {
      setFormDefaultValues(undefined);
    }
  };

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
      .then((job) => {
        immediateUpdate(job, "create");
        toggleJobFormModal();
      })
      .catch((e: string) => {
        setError(e);
        refetch();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEdit = (job: Job) => {
    setIsLoading(true);
    editJob({ data: job })
      .then(() => {
        immediateUpdate(job, "update");
        onEdit();
      })
      .catch((e: string) => {
        setError(e);
        refetch();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = (id: string) => {
    setDeletingJob(id);
    deleteJob({ id })
      .then((job) => {
        immediateUpdate(job, "delete");
      })
      .catch(() => {
        refetch();
      })
      .finally(() => {
        setDeletingJob(undefined);
      });
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
          {jobs.map((each) => (
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
        show={showCreateJobForm}
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
