// Network
import { fetch } from "./fetch";

// Constants
import { API_ENDPOINT } from "../constants/index";

// Types
import type { Job } from "../types/Common";

/**
 * This method is used get all the jobs
 *
 * @return {Promise<Job[] | ErrorMessage>} on success it returns a Job list, error message on failure
 */
export const getJobs = async () => {
  return fetch<Job[]>({
    url: API_ENDPOINT,
    method: "GET",
  });
};
