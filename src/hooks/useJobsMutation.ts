// Library
import { useState } from "react";

// Service
import { createJob, deleteJob, editJob } from "../service/mutations";

// Hooks
import useJobsQuery from "../hooks/useJobsQuery";

// Types
import type { Job, OperationType } from "../types/Common";

interface useJobsMutationProps {
  callback: (type: OperationType) => void;
}

const useJobsMutation = ({ callback }: useJobsMutationProps) => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletingJob, setDeletingJob] = useState<string>();
  const [error, setError] = useState<string>("");

  // Job hook to load and update jobs
  const { refetch, immediateUpdate } = useJobsQuery();

  // This function is responsible for creating the job
  const handleCreate = (job: Job) => {
    // Always show the loading state while creating the job
    setIsLoading(true);

    /**
     * API call to create a job with payload from the create form
     * @Success update the current job list with new data
     * @Error shows error message and refetch the job list
     */
    createJob({ data: job })
      .then((job) => {
        // Once the API returns success then udpate the state immediate
        immediateUpdate(job, "create");

        // Callback to finish any operations like closing modal etc..
        callback("create");
      })
      .catch((e: string) => {
        // Show error on fail
        setError(e);

        // Refetch job list
        refetch();
      })
      .finally(() => {
        // Hide loading state
        setIsLoading(false);
      });
  };

  // This function is responsible for editing the job
  const handleEdit = (job: Job) => {
    // Always show the loading state while editing the job
    setIsLoading(true);

    /**
     * API call to edit a job with payload from the create form
     * @Success update the particular job data in job list
     * @Error shows error message and refetch the job list
     */
    editJob({ data: job })
      .then(() => {
        // Once the API returns success then udpate the state immediate
        immediateUpdate(job, "update");

        // Callback to finish any operations like closing modal etc..
        callback("edit");
      })
      .catch((e: string) => {
        // Show error on fail
        setError(e);

        // Refetch job list
        refetch();
      })
      .finally(() => {
        // Hide loading state
        setIsLoading(false);
      });
  };

  // This function is responsible for deleting the job
  const handleDelete = (id: string) => {
    // Set a Job ID to the state to show progress information
    setDeletingJob(id);

    /**
     * API call to delete a job with id
     * @Success Delete the particular job data in job list
     * @Error refetch the job list
     */
    deleteJob({ id })
      .then((job) => {
        // Once the API returns success then delete a job in state
        immediateUpdate(job, "delete");
      })
      .catch(() => {
        // Refetch job list
        refetch();
      })
      .finally(() => {
        // Reset the Deleting state
        setDeletingJob(undefined);
      });
  };

  return {
    clearError: () => setError(""),
    isLoading,
    deletingJob,
    error,
    handleCreate,
    handleEdit,
    handleDelete,
  };
};

export default useJobsMutation;
