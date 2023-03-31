// Library
import { useState, useEffect } from "react";
import { useBetween } from "use-between";

// Network
import { getJobs } from "../service/query";

// Types
import type { Job } from "../types/Common";

// This hook is to manage and store Jobs list information
const useJobs = () => {
  // States
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Method to find and update item in Jobs list
  const immediateUpdate = (job: Job, type: "delete" | "update" | "create") => {
    const index = jobs.findIndex((i) => i.id === job.id);

    switch (type) {
      case "create": {
        setJobs((prev) => [...prev, job]);
        break;
      }
      case "update": {
        setJobs((prev) => {
          prev[index] = job;
          return prev;
        });
        break;
      }
      case "delete": {
        const filteredJobs = jobs.filter((each) => each.id !== job.id);
        setJobs(filteredJobs);
        break;
      }
    }
  };

  // This method is to get latest data from the server
  const fetchJobs = () => {
    setIsLoading(true);

    getJobs()
      .then((res) => {
        setJobs(res);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    isLoading,
    error,
    refetch: fetchJobs,
    immediateUpdate,
  };
};

/**
 * We are using `useJobsQuery` hook in two places and we need to
 * share the state between them so we are using useBetween hook
 */
const useJobsQuery = () => useBetween(useJobs);

export default useJobsQuery;
