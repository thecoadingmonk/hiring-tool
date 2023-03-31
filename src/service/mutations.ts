// Network
import { fetch } from "./fetch";

// Constants
import { API_ENDPOINT } from "../constants/index";

// Types
import type { Job } from "../types/Common";

/**
 * This method is used to create a new jobs
 * @param {data} this the API request payload of type Job
 *
 * @return {Promise<Job | ErrorMessage>} on success it returns a Job object, error message on failure
 */
export const createJob = ({ data }: { data: Job }) => {
  return fetch<Job>({
    url: API_ENDPOINT,
    method: "POST",
    data,
  });
};

/**
 * This method is used to edit a job
 * @param {data} this the API request payload of type Job
 *
 * @return {Promise<Job | ErrorMessage>} on success it returns a Job object, error message on failure
 */
export const editJob = ({ data }: { data: Job }) => {
  return fetch<Job>({
    url: `${API_ENDPOINT}/${data.id}`,
    method: "PUT",
    data,
  });
};

/**
 * This method is used to delete a job
 * @param {id} Job id to delete
 *
 * @return {Promise<Job | ErrorMessage>} on success it returns a Job object, error message on failure
 */
export const deleteJob = ({ id }: { id: string }) => {
  return fetch<Job>({
    url: `${API_ENDPOINT}/${id}`,
    method: "DELETE",
  });
};
