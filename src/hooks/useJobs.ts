import { useState, useEffect } from "react";
import { getJobs } from "../service/query";

import type { Job } from "../types/Common";

const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([] as Job[]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchJobs = () => {
    setIsLoading(true);

    getJobs()
      .then((res) => {
        setJobs(res);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, isLoading, hasError, refetch: fetchJobs };
};

export default useJobs;
