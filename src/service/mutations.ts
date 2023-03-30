import { fetch } from "./fetch";
import { API_ENDPOINT } from "../constants/index";

import type { Job } from "../types/Common";

export const createJob = ({ data }: { data: Job }) => {
  return fetch<Job>({
    url: API_ENDPOINT,
    method: "POST",
    data,
  });
};

export const editJob = ({ data }: { data: Job }) => {
  return fetch<Job>({
    url: `${API_ENDPOINT}/${data.id}`,
    method: "PUT",
    data,
  });
};

export const deleteJob = ({ id }: { id: string }) => {
  return fetch<Job>({
    url: `${API_ENDPOINT}/${id}`,
    method: "DELETE",
  });
};
