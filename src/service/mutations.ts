import { fetch } from "./fetch";
import { API_ENDPOINTS } from "../constants/index";

import type { Job } from "../types/Common";

export const createJob = ({ data }: { data: Job }) => {
  return fetch<Job>({
    url: API_ENDPOINTS,
    method: "POST",
    data,
  });
};

export const editJob = ({ data }: { data: Job }) => {
  return fetch<Job>({
    url: `${API_ENDPOINTS}/${data.id}`,
    method: "PUT",
    data,
  });
};

export const deleteJob = ({ id }: { id: string }) => {
  return fetch<Job>({
    url: `${API_ENDPOINTS}/${id}`,
    method: "DELETE",
  });
};
