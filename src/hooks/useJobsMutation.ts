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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletingJob, setDeletingJob] = useState<string>();
  const [error, setError] = useState<string>("");

  // Job hook to load jobs
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
        callback("create");
      })
      .catch((e: string) => {
        // Show error on fail
        setError(e);

        // refetch job list
        refetch();
      })
      .finally(() => {
        // Hide loading state
        setIsLoading(false);
      });
  };

  const handleEdit = (job: Job) => {
    setIsLoading(true);
    editJob({ data: job })
      .then(() => {
        immediateUpdate(job, "update");
        callback("edit");
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
