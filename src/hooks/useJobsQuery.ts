import { useState, useEffect } from "react";
import { useBetween } from "use-between";

import { getJobs } from "../service/query";

import type { Job } from "../types/Common";

const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

const useJobsQuery = () => useBetween(useJobs);

export default useJobsQuery;
